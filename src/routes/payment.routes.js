import { Router } from "express";
import { config } from "dotenv";
import request from "request";
import { completeConsult, createConsult } from "../query/queryToConsult.js";
config();

const auth = { user: process.env.CLIENT, pass: process.env.SECRET };
const paymentRoutes = Router();
paymentRoutes.post(`/create-payment`, async (req, res) => {
  const { price } = req.body;
  try {
    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price,
          },
        },
      ],
      application_context: {
        brand_name: `PSICONNECT`,
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.URL_BACK}/payment/execute-payment`,
        cancel_url: `${process.env.URL_FRONT}/`,
      },
    };
    request.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      {
        auth,
        body,
        json: true,
      },
      async (err, response) => {
        try {
          const newConsult = await createConsult({
            id: response.body.id,
            status: response.body.status,
            ...req.body,
          });
        } catch (error) {
          return res.status(500).json({ data: error.message });
        }
        res.json({ data: response.body });
      }
    );
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

paymentRoutes.get(`/execute-payment`, async (req, res) => {
  const token = req.query.token; //<-----------

  request.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {
      auth,
      body: {},
      json: true,
    },
    async (err, response) => {
      try {
        await completeConsult({
          id: response.body.id,
          status: response.body.status,
        });
      } catch (error) {
        return res.status(500).json({ data: error.message });
      }
      res.redirect(process.env.URL_FRONT)
      return res.end
    }
  );
});

export default paymentRoutes;

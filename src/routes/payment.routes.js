import { Router } from "express";
import { config } from "dotenv";
import request from "request";
import { completeConsult, createConsult } from "../query/queryToConsult.js";
import { getProfessionalById } from "../query/queryToPsico.js";
import { getUserById } from "../query/queryToUser.js";
import { createPayment, getAllPayment, getAllPaymentByProfessional, getAllPaymentByUser, getPaymentById, getResultAllPaymentByProfessional } from "../query/queryToPayment.js";
config();

const auth = { user: process.env.CLIENT, pass: process.env.SECRET };
const paymentRoutes = Router();
paymentRoutes.post(`/create-payment`, async (req, res) => {
  const { price ,userId ,professionalId} = req.body;
  try {
    const validatorUser=await getUserById(userId)
    const validatorProfesional=await getProfessionalById(professionalId)
    if(!userId&& !professionalId) return res.status(401).json('Falta de usuario o profesional para asociar pago')
    if(!validatorProfesional){
      return res.status(401).json('Profesional inexistente')
    }
    if(!validatorUser){
      return res.status(401).json('Usuario inexistente')
    }
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
          const newPay= await createPayment({
            id: response.body.id,
            status: response.body.status,
            ...req.body,
          })
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
      res.redirect(`${process.env.URL_FRONT}/userProfile/appointments`)
      return res.end
    }
  );
});

paymentRoutes.get("/", async (req, res) => {
  try {
    const consult = await getAllPayment();
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

paymentRoutes.get("/id/:id", async (req, res) => {

  try {
    const consult = await getPaymentById(req.params.id);
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

paymentRoutes.get("/user/:userId", async (req, res) => {
  try {
    const consult = await getAllPaymentByUser(req.params.userId);
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

paymentRoutes.get("/userPayment/:userId", async (req, res) => {
  const {userId} = req.params
  try {
    const consult = await getResultAllPaymentByUser(userId);
    return res.status(200).json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

paymentRoutes.get("/professional/:professionalId", async (req, res) => {
  try {
    const consult = await getAllPaymentByProfessional(
      req.params.professionalId
    );
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
paymentRoutes.get("/professionalPayment/:professionalId", async (req, res) => {
  const {professionalId} = req.params
  try {
    const consult = await getResultAllPaymentByProfessional(professionalId);
    return res.status(200).json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default paymentRoutes;

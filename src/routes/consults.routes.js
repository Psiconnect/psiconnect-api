import { Router } from "express";
import { config } from "dotenv";
import {
  getAllConsult,
  getAllConsultByProfessional,
  getAllConsultByUser,
  getConsultById,
} from "../query/queryToConsult.js";

config();

const consultsRoutes = Router();

consultsRoutes.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const consult = await getConsultById(id);
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
consultsRoutes.delete("/deleted/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const consult = await getConsultById(id);
    if(!consult) res.status(404).json({ data: error.message })
    consult.status = "CANCELADO";
    await consult.save();
    return res.status(200).json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

consultsRoutes.get("/", async (req, res) => {
  try {
    const consult = await getAllConsult();
    if (!consult) return res.json(consult);
    const mapConsults = consult.map((el) => {
      return {
        id: el.id,
        userId: el.userId,
        professionalId: el.professionalId,
        user: el.user.name,
        professional: el.professional.name,
        status: el.status,
        date: el.date,
        price: el.date,
      };
    });
    return res.json(mapConsults);
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
consultsRoutes.get("/user/:userId", async (req, res) => {
  try {
    const consult = await getAllConsultByUser(req.params.userId);
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

consultsRoutes.get("/professional/:professionalId", async (req, res) => {
  try {
    const consult = await getAllConsultByProfessional(
      req.params.professionalId
    );
    return res.json(consult);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default consultsRoutes;

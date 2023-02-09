import { Router } from "express";
import { findAllSkills } from "../query/queryToSkills.js";


const skillsRoutes = Router();

skillsRoutes.get('/', async (req, res) => {
    try {
      const data = await findAllSkills();
      if (!data) return res.status(400).json("No se encontraron skills");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  })


  


export default skillsRoutes;
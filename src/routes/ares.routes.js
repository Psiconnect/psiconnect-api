import { Router } from "express";
import AREA from "../models/AREAS.js";
import { findAllArea, findAllProfessionalWithArea, findOnlyAreas } from "../query/queryToArea.js";


const areaRoutes = Router();

areaRoutes.get('/', async (req, res) => {
    try {
      const data = await findAllArea();
      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  })
areaRoutes.get('/id/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const data = await AREA.findByPk(id);
      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  })
areaRoutes.get('/professional/:Area', async (req, res) => {
  const {Area} = req.params;
 
    try {
      const data = await findAllProfessionalWithArea(Area);

      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  })

  areaRoutes.get('/onlyAreas', async (req, res) => {
    
      try {
        const data = await findOnlyAreas();
  
        if (!data) return res.status(400).json("Base de datos vacia");
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ data: error.message });
      }
    })
  


export default areaRoutes;

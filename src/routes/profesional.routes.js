import { compare } from "bcrypt";
import { Router } from "express";
import profesionalRegisterDTO from "../DTO/profesionalDTO/profesionalRegisterDTO.js";
import { generatorTKN } from "../helpers/generatorTKN.js";
import {
    createProfesionalUser,
    findAllProfesional,
    getProfesionalByDNI,
    getProfesionalByEmail,
    getProfesionalById
} from "../query/queryToPsico.js";

const profesionalRoutes = Router();

profesionalRoutes.get("/", async (req, res) => {
    try {
      const data = await findAllProfesional();
      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  });
  
profesionalRoutes.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;

    const profesionalLogin = await getProfesionalByEmail(email);
    const checkPassword = await compare(password, profesionalLogin?.password);

    if (!profesionalLogin || !checkPassword)
      return res.status(400).json("credenciales incorrectas");
    const token = await generatorTKN({ id: profesionalLogin.id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

profesionalRoutes.post(
  "/register",
  profesionalRegisterDTO,
  async (req, res) => {
    try {
      const { email, DNI } = req.body;

      const existingEmail = await getProfesionalByEmail(email);
      const existingDNI = await getProfesionalByDNI(DNI);

      if (existingEmail || existingDNI)
        return res
          .status(400)
          .json("Usuario ya registrado con dichas crendenciales");

      const newProfesional = await createProfesionalUser(req.body);

      return res.status(201).json(newProfesional);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

profesionalRoutes.get(
  '/:professionalId',
    async (req, res) => {
      try{
        const { professionalId } = req.params;

        const professional = await getProfesionalById(professionalId)

        if(!professional) return res.status(404).json('Professional not found')

        return res.status(200).json(professional)

      }catch(err){
        return res.status(500).json({ data: err.message });
      }
    });

export default profesionalRoutes;

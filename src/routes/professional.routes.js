import { compare } from "bcrypt";
import { Router } from "express";
import professionalPostRegisterDTO from "../DTO/professionalDTO/prefesionalPostRegisterDTO.js";
import professionalRegisterDTO from "../DTO/professionalDTO/professionalRegisterDTO.js";
import userJWTDTO from "../helpers/checkTKN.js";
import { generatorTKN } from "../helpers/generatorTKN.js";
import {
    createProfessionalUser,
    findAllProfessional,
    getProfessionalByDNI,
    getProfessionalByEmail,
    getProfessionalById
} from "../query/queryToPsico.js";

const professionalRoutes = Router();

professionalRoutes.get("/", async (req, res) => {
    try {
      const data = await findAllProfessional();
      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  });
  
professionalRoutes.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;

    const professionalLogin = await getProfessionalByEmail(email);
    const checkPassword = await compare(password, professionalLogin?.password);

    if (!professionalLogin || !checkPassword)
      return res.status(400).json("credenciales incorrectas");
    const token = await generatorTKN({ id: professionalLogin.id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.post(
  "/register",
  professionalRegisterDTO,
  async (req, res) => {
    try {
      const { email, DNI } = req.body;

      const existingEmail = await getProfessionalByEmail(email);
      const existingDNI = await getProfessionalByDNI(DNI);

      if (existingEmail || existingDNI)
        return res
          .status(400)
          .json("Usuario ya registrado con dichas crendenciales");

      const newProfessional = await createProfessionalUser(req.body);

      return res.status(201).json(newProfessional);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);
// corregi un error by:dani
professionalRoutes.get(
  '/:professionalId',
    async (req, res) => {
      const { professionalId } = req.params;
      try{
        const professional = await getProfessionalById(professionalId)
        if(!professional) return res.status(404).json('Professional not found')

        return res.status(200).json(professional)

      }catch(err){
        return res.status(500).json({ data: err.message });
      }
    });

    professionalRoutes.put("/descriptionProfesional/:id", professionalPostRegisterDTO, async(req,res)=>{
      const {professionalId}= req.params;
      const professional=  await getProfessionalById(professionalId)
      
      try {
        
      } catch (error) {
        
      }
    })

    professionalRoutes.put("/password", userJWTDTO, async (req, res) => {
      const { newPassword, oldPassword } = req.body;
      try {
        const professional = await getUserById(req.id);
        const checkPassword = await compare(oldPassword, professional?.password);
        if (!checkPassword) return res.status(400).json("contraseña incorrecta");
        professional.password = newPassword;
        professional.save();
        return res.status(202).json("nice");
      } catch (error) {
        return res.status(500).json({ data: error.message });
      }
    });

export default professionalRoutes;

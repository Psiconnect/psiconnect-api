import { compare } from "bcrypt";
import { Router } from "express";
import professionalPostRegisterDTO from "../DTO/professionalDTO/prefesionalPostRegisterDTO.js";
import professionalRegisterDTO from "../DTO/professionalDTO/professionalRegisterDTO.js";
import userJWTDTO from "../helpers/checkTKN.js";
import { generatorTKN } from "../helpers/generatorTKN.js";
import {
<<<<<<< HEAD
    createProfessionalUser,
    findAllProfessional,
    getProfessionalByDNI,
    getProfessionalByEmail,
<<<<<<< HEAD
    getProfessionalById,
    findAllProfessionalByAreaAndNames,
    setProfessionalDescription
=======
    getProfessionalById
>>>>>>> 3b587139da276c924678ee0cac63ca4a5322fe8a
=======
  createProfessionalUser,
  findAllProfessional,
  findAllProfessionalByAreaAndNames,
  getProfessionalByDNI,
  getProfessionalByEmail,
  getProfessionalById,
  setProfessionalDescription,
>>>>>>> bbb942001540ed5ab5c97424035b0f82a0f35631
} from "../query/queryToPsico.js";

const professionalRoutes = Router();

professionalRoutes.get("/", async (req, res) => {
  const { name, lastName } = req.query;
    try {
      let data;
      if(!name && !lastName) data = await findAllProfessional();
      else data=await findAllProfessionalByAreaAndNames(null,name,lastName);
      if (!data) return res.status(400).json("Base de datos vacia");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  });

professionalRoutes.get("/:area", async (req, res) => {
  const { name, lastName } = req.query;
  const {area} = req.params;
    try {
      let data;
     if(!name && !lastName) data= await findAllProfessionalWithArea(area)
      else data=await findAllProfessionalByAreaAndNames(area,name,lastName);
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
<<<<<<< HEAD
professionalRoutes.get(
  '/:professionalId',
    async (req, res) => {
      const { professionalId } = req.params;
      try{
        const professional = await getProfessionalById(professionalId)
        if(!professional) return res.status(404).json('Profesional no encontrado')
=======
professionalRoutes.get("/:professionalId", async (req, res) => {
  const { professionalId } = req.params;
  try {
    const professional = await getProfessionalById(professionalId);
    if (!professional) return res.status(404).json("Professional not found");
>>>>>>> bbb942001540ed5ab5c97424035b0f82a0f35631

    return res.status(200).json(professional);
  } catch (err) {
    return res.status(500).json({ data: err.message });
  }
});

professionalRoutes.put(
  "/descriptionProfesional/:professionalId",
  professionalPostRegisterDTO,
  async (req, res) => {
    const { professionalId } = req.params;
    try {
      const profesionalUpdate = setProfessionalDescription(
        professionalId,
        req.body
      );
      if (!profesionalUpdate) return res.status(500).json("No se modifico correctamente");

<<<<<<< HEAD
    professionalRoutes.put(
<<<<<<< HEAD
      "/descriptionProfessional/:professionalId", 
      professionalPostRegisterDTO, 
      async(req, res)=>{
        const { professionalId }= req.params;
        try {
          const professional = await getProfessionalById(professionalId)
          if(!professional) return res.status(404).json('Profesional no encontrado')
          setProfessionalDescription({...req.body, id:professionalId})

          res.status(200).json('La informacion fue añadida con exito')
        }catch(error) {
          res.status(500).json({data: err.message })
      }
    });
=======
      "/descriptionProfesional/:professionalId",
      professionalPostRegisterDTO,
      async (req, res) => {
        const { professionalId } = req.params;
        try {
          const professional = await getProfessionalById(professionalId);
          if (!professional) return res.status(404).json("Professional not found");
          if (req.body) {
            professional.description = req.body.description;
            professional.skills = req.body.skills;
            professional.linkedin = req.body.linkedin;
            professional.save();
            return res.status(201).json("change do it");
          }
        } catch (error) {
          return res.status(500).json({ data: error.message });
        }
      }
    );
>>>>>>> 3b587139da276c924678ee0cac63ca4a5322fe8a
=======
      return res.status(201).json("Cambios generados");
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);
>>>>>>> bbb942001540ed5ab5c97424035b0f82a0f35631

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

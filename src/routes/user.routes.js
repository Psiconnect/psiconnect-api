import { Router } from "express";
import userRegisterDTO from "../DTO/userDTO/userRegisterDTO.js";
import { createUser, getUserByEmail } from "../query/queryToUser.js";

const userRoutes = Router();
//ruta post
userRoutes.post("/register",userRegisterDTO, async (req, res) => {
  try {
  const { email } = req.body;
    // se buscar en la query getUserbyEmail si ya existe un usuario con ese email
    const exitingEmail = await getUserByEmail(email);
    // si existe retornamos un error
    if (exitingEmail) return res.status(400).json("email ya registrado");
    //de igual forma para el nombre de usuario
    // const exitingName = await getUserByEmail(name);
    // // if (exitingName) return res.status(400).json("bla bla bla");
    //si pasan estos dos validadores pasamos los datos a la query de crear usuario
    const newUser = await createUser(req.body);
    // respondemos con el estado correspondiente y devolvemos el nuevo usuario
    // anotacion: genera token
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({data: error.message})
  }
});


export default userRoutes;
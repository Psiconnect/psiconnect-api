import { Router } from "express";
import userRegisterDTO from "../DTO/userDTO/userRegisterDTO.js";
import {
  createUser,
  findAllUser,
  getUserByEmail,
  getUserById,
} from "../query/queryToUser.js";

const userRoutes = Router();
//ruta post
userRoutes.post("/register", userRegisterDTO, async (req, res) => {
  try {
    const { email } = req.body;
    // se buscar en la query getUserbyEmail si ya existe un usuario con ese email
    const exitingEmail = await getUserByEmail(email);
    // si existe retornamos un error
    if (exitingEmail) return res.status(400).json("email ya registrado");
    //de igual forma para el nombre de usuario
    //si pasan estos dos validadores pasamos los datos a la query de crear usuario
    const newUser = await createUser(req.body);
    // respondemos con el estado correspondiente y devolvemos el nuevo usuario
    // anotacion: genera token
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // se buscar en la query getUserbyEmail si ya existe un usuario con ese email
    const data = await getUserById(email);
    // si existe retornamos un error
    if (!data) return res.status(400).json("Id no registrado");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.get("/",async(req, res)=>{
  try {
    const data =await findAllUser()
    if (!data) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
})

userRoutes

export default userRoutes;

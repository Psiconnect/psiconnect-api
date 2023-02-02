import { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import { Router } from "express";
import userEmailDTO from "../DTO/userDTO/userEmailDTO.js";
import userRegisterDTO from "../DTO/userDTO/userRegisterDTO.js";
import userJWTDTO from "../helpers/checkTKN.js";
import { generatorTKN } from "../helpers/generatorTKN.js";
import {
  createUser,
  findAllUser,
  getUserByEmail,
  getUserById,
  getUserByResetToken,
} from "../query/queryToUser.js";
import { config } from "dotenv";

const userRoutes = Router();

//ruta post
userRoutes.post("/register", userRegisterDTO, async (req, res) => {
  try {
    const { email } = req.body;
    const exitingEmail = await getUserByEmail(email);
    if (exitingEmail) return res.status(400).json("email ya registrado");
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await getUserByEmail(email);
    if (!userLogin)
    return res.status(400).json("credenciales incorrectas");
    const checkPassword = await compare(password, userLogin?.password);
    if (!checkPassword)
      return res.status(400).json("credenciales incorrectas");
    const token = await generatorTKN({ id: userLogin.id });
    return res.status(201).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.get("/id", userJWTDTO,async (req, res) => {
  const  id  = req.id;
  try {
   const user = await getUserById(id);
   if(!user) return res.status(404).json('no se encontro datos')
   return res.status(200).json(user)
  } catch (error) {
    return res.status(400).send({ data: error.message });
  }
});

userRoutes.get("/", async (req, res) => {
  try {
    const data = await findAllUser();
    if (!data) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/newPassword", userJWTDTO, async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  try {
    const user = await getUserById(req.id);
    const checkPassword = await compare(oldPassword, user?.password);
    if (!checkPassword) return res.status(400).json("contraseña incorrecta");
    user.password = newPassword;
    user.save();
    return res.status(202).json("nice");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/forget-password", userEmailDTO, async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).json({ message: "Email is required" });
  try {
    const user = await getUserByEmail(email);
    const token = generatorTKN({ id: userLogin.id });
    user.resetToken = token;
    user.save();
    let verificationLink = `http://localhost:5000/newPasswordForget/${token}`;
    //emalaitor mail
    return res.status(200).json('Verificacion enviada al mail')
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/newPasswordForget", async (req, res) => {
  const { newPassword } = req.body;
  const resetToken = req.headers.reset;
  if (!(resetToken && newPassword)) {
    res.status(400).json({ message: "All the credentials it required" });
  }
  try {
    const user = await getUserByResetToken(resetToken);
    user.password = newPassword;
    user.resetToken = "";
    user.save();
    return res.status(202).json({ message: "Someting goes Wrog!" });
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default userRoutes;

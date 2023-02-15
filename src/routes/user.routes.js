import { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import { Router } from "express";
import USERS from "../models/USERS.js";
import userEmailDTO from "../DTO/userDTO/userEmailDTO.js";
import userRegisterDTO from "../DTO/userDTO/userRegisterDTO.js";
import { userJWTDTO } from "../helpers/checkTKN.js";
import { generatorTKN } from "../helpers/generatorTKN.js";

import {
  updateUserData,
  createUser,
  findAllUser,
  getOrCreate,
  getUserByEmail,
  getUserById,
  getUserByResetToken,
} from "../query/queryToUser.js";
import { adminLogin } from "../helpers/adminLogin.js";

const userRoutes = Router();

//ruta post
userRoutes.post("/register", userRegisterDTO, async (req, res) => {
  try {
    const { email } = req.body;
    const exitingEmail = await getUserByEmail(email);
    if (exitingEmail) return res.status(400).json("email ya registrado");
    const newUser = await createUser(req.body);
    const token = await generatorTKN({ id: newUser.id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.post("/login",adminLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await getUserByEmail(email);
    if (!userLogin) return res.status(400).json("credenciales incorrectas");
    const checkPassword = await compare(password, userLogin?.password);
    if (!checkPassword) return res.status(400).json("credenciales incorrectas");
    const token = await generatorTKN({ id: userLogin.id });
    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.get("/id", userJWTDTO, async (req, res) => {
  const { id } = req.tkn;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json("no se encontro datos");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ data: error.message });
  }
});
userRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json("no se encontro datos");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ data: error.message });
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
    const user = await getUserById(req.tkn.id);
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
    const linkConfirmEmail = `${process.env.URL_BACK || 'http://localhost:5000'}/user/newPasswordForget?tkn=${token}`;
    try {
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: email,
        subject: "OLVIDE MI CLAVE 📧✔",
        html: `
        <h2>He olvidado mi clave 📩</h2>
        <p> Hola, como te encuentras?... esperamos que bien, Necesitamos que confirmes tu email para poder seguir con el siguiente proceso de seleccion de los profesionales ✔.
        <p>Ten en cuenta que tienes 24 horas para poder confirmar el email ⏱📆, en caso de que no lo hagas en el tiempo limite establecido deberas registrarte nuevamente ♻.</p> 
        </p></p>
        <p>Desde ya muchas gracias por su atencion y te enviamos un gran saludo ❤🤝.
        <p>atte: El equipo de Psiconnect 💪✌.</p>
        <b> Porfavor haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso 👉:</b>
        <a href="${linkConfirmEmail}"> VERIFICAR AHORA 👍 </a>`
        ,
      });
      user.resetToken = token;
      await user.save();
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
    return res.status(200).json("Verificacion enviada al mail");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/newPasswordForgetEmail", async (req, res) => {

  const resetToken = req.query.tkn;
  try {
    const user = await getUserByResetToken(resetToken);
    if (!user) {
      return res.status(404).json({ data: 'Credenciales incorrectas'});
    }
    res.redirect(`${process.env.URL_FRONT}/ChangeForgetPassword?tkn=${resetToken}`)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

//necesita un DTO y un modal
userRoutes.put("/ChangePasswordForget", async (req, res) => {
  const resetToken = req.query.tkn;
  const {newPassword}= req.body;
  try {
    const user = await getUserByResetToken(resetToken);
    if (!user) {
      return res.status(40).json({ data: 'Credenciales incorrectas'});
    }
    user.password= newPassword;
    user.resetToken= null;
    user.save()
    res.redirect(`${process.env.URL_FRONT}`)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});


userRoutes.post("/google",userRegisterDTO, async (req, res) => {
  try {
    const newUser = await getOrCreate(req.body);
    const token = await generatorTKN({ id: newUser[0].id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});


userRoutes.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, lastName, phone, image } = req.body   
    try{
      const updateUser = await updateUserData(id, name, lastName, phone, image)
       return res.status(200).json(updateUser)
    } catch(error){
        return res.status(500).json({ data: error.message });
    }
})
export default userRoutes;

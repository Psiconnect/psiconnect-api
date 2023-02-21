import { compare , hash} from "bcrypt";
import Jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { Router } from "express";
import userRegisterDTO from "../DTO/userDTO/userRegisterDTO.js";
import { userJWTDTO, userResetPasswordJWTDTO } from "../helpers/checkTKN.js";
import { generatorTKN, generadorConfirmEmailTKN, generadorResetPasswordTKN } from "../helpers/generatorTKN.js";

import {
  updateUserData,
  createUser,
  findAllUser,
  getOrCreate,
  getUserByEmail,
  getUserById,
  getUserByResetToken,
  getUserREALByTokenAny,
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
    console.log(userLogin.state);
    if(!userLogin.state) return res.status(401).json("lo sentimos pero su cuenta esta deshabilitada")
    const token = await generatorTKN({ id: userLogin.id });
    return res.status(200).json(token);
  } catch (error) {
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

userRoutes.put("/forget-password", async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).json({ message: "Email is required" });
  try {
    const user = await getUserByEmail(email);
    if(!user) return res.status(404).json({data:'No encontrado'})
    if(user.status !== "avalible") return res.status(401).json({data:'Cuenta desactivada'})
    const token = await generadorResetPasswordTKN({ id: user?.id });
    const linkConfirmEmail = `${process.env.URL_BACK || 'http://localhost:5000'}/user/newPasswordForget?reset=${token}`;
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
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
    user.resetToken = token;
    await user.save();

    return res.status(200).json("Verificacion enviada al mail");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/newPasswordForgetEmail", async (req, res) => {

  const resetToken = req.query.reset;
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
userRoutes.put("/ChangePasswordForget",userResetPasswordJWTDTO , async (req, res) => {
  const resetToken = req.tkn;
  const {newPassword}= req.body;
  try {
    const user = await getUserByResetToken(resetToken);
    if (!user) {
      return res.status(401).json({ data: 'Credenciales incorrectas'});
    }
    user.password= newPassword;
    user.resetToken= null;
    user.save()
    return res.status(200).send('La contraseña se modifico correctamente')
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});



userRoutes.put("/changePassword", userJWTDTO, async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  try {
    const user = await getUserById(req.tkn.id);
    

    if (!user)
      res.status(404).json({ error: "Profesional inexistente" });

    const checkPassword = await compare(oldPassword, user?.password);
    if (!checkPassword) return res.status(400).json("contraseña incorrecta");

    const pass= await hash(newPassword, 10);
    user.password =pass
    await user.save();

    return res.status(202).json("nice");
  } catch (error) {
    
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.put("/changeEmail", userJWTDTO, async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await getUserById(req.tkn.id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    const token = await generadorConfirmEmailTKN({ id: user.id });
    const linkConfirmEmail = `${
      process.env.URL_BACK || "http://localhost:5000"
    }user/email/confirmationChangeEmail?confirm=${token}&email=${email}`;

    try {
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: email,
        subject: "Confirmar email 📧✔",
        html: `
          <h2>Confirmacion del email 📩</h2>
          <p> Hola, como te encuentras?... esperamos que bien, Necesitamos que confirmes tu email para poder seguir con el siguiente proceso de seleccion de los profesionales ✔.
          <p>Ten en cuenta que tienes 24 horas para poder confirmar el email ⏱📆, en caso de que no lo hagas en el tiempo limite establecido deberas registrarte nuevamente ♻.</p> 
          </p></p>
          <p>Desde ya muchas gracias por su atencion y te enviamos un gran saludo ❤🤝.
          <p>atte: El equipo de Psiconnect 💪✌.</p>
          <b> Porfavor haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso 👉:</b>
          <a href="${linkConfirmEmail}"> VERIFICAR AHORA 👍 </a>`,
      });
    } catch (error) {
      return res.status(403).json({ data: error.message });
    }
    user.confirmEmailToken = token;
    await user.save();
    return res.status(200).json("AL FIN!");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

userRoutes.get(
  "/email/confirmationChangeEmail",
  async (req, res) => {
    try {
      const token = req.query.confirm;
      const email = req.query.email;

      const user = await getUserREALByTokenAny(token,"confirmEmailToken");
      if (!user) return res.status(404).json({ data: "No encontrado" });

      user.confirmEmailToken = null;
      user.email = email;
      await user.save();
      res.redirect(`${process.env.URL_FRONT}`);
      return res.end;
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);


userRoutes.post("/google",userRegisterDTO, async (req, res) => {
  try {
    const newUser = await getOrCreate(req.body);
    if(!newUser.state) return res.status(401).json("lo sentimos pero su cuenta esta deshabilitada")
    const token = await generatorTKN({ id: newUser.id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});


userRoutes.put('/id',userJWTDTO, async (req, res) => {
    const { id } = req.tkn
    const { name, lastName, phone, avatar } = req.body 
    console.log(req.body)  
    try{
      const user = await getUserById(id);
condole-log(user)
    if (!user) return res.status(404).json("no se encontro datos");
      const updateUser = await updateUserData(user, name, lastName, phone, avatar)
      if(!updateUser) res.status(500).json("No se modifico correctamente");
      return res.status(200).json(updateUser)
    } catch(error){
        return res.status(500).json({ data: error.message });
    }
})
export default userRoutes;

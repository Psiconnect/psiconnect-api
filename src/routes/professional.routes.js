import { compare } from "bcrypt";
import { Router } from "express";
import transporter from "../config/nodemailer.js";
import professionalPostRegisterDTO from "../DTO/professionalDTO/prefesionalPostRegisterDTO.js";
import professionalRegisterDTO from "../DTO/professionalDTO/professionalRegisterDTO.js";
import { userConfirmEmailJWTDTO, userJWTDTO, userPostRegisterJWTDTO } from "../helpers/checkTKN.js";
import { generadorConfirmEmailTKN, generatorTKN, generadorPostRegisterTKN } from "../helpers/generatorTKN.js";
import { getProfessionalReview } from '../query/queryToReview.js'
import {  
  createProfessionalUser,
  findAllProfessional,
  findAllProfessionalByAreaAndNames,
  findAllProfessionalWithArea,
  getProfessionalByDNI,
  getProfessionalByEmail,
  getProfessionalById,
  getProfessionalByTokenAny,
  setProfessionalDescription,
} from "../query/queryToPsico.js";


const professionalRoutes = Router();

professionalRoutes.get("/", async (req, res) => {
  const { name, lastName } = req.query;
  try {
    let data;
    if (!name && !lastName) data = await findAllProfessional();
    else data = await findAllProfessionalByAreaAndNames(null, name, lastName);
    if (!data) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.get("/area/:area", async (req, res) => {

  const { name, lastName } = req.query;
  const { area } = req.params;
  try {
    let data;
    if (!name && !lastName) data = await findAllProfessionalWithArea(area);
    else data = await findAllProfessionalByAreaAndNames(area, name, lastName);
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
    console.log(professionalLogin.id)
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

      if (existingEmail || existingDNI) {
        return res
          .status(400)
          .json("Usuario ya registrado con dichas crendenciales");
      }
      const newProfessional = await createProfessionalUser(req.body);

      const token = await generadorConfirmEmailTKN({ id: newProfessional.id });

      newProfessional.confirmEmailToken = token;
      newProfessional.state = 'needConfirm'

      const linkConfirmEmail = `${process.env.URL_BACK || 'http://localhost:5000'}/professional/confirmationEmail?tkn=${token}`;
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
            <a href="${linkConfirmEmail}"> VERIFICAR AHORA 👍 </a>`
            ,
        });
      } catch (error) {
        return res.status(500).json({ data: err.message });
      }
      
      await newProfessional.save();
      return res.status(201).json(newProfessional);

    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

professionalRoutes.get("/confirmationEmail", async (req, res) => {
  try {
    const token = req.query.tkn;

    const professional = await getProfessionalByTokenAny(token, 'confirmEmailToken')

    if(!professional) return res.status(404).json({data:'Token no coincide con ningun usuario'})
    if(professional.confirmEmailToken !== token) return res.status(401).json({ data: "No autorizado" });
    if(professional.state !== 'needConfirm') return res.status(401).json({data:'El usuario ya fue confirmado'})
    
    professional.state = 'pending';
    professional.confirmEmailToken = null;

    const newToken = await generadorPostRegisterTKN({ id: professional.id });

    professional.postRegisterToken = newToken;
    const linkConfirmEmail = `${process.env.URL_FRONT|| 'http://127.0.0.1:5173'}/profesional/postRegister?tkn=${newToken}`;

    try{
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: professional.email,
        subject: "MEEE QUIEERO METER UN TIRO FER, pero ,Bienvenido a Psiconnect",
        html: `
        <h2>¡Hi!</h2>       -----OJO MODIFICAR---------
        <p>Good morning, new Styles shop user, I hope you are well, please, in order to use your account you have to confirm your email, to do so do the following:</p>
        <b>Please click on the following link, or paste this into your browser to complete the process:</b>
        <a href="${linkConfirmEmail}">CONTINUA EL FORMULARIO</a>`,
      });
    }catch (error) {
      return res.status(500).json({ data: error.message });
    }
    await professional.save()
    res.redirect(`${process.env.URL_FRONT}/confirmationEmail`)
    return res.end
  }catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.get("/id", userJWTDTO, async (req, res) => {
  const {id}=req.tkn;
  try {
    console.log(id)
    const professional= await getProfessionalById(id);
    if(!professional) return res.status(404).json('no se encontro datos');
    return res.status(200).json(professional)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// corregi un error by:dani
// El endpoint de area estaba pisando esta ruta le agregue details antes del params 
professionalRoutes.get("/details/:professionalId", async (req, res) => {
  const { professionalId } = req.params;
  try {
    const professional = await getProfessionalById(professionalId);
    if (!professional) return res.status(404).json("Profesional no encontrado");
    return res.status(200).json(professional);
  } catch (err) {
    return res.status(500).json({ data: err.message });
  }
});

professionalRoutes.get("/details/:professionalId/review", async (req, res) => {
  const { professionalId } = req.params;
  try {
    const professionalReview = await getProfessionalReview(professionalId);
    if (!professionalReview) return res.status(404).json("Profesional no encontrado");
    

    return res.status(200).json(professional);
  } catch (err) {
    return res.status(500).json({ data: err.message });
  }
});

professionalRoutes.get("/token/postRegister", userPostRegisterJWTDTO, async (req, res) => {
  const token = req.headers.post.split(" ")[1];
  try {
    const professional = await getProfessionalByTokenAny(token, 'postRegisterToken');

    if (!professional) return res.status(404).json({ data: "Profesional No registrado" });
    if(professional.postRegisterToken !== token) return res.status(401).json({ data: "No autorizado" });

    return res.status(204).json(professional)
  } catch (err) {
    return res.status(500).json({ data: err.message });
  }
});

professionalRoutes.put(
  "/descriptionProfesional",
  professionalPostRegisterDTO,
  userPostRegisterJWTDTO,
  async (req, res) => {
    const token = req.tkn
    try {
      const professional = await getProfessionalByTokenAny(token,'postRegisterToken');

      if(!professional) return res.status(404).json({data:"Token no coincide con ningun usuario"});
      if(professional.postRegisterToken !== token) return res.status(401).json({data:"No autorizado"});

      const profesionalUpdate = await setProfessionalDescription(professional.id, req.body);

      if (!profesionalUpdate) return res.status(500).json("No se modifico correctamente");

      profesionalUpdate.postRegisterToken = null;

      try {
        await transporter.sendMail({
          from: ` "📫 Confirm Email...📢" <${process.env.USER_EMAILER}>`,
          to: email,
          subject: "Confirm Email 📧✔",
          html: `
            <h2>¡Hi!</h2>       -----OJO MODIFICAR---------
            <h1>Recibimos tus datos correctamente.</h1>
            <p>EMPEZA A LABURAR LADRI.</p>
            `,
        });
      } catch (error) {
        return res.status(500).json({ data:'no se envio correo correctamente pero igual anda a laburar' });
      }   

      await postRegisterToken.save() 
      return res.status(201).json("Cambios generados");

    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

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

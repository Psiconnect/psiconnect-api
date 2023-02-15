import { compare } from "bcrypt";
import { Router } from "express";
import transporter from "../config/nodemailer.js";
import professionalPostRegisterDTO from "../DTO/professionalDTO/prefesionalPostRegisterDTO.js";
import professionalRegisterDTO from "../DTO/professionalDTO/professionalRegisterDTO.js";
import { adminLogin } from "../helpers/adminLogin.js";
import { userConfirmEmailJWTDTO, userResetPasswordJWTDTO, userJWTDTO, userPostRegisterJWTDTO } from "../helpers/checkTKN.js";
import { generadorResetPasswordTKN, generadorConfirmEmailTKN, generatorTKN, generadorPostRegisterTKN } from "../helpers/generatorTKN.js";
import {  
  createProfessionalUser,
  findAllProfessional,
  findAllProfessionalByAreaAndNames,
  findAllProfessionalWithArea,
  getProfessionalByDNI,
  getProfessionalByEmail,
  getProfessionalById,
  getProfessionalByTokenAny,
  setModificationProfesional,
  editProfesional
} from "../query/queryToPsico.js";


const professionalRoutes = Router();
professionalRoutes.get("/area/:area", async (req, res) => {

  const { name, lastName } = req.query;
  const { area } = req.params;
  try {
    let data;
    if (!name && !lastName) data = await findAllProfessionalWithArea(area);
    else data = await findAllProfessionalByAreaAndNames(area, name, lastName);
    if (!data.length) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.get("/id", userJWTDTO, async (req, res) => {
  const {id}=req.tkn;
  try {
    const professional= await getProfessionalById(id);
    if(!professional) return res.status(404).json({error:'no se encontro datos'});
    return res.status(200).json(professional)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.post("/login",adminLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const professionalLogin = await getProfessionalByEmail(email);
    const checkPassword = await compare(password, professionalLogin?.password || '');

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

      if (existingEmail || existingDNI) {
        return res
          .status(400)
          .json("Usuario ya registrado con dichas crendenciales");
      }
      const newProfessional = await createProfessionalUser(req.body);

      const token = await generadorConfirmEmailTKN({ id: newProfessional.id });

      const linkConfirmEmail = `${process.env.URL_BACK || 'http://localhost:5000'}/professional/confirmationEmail?confirm=${token}`;
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
        });
      } catch (error) {
        return res.status(500).json({ data: err.message });
      }
      newProfessional.confirmEmailToken = token;
      newProfessional.state = 'needConfirm'

      await newProfessional.save();

      return res.status(201).json(newProfessional);

    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

professionalRoutes.get("/confirmationEmail", userConfirmEmailJWTDTO, async (req, res) => {
  try {
    const token = req.tkn;

    const professional = await getProfessionalByTokenAny(token, 'confirmEmailToken')

    if(!professional) return res.status(404).json({data:'No encontrado'})
    if(professional.state !== 'needConfirm') return res.status(401).json({data:'El usuario ya fue confirmado'})

    const newToken = await generadorPostRegisterTKN({ id: professional.id });

    const linkPostRegister = `${process.env.URL_FRONT|| 'http://127.0.0.1:5173'}/profesional/postRegister?tkn=${newToken}`;

    try{
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: professional.email,
        subject: "Pre Registro para formar parte de los profesionales de Psiconnect",
        html: `
        <h2>Hola ${professional.name} ${professional.lastName}</h2>  
        <p>Queremos darte las gracias por realizar el Pre registro de profesionales de Psiconnect, Como ya sabras o habras leido en nuestra web, 
        para formar parte de nuestros profesionales deberas pasar por varios filtros o etapas, las cuales estan divididas en 4 :</p>
        <ol>
          <li><b> Pre Registro</b><p>- En el pre registro pediremos datos que consideramos importantes, estos datos no deberan estar sujetos a ningun otro profesional que exista o este en proceso para formar parte de psiconecct.</p></li>
          <li><b>Validacion De Datos</b><p>- En esta etapa tendremos a personal muy confiable de nuestro equipo verificando que los datos que proporcionaste en el pre registro sean reales y de confianza, una vez verificado por nuestro personal recibirás un mensaje con una respuesta confirmando si lograste pasar el filtro o no, <b>esto suele tener un tiempo de espera aprox. 1 a 3 dias, se paciente.</b></p></li>
          <li><b>Completar Tu Pefil</b><p>- Después de pasar la Validación de Datos lo único que tendrás que hacer será rellenar un formulario con los datos que te pedimos para poder completar tu perfil, <b>Estos datos son necesarios</b>.</p></li>
          <li><b>Iniciar Sesion</b><p>- Después de completar los datos de tu perfil se iniciara sesion automaticamente y podras usar tu cuenta tranquilamente</p></li>
          </ol>
        <b>Recordatorio</b>
        <p>Actualmente te encuentras en la etapa 2, asique se paciente y espera tu respuesta :)</p>
        <p>Desde ya muchas gracias por tu atencion y te deseamos mucha suerte.</p>
        <p>atte: El equipo de Psiconnect.💪✌</p>
        `,
      });
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: professional.email,
        subject: "Bienvenido al equipo de psicologos de Psiconnect",
        html: `
        <h2>Felicidades ${professional.name} ${professional.lastName}</h2>  
        <p>Recibimos y verificamos tus datos correctamente, a partir de ahora ya formas parte de nuestro equipo de psicologos.</p>
        <p>Ahora como siguiente paso deberas entrar al link y rellenar todos los datos pedidos en el formulario.</p>
        <b> Porfavor haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso 👉:</b>
        <a href="${linkPostRegister}">CONTINUAR CON EL FORMULARIO</a>`,
      });
    }catch (error) {
      return res.status(500).json({ data: error.message });
    }
    professional.state = 'pending';
    professional.confirmEmailToken = null;
    professional.postRegisterToken = newToken;

    await professional.save()
    
    res.redirect(`${process.env.URL_FRONT}`)
    return res.end
  }catch (error) {
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
    

    return res.status(200).json(professionalReview);
  } catch (err) {
    return res.status(500).json({ data: err.message });
  }
});

professionalRoutes.get("/token/postRegister", userPostRegisterJWTDTO, async (req, res) => {
  const token = req.tkn
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

      if(!professional) return res.status(404).json({data:"Usuario no encontrado"});

      const profesionalUpdate = await setModificationProfesional(professional, req.body);
  
      if (!profesionalUpdate) return res.status(500).json("No se modifico correctamente");

        await transporter.sendMail({
          from: `<${process.env.USER_EMAILER}>`,
          to: profesionalUpdate?.email,
          subject: `Hay novedades en tu cuenta de Psiconnect`,
          html: `
          <h2>Hola ${profesionalUpdate?.name} ${profesionalUpdate?.lastName}, tienes nuevas notificaciones.</h2>
          <p>Completaste con exito todos los filtros y formularios, ahora puedes acceder a tu cuenta tranquilamente, 
          <p>Ya puedes empezar a trabajar y generar conexiones con tu pacientes.</p></p>
          <p>Si tienes dudas, preguntas o quieres un consejo, puede acceder al siguente link :</p>
          <a>Link</a><p>FALTA INCORPORAR EL LINK</p>
          <span>AGREGAR MAS DATOS E INFORMACION</span>
            `,
          });

        const tokenLogin = await generatorTKN({ id: profesionalUpdate?.id });

        profesionalUpdate.status = 'avalible';
        profesionalUpdate.postRegisterToken = null;

        await profesionalUpdate.save() 

        return res.status(202).json({message:"Informacion Añadida",token: tokenLogin});
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

professionalRoutes.put("/changePassword", userJWTDTO, async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  try {
    const professional = await getUserById(req.tkn.id);
    if(!professional) res.status(404).json({error:'Profesional inexistente'})

    const checkPassword = await compare(oldPassword, professional?.password);
    if (!checkPassword) return res.status(400).json("contraseña incorrecta");

    professional.password = await hash(newPassword, 10);
    professional.save();

    return res.status(202).json("nice");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
professionalRoutes.get("/", async (req, res) => {
  const { name, lastName } = req.query;
  try {
    let data;
    if (!name && !lastName) data = await findAllProfessional();
    else data = await findAllProfessionalByAreaAndNames(null, name, lastName);
    if (!data.length) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
professionalRoutes.put("/update/id", userJWTDTO, async (req, res) => {
  const { id } = req.tkn;
  try {
    const professional= await getProfessionalById(id);

    if(!professional) return res.status(404).json('no se encontro datos');  

    const profesionalUpdate = await editProfesional(professional, req.body)
  
    if(!profesionalUpdate) return res.status(500).json("No se modifico correctamente");
    
    return res.status(200).json(profesionalUpdate)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.put("/forget-password", async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).json({ message: "Email is required" });
  try {
    const professional = await getProfessionalByEmail(email);
    if(!professional)res.status(400).json({ message: "Verificacion enviada al email" });

    const token = generadorResetPasswordTKN({ id: professional.id });
    
    const linkEmail = `${process.env.URL_BACK || 'http://localhost:5000'}/professional/newPasswordForgetEmail?reset=${token}`;
    try {
      await transporter.sendMail({
        from: `<${process.env.USER_EMAILER}>`,
        to: email,
        subject: "OLVIDE MI CLAVE 📧✔",
        html: `
        <h2>He olvidado mi clave 📩</h2>
        <p>Hola de nuevo ${professional?.name} ${professional?.lastName}, alparecer te has olvidado de tu contraseña y has solicitado un cambio de contraseña.
        <p>Porfavor lee el siguiente parrafo.</p>
        <p>Recuerda que tienes solo 15 min. para poder realizar el proceso ⏱, si no llegas a completarlo, deberas volver a solicitar el cambio de contraseña♻.</p> 
        <p>Desde ya muchas gracias por su atencion y te enviamos un gran saludo ❤🤝.
        <p>atte: El equipo de Psiconnect 💪✌.</p>
        <b> Porfavor haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso 👉:</b>
        <a href="${linkEmail}"> CAMBIAR CONTRASEÑA 👍 </a>`
        ,
      });
      professional.resetToken = token;
      await professional.save();
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
    return res.status(200).json("Verificacion enviada al email");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.get("/newPasswordForgetEmail", async (req, res) => {

  const resetToken = req.query.reset;
  try {
    const profesional = await getProfessionalByTokenAny(resetToken,'resetToken');
    if (!profesional) {
      return res.status(404).json({ data: 'Credenciales incorrectas'});
    }
    res.redirect(`${process.env.URL_FRONT}/ChangeForgetPassword?tkn=${resetToken}`)
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

professionalRoutes.put("/ChangePasswordForget", userResetPasswordJWTDTO,  async (req, res) => {
  const reset = req.tkn;
  const { newPassword }= req.body;
  try {
    const profesional = await getProfessionalByTokenAny(reset,'resetToken');
    if (!profesional) return res.status(401).json({ data: 'Credenciales incorrectas'});

    profesional.password = await hash(newPassword, 10);
    profesional.resetToken = null;

    await profesional.save();

    return res.status(200).send('La contraseña se modifico correctamente')
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});




export default professionalRoutes;
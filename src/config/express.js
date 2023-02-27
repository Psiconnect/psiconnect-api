import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "../routes/user.routes.js";
import reviewRoutes from "../routes/review.routes.js";
import areaRoutes from "../routes/ares.routes.js";
import professionalRoutes from "../routes/professional.routes.js";
import skillsRoutes from '../routes/skilss.routes.js';
import paymentRoutes from "../routes/payment.routes.js";
import consultsRoutes from "../routes/consults.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import { config } from "dotenv";

config();


const expressApp = express();

// Middlewares
// Middlewares
expressApp.use(cors({
  origin: ['http://localhost:5173', process.env.URL_FRONT],
  allowedHeaders: ['Content-Type', 'Authorization','reset','pos','confirm'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // agregamos los métodos permitidos
}));

expressApp.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
expressApp.use(bodyParser.json({ limit: "50mb"} ));
expressApp.use(cookieParser());
expressApp.use(morgan("dev"));

expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', '*');
  next();
});

// Routes
expressApp.use('/user', userRoutes)
expressApp.use('/professional', professionalRoutes)
expressApp.use('/areas', areaRoutes)
expressApp.use('/review', reviewRoutes)
expressApp.use('/skills', skillsRoutes)
expressApp.use('/payment', paymentRoutes)
expressApp.use('/consult', consultsRoutes)
expressApp.use('/admin', adminRoutes)

// Error catching endware.
expressApp.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;

  res.status(status).send(message);
});

export default expressApp;
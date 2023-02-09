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

const expressApp = express();

// Middlewares
expressApp.use(express.json());
expressApp.use(morgan("dev"));
expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
expressApp.use(bodyParser.json({ limit: "50mb" }));
expressApp.use(cookieParser());
expressApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
expressApp.use('/user', userRoutes)
expressApp.use('/professional', professionalRoutes)
expressApp.use('/areas', areaRoutes)
expressApp.use('/review', reviewRoutes)
expressApp.use('/skills', skillsRoutes)

// Error catching endware.
expressApp.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;

  res.status(status).send(message);
});

export default expressApp;
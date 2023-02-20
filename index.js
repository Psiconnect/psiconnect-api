console.clear();
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import httpServer from "./src/config/http.js";
import socket from "./src/config/socket.io.js";
import { mapUserTesting } from "./src/testing/user.js";
import { mapProfesionalTesting } from "./src/testing/profesional.js";
import { mapAreaTesting } from "./src/testing/areas.js";
import { mapSkillsTesting } from "./src/testing/skills.js";
import { mapAdminTesting } from "./src/testing/admin.js";
import { mapTestingReviews } from './src/testing/review.js'


dotenv.config();
//hola como andan

async function bootstrap() {
  await sequelize.sync({ force: true }); 
  await mapUserTesting()
  await mapAreaTesting()
  await mapProfesionalTesting()
  await mapSkillsTesting()
  await mapAdminTesting()
  socket(httpServer)
  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });
}

bootstrap();
setTimeout(() => {
  mapTestingReviews()
} ,5000)


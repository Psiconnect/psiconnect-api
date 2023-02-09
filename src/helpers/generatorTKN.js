
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv"
const { CONFIRM_EMAIL_JWT_PRIVATE_KEY, JWT_PRIVATE_KEY, REFRESH_JWT_PRIVATE_KEY,
        RESET_JWT_PRIVATE_KEY, POST_REGISTER_JWT_PRIVATE_KEY } = process.env;

dotenv.config()

export async function generatorTKN(body) {
  const token = await Jwt.sign(body, JWT_PRIVATE_KEY, {
    expiresIn: "9h",
  });
  return token;
}

export async function generatorRefreshUserTKN(body){
  const token = await Jwt.sign(body, REFRESH_JWT_PRIVATE_KEY, {
    expiresIn: "72h",
  });
  return token;
}

export async function generatorRefreshAdminTKN(body){
  const token = await Jwt.sign(body, REFRESH_JWT_PRIVATE_KEY, {
    expiresIn: "12h",
  });
  return token;
}

export async function generadorConfirmEmailTKN(body){
  const token = await Jwt.sign(body, CONFIRM_EMAIL_JWT_PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
}

export async function generadorResetPasswordTKN(body){
  const token = await Jwt.sign(body, RESET_JWT_PRIVATE_KEY, {
    expiresIn: "15m",
  });
  return token;
}

export async function generadorPostRegisterTKN(body){
  const token = await Jwt.sign(body, POST_REGISTER_JWT_PRIVATE_KEY, {
    expiresIn: "24h", //esto habria que charlarlo
  });
  return token;
}


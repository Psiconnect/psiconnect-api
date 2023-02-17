import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import { adminCheck } from "./adminLogin.js";
const { CONFIRM_EMAIL_JWT_PRIVATE_KEY, JWT_PRIVATE_KEY, REFRESH_JWT_PRIVATE_KEY,
        RESET_JWT_PRIVATE_KEY, POST_REGISTER_JWT_PRIVATE_KEY } = process.env;

config();

export const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) return res.status(401).json("Credencial inexistente");

  const jwt = authorization.split(" ")[1];

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, JWT_PRIVATE_KEY);
    const admin = await adminCheck(payload.id);
    if(admin) return res.json(admin);
    req.tkn = payload;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
export const userConfirmEmailJWTDTO = async (req, res, next) => {
  const { confirm } = req.query;

  if (!confirm) return res.status(401).json("Credencial inexistente");

  const jwt = confirm

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, CONFIRM_EMAIL_JWT_PRIVATE_KEY);
    if(!payload) return res.status(401).json('jwt mal formado')
    req.tkn = jwt;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
export const userRefreshJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("Credencial inexistente");

  const jwt = authorization.split(" ")[1];

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, REFRESH_JWT_PRIVATE_KEY);
    req.tkn = payload;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
export const adminRefreshJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("Credencial inexistente");

  const jwt = authorization.split(" ")[1];

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, REFRESH_JWT_PRIVATE_KEY);
    req.tkn = payload;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
}
export const userResetPasswordJWTDTO = async (req, res, next) => {
  const { reset } = req.headers;

  if (!reset) return res.status(401).json("Credencial inexistente");

  const jwt = reset.split(" ")[1];

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, RESET_JWT_PRIVATE_KEY);
    if(!payload) return res.status(401).json('Error de credenciales')
    req.tkn = jwt;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};
export const userPostRegisterJWTDTO = async (req, res, next) => {
  const { pos } = req.headers;

  if (!pos) return res.status(401).json("Credencial inexistente");

  const jwt = pos.split(" ")[1];

  if (!jwt) return res.status(401).json("Token inexistente");

  try {
    const payload = verify(jwt, POST_REGISTER_JWT_PRIVATE_KEY);

    if(!payload) return res.status(401).json('jwt mal formado')

    req.tkn = jwt;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};



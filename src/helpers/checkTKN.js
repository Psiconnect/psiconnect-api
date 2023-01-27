import { config } from "dotenv";
import { verify } from "jsonwebtoken";

config();

const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json("aca 1");

  const jwt = authorization.split(" ")[1];

  if (!jwt) return res.status(401).json("aca 2");

  try {
    const payload = verify(jwt, process.env.JWT_PRIVATE_KEY);
    req.id = payload.id;
    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

export default userJWTDTO;
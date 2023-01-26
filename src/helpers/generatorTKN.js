
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export async function generatorTKN(body) {
  const token = await Jwt.sign(body, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "9h",
  });
  return token;
}

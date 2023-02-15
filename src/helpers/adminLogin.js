import { compare } from "bcrypt";
import ADMIN from "../models/ADMIN.js";
import { generatorTKN } from "./generatorTKN.js";

export const adminLogin = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await ADMIN.findOne({ where: { email } });
    if (!user) return next();
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) return next();
    const token = await generatorTKN({ id: user.id });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const adminCheck = async (id) => {
  const admin = ADMIN.findOne({ where: { id } });
  return admin;
};

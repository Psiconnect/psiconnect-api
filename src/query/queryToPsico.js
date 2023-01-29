import { hash } from "bcrypt";
import PROFESSIONAL from "../models/PROFESSIONAL.js";

export async function findAllProfessional() {
  const data = await PROFESSIONAL.findAll();
  return data;
}

export async function getProfessionalByEmail(email) {
  const data = await PROFESSIONAL.findOne({ where: { email } });
  return data;
}

export async function getProfessionalByDNI(DNI) {
    const data = await PROFESSIONAL.findOne({ where: { DNI } });
    return data;
  }

export async function createProfessionalUser(body) {
  const hashedPassword = await hash(body.password, 10);
  const date = await PROFESSIONAL.create({ ...body, password: hashedPassword });
  return date;
}

export async function getProfessionalById(id) {
  const data = await PROFESSIONAL.findOne({ where: { id } });
  return data;
}

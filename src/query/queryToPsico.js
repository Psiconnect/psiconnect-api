import { hash } from "bcrypt";
import PROFESIONAL from "../models/PROFESIONAL";

export async function findAllProfesional() {
  const data = await PROFESIONAL.findAll();
  return data;
}

export async function getProfesionalByEmail(email) {
  const data = await PROFESIONAL.findOne({ where: { email } });
  return data;
}

export async function createProfesionalUser(body) {
  const hashedPassword = await hash(body.password, 10);
  const date = await PROFESIONAL.create({ ...body, password: hashedPassword });
  return date;
}

export async function getProfesionalById(id) {
  const data = await PROFESIONAL.findOne({ where: { id } });
  return data;
}

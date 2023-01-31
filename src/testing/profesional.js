import { hash } from "bcrypt";
import USER from "../models/USERS.js";

const user = [
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI:"66666666"
  },
  {
    email: "docOrejas@asd.com",
    name: "elGato",
    lastName: "vila",
    password: "Test123",
    DNI:"66666667"
  },
  {
    email: "mandrakador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666668"
  },
  {
    email: "pakito@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666669"
  },
  {
    email: "mandraka3dor@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666670"
  },
  {
    email: "mandra123kador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666671"
  }, 
];

export async function mapProfesionalTesting() {

  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
    await USER.create({ ...u, password:hashedPassword });
  });
}

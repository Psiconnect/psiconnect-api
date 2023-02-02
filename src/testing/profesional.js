import { hash } from "bcrypt";
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";
import USER from "../models/USERS.js";

const user = [
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI:"66666666",
    area:'Depresion'
  },
  {
    email: "valdez31@asd.com",
    name: "doctorchapatin",
    lastName: "Valdez",
    password: "Test1274",
    DNI:"12345770",
    area:'Depresion'
  },
  {
    email: "valdez1@asd.com",
    name: "doctorchapatin",
    lastName: "Valdez",
    password: "Test1234",
    DNI:"12345670",
    area:'Ansiedad'
  },
  {
    email: "valdez21@asd.com",
    name: "doctorchapatin",
    lastName: "Vavilonia",
    password: "Test1234",
    DNI:"12331670",
    area:'Ansiedad'
  },
  {
    email: "docOrejas@asd.com",
    name: "elGato",
    lastName: "vila",
    password: "Test123",
    DNI:"66666667",
    area:'Ansiedad'
  },
  {
    email: "mandrakador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666668",
    area:'Autoestima'
  },
  {
    email: "pakito@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666669",
    area:'Depresion'
  },
  {
    email: "mandraka3dor@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666670",
    area:'Familia'
  },
  {
    email: "mandra123kador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI:"66666671",
    area:'Genero'
  }, 
];

export async function mapProfesionalTesting() {

  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
     const pro = await PROFESSIONAL.create({ ...u, password:hashedPassword });
     const a = await AREA.findOne({where:{area:u.area}})
    // console.log(a);
    //  console.log(pro);
    await pro.addArea(a)
  });
}

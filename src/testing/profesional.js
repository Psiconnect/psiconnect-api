import { hash } from "bcrypt";
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";

const user = [
  {
    email: "user2@example.com",
    name: "Jane",
    lastName: "Smith",
    password: "Bcdefg2A",
    DNI: "23456789",
    area: "Ansiedad",
    avatar: "https://www.example.com/avatar2.jpg",
  },
  {
    email: "user3@example.com",
    name: "Jim",
    lastName: "Johnson",
    password: "Cdefg3Bb",
    DNI: "34567890",
    area: "Autoestima",
    avatar: "https://www.example.com/avatar3.jpg",
  },
  {
    email: "user4@example.com",
    name: "Jessica",
    lastName: "Brown",
    password: "Defg4Cc1",
    DNI: "45678901",
    area: "Familiar",
    avatar: "https://www.example.com/avatar4.jpg",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "dani@gamil.com",
    name: "dani",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "nacho@gmail.com",
    name: "nacho",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: ["Depresion", "Ansiedad"],
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "Hugo",
    lastName: "Chavez",
    password: "Test1234",
    DNI: "66666666",
    area: ["Depresion", "Ansiedad"],
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "rabadum@asd.com",
    name: "doctorchapatin",
    lastName: "conAnteojos",
    password: "Test1234",
    DNI: "66666666",
    area: "Depresion",
    avatar:
      "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png",
  },
  {
    email: "valdez31@asd.com",
    name: "doctorchapatin",
    lastName: "Valdez",
    password: "Test1274",
    DNI: "12345770",
    area: "Depresion",
  },
  {
    email: "valdez1@asd.com",
    name: "doctorchapatin",
    lastName: "Valdez",
    password: "Test1234",
    DNI: "12345670",
    area: "Ansiedad",
  },
  {
    email: "valdez21@asd.com",
    name: "doctorchapatin",
    lastName: "Vavilonia",
    password: "Test1234",
    DNI: "12331670",
    area: "Ansiedad",
  },
  {
    email: "docOrejas@asd.com",
    name: "elGato",
    lastName: "vila",
    password: "Test123",
    DNI: "66666667",
    area: "Ansiedad",
  },
  {
    email: "mandrakador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI: "66666668",
    area: "Autoestima",
  },
  {
    email: "pakito@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI: "66666669",
    area: "Depresion",
  },
  {
    email: "mandraka3dor@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI: "66666670",
    area: "Familia",
  },
  {
    email: "mandra123kador@asd.com",
    name: "mandrakedor",
    lastName: "elmago",
    password: "Test12345",
    DNI: "66666671",
    area: "Genero",
  },
  {
    email: "pruebaprueba1@asd.com",
    name: "Angus",
    lastName: "MacGyver",
    password: "Test123",
    DNI: "66646668",
    area: "Ansiedad",
  },
  {
    email: "pruebaprueba2@asd.com",
    name: "Thegood",
    lastName: "Doctor",
    password: "Test123",
    DNI: "66665667",
    area: "Ansiedad",
  },
  {
    email: "prueba3prueba@asd.com",
    name: "Doctor",
    lastName: "Who",
    password: "Test123",
    DNI: "66646667",
    area: "Ansiedad",
  },
  {
    email: "eldoctor12@asd.com",
    name: "Doctor",
    lastName: "Doom",
    password: "Test123",
    DNI: "66677667",
    area: "Ansiedad",
  },
  {
    email: "Dooms123@asd.com",
    name: "Richard",
    lastName: "Reed",
    password: "Test123",
    DNI: "66634667",
    area: "Ansiedad",
  },
];

export async function mapProfesionalTesting() {
  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
    const pro = await PROFESSIONAL.create({ ...u, password: hashedPassword });
    const a = await AREA.findOne({ where: { area: u.area } });
    await pro.addArea(a);
  });
}

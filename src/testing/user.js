import { hash } from "bcrypt";
import USER from "../models/USERS.js";

const user = [
  {
    email: "email@asd.com",
    name: "nameDTOSchema",
    lastName: "surnameDTOSchema",
    password: "Test1234",
  },
  {
    email: "aloja@asd.com",
    name: "pancho",
    lastName: "vila",
    password: "Test123",
  },
  {
    email: "mandrake@asd.com",
    name: "mandrake",
    lastName: "elmago",
    password: "Test12345",
  },
];

export async function mapUserTesting() {
  for (let index = 0; index < user.length; index++) {
  const u=user[index]
    const password =await hash(u.password, 10)
    await USER.create({ ...u, password });
    
  }

}

import { hash } from "bcrypt";

import USER from "../models/USERS.js";

const user = [
  {
    email: "fernando@gmail.com",
    name: "Fernando",
    lastName: "Ramones",
    password: "Test1234",
  },
  {
    email: "user1@example.com",
    name: "John",
    lastName: "Doe",
    password: "Abcdefg1",
  },
];

export async function mapUserTesting() {
  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
    await USER.create({ ...u, password: hashedPassword , avatar:'https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?pid=ImgDet&rs=1'});
  });
}

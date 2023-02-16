import { hash } from "bcrypt";
import ADMIN from "../models/ADMIN.js";


const user = [
  {
    email: "psiconnect@admin.com",
    password: "Admin1234",
    rol: "admin",
    avatar: "https://altavozcultural.files.wordpress.com/2019/11/cerebrito-e1530386527667.png",
  },
];

export async function mapAdminTesting() {
  user.map(async (u) => {
    const hashedPassword = await hash(u.password, 10);
    await ADMIN.create({ ...u, password: hashedPassword });
  });
}

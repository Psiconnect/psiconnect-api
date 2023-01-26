import USER from "../models/USERS.js";
import { hash } from 'bcrypt';

export async function getUserByEmail(email) {
    const data = await USER.findOne({where:{email}});
    return data;
} 
export async function createUser(body){
    const hashedPassword = await hash(body.password, 10);
    const date = await USER.create({...body, password:hashedPassword});
    return date;
}
import USER from "../models/USERS.js";
import { hash } from "bcrypt";

export async function findAllUser() {
  const data = await USER.findAll();
  return data;
}

export async function getUserByEmail(email) {
  const data = await USER.findOne({ where: { email } });
  return data;
}

export async function createUser(body) {
  const hashedPassword = await hash(body.password, 10);
  const date = await USER.create({ ...body, password: hashedPassword });
  return date;
}

export async function getUserById(id) {
  const data = await USER.findOne({ where: { id } });
  return data;
}

export async function getUserByResetToken(resetToken) {
  const data = await USER.findOne({ where: { resetToken } });
  return data;
}
export async function getOrCreate(body) {
  const user = await getUserByEmail(body.email);
  if(user) return user;
  const newUser = await createUser(body);
  return newUser;
}

export async function updateUserData(user, name, lastName, phone, avatar) {
 user.name= name|| user.name
 user.lastName= lastName || user.lastName
 user.phone= phone || user.phone
 if(user.avatar !== avatar){
  const uploadResponse = await cloudinary.uploader.upload(avatar)
  user.avatar = uploadResponse.url;
}
await user.save();

return await USER.findOne({
  where: {id: user.id}
})
  
  
}

export async function getUserByTokenAny(token, nameToken) {
  const data = await PROFESSIONAL.findOne({
    where: { [nameToken]: token },
  });
  return data;
}
export async function getUserREALByTokenAny(token, nameToken) {
  const data = await USER.findOne({
    where: { [nameToken]: token },
  });
  return data;
}

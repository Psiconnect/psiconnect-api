import USER from "../models/USERS.js";
import { hash } from "bcrypt";
import { cloudinary } from '../routes/cloudinary.routes.js';

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
  const date = await USER.create({ ...body, password: hashedPassword});
  return date;
}

export async function getUserById(id) {
  const data = await USER.findOne({ where: { id  } });
  return data;
}

export async function getUserByResetToken(resetToken) {
  const data = await USER.findOne({ where: { resetToken } });
  return data;
}
export async function getOrCreate(body) {
  const hashedPassword = await hash(body.password, 10);
  const data = await USER.findOrCreate({where:{ ...body, password: hashedPassword }});
  return data;
}

export async function updateUserData(user, name, lastName, phone, avatar) {
 user.name= name || user.name
 user.lastName= lastName || user.lastName
 user.phone= phone || user.phone
 if(user.avatar !== avatar){
  const uploadResponse = await cloudinary.uploader.upload(image = avatar)
  console.log(uploadResponse.url, uploadResponse.imageUrl)
  user.avatar = uploadResponse.imageUrl;
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


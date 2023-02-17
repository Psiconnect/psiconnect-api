import { Router } from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

const cloudinaryRoutes = Router();

dotenv.config(); //configuracion de cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APY_KEY,
  api_secret: process.env.CLOUD_APY_SECRET,
});

cloudinaryRoutes.post("img/upload", async (req, res) => {
  const { image } = req.image;
  try {
    await cloudinary.uploader.upload(image.tempFilePath, (error, response));
    res.status(200).send({ imageUrl: response.secure_url });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default cloudinaryRoutes;
export { cloudinary };

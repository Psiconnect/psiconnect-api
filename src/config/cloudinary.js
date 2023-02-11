import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()  //configuracion de cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APY_KEY,
    api_secret: process.env.CLOUD_APY_SECRET
})
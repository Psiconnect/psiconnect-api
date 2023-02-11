import { Router } from 'express'


const cloudinaryRoutes = Router()

cloudinaryRoutes.post('img/upload', async (req, res) => {
    const { file } = req.file
    try{
        const response = await cloudinary.uploader.upload(file.tempFilePath)
            res.status(200).json(response)
    }catch(error){
        res.status(400).send(error)
    }



})
import { Router } from "express";
import { getProfessionalById } from "../query/queryToPsico.js";
import { getUserById } from "../query/queryToUser.js";
import { createReview, findAllReviews } from "../query/queryToReview.js";

const reviewRoutes = Router();

reviewRoutes.get("/:professionalId", async (req, res) => {
  const {professionalId} = req.params
  try {
    const reviews = await findAllReviews();
    const filterReviews = reviews?.filter((el) => el.professionalId === professionalId );
    const mapReviews = filterReviews?.map(el => {
        return {
          id : el.id,
          score : el.score,
          comments: el.comments,
          userId: el.userId,
          professionalId : el.professionalId,
          puntualidad: el.puntualidad,
          trato: el.trato,
          general: el.general,
          username: el.user?.name,
          lastusername: el.user?.lastName,
          professionalName : el.professional?.name,
          lastprofessionalName : el.professional?.lastName
        }
    })    
    if (!reviews) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(mapReviews);
  } catch (error) {
    return res.status(404).json({ data: error.message });
  }
});


reviewRoutes.get("/", async (req, res) => {
    try {
      const reviews = await findAllReviews();
      const mapReviews = reviews.map((el) => {
        return {
            id : el.id,
            score : el.score,
            comments: el.comments,
            userId: el.userId,
            professionalId : el.professionalId,
            puntualidad: el.puntualidad,
            trato: el.trato,
            general: el.general,
            username: el.user?.name,
            lastusername: el.user?.lastName
        }
    })
    if(!reviews) return  res.status(400).json("Base de datos vacia");
    return res.status(200).json(mapReviews)

    }catch(error) {
        return res.status(404).json({data: error.message})
    }
  });


reviewRoutes.post('/:professionalId', async (req, res ) => {
    const  review = req.body  
    const { professionalId } = req.params
    console.log(review);
    try{
        const professional = await getProfessionalById(professionalId)
        const users = await getUserById(review.userId)
        if(!professional || !users) {
            return res.status(404).json({data: 'datos no encontrados'})
        }
        const newReview=  await createReview(review)
        return res.status(200).json(newReview)
    } 
    catch (error) {
      console.log(error);
        return res.status(500).json({ data: error.message })
    }

})

export default reviewRoutes

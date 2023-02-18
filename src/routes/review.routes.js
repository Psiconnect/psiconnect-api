import { Router } from "express";
import REVIEW from "../models/REVIEW.js";
import { getProfessionalById } from "../query/queryToPsico.js";
import { getUserById } from "../query/queryToUser.js";
import { findAllReviews } from "../query/queryToReview.js";

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
          username: el.user.name,
          lastusername: el.user.lastName,
          professionalName : el.professional.name,
          lastprofessionalName : el.professional.lastName
        }
    })    
    if (!reviews) return res.status(400).json("Base de datos vacia");
    return res.status(200).json(mapReviews);
  } catch (error) {
    return res.status(404).json({ data: error.message });
  }
});

reviewRoutes.post("/:professionalId", async (req, res) => {
  const { comments, score, userId, puntualidad, trato, general } = req.body;
  const { professionalId } = req.params;
  try {
    const professional = await getProfessionalById(professionalId);
    const users = await getUserById(userId);
    if (!professional || !users) {
      return res.status(404).json({ data: "datos no encontrados" });
    }
    const newReview = await REVIEW.create({
      puntualidad,
      trato,
      general,
      comments,
      puntualidad,
      trato,
      general,
      score,
      userId,
      professionalId,
    });
    return res.status(200).json(newReview);
  } catch (error) {
    return res.status(500).json({ data: error.message });
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
            username: el.user.name,
            lastusername: el.user.lastName
        }
    })
    if(!reviews) return  res.status(400).json("Base de datos vacia");
    return res.status(200).json(mapReviews)

    }catch(error) {
        return res.status(404).json({data: error.message})
    }
  });









export default reviewRoutes

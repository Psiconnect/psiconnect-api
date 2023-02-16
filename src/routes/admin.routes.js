import { Router } from "express";
import AREA from "../models/AREAS.js";
import REVIEW from "../models/REVIEW.js";
import SKILLS from "../models/SKILLS.js";
import { getProfessionalById } from "../query/queryToPsico.js";
import { getUserById } from "../query/queryToUser.js";

const adminRoutes = Router();

adminRoutes.put("/disable-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    user.state = !user.state;
    await user.save();
    return res.status(200).json("Estado de Usuario editado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    await user.destroy();
    return res.status(200).json("Usuario eliminado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

adminRoutes.put("/disable-area/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const area = await AREA.findByPk(id)
    if (!area) return res.status(404).json("No se encontro el area");
    area.state = !area.state;
    await area.save();
    return res.status(200).json("Estado de Area editado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.delete("/delete-area/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const area = await AREA.findByPk(id)
    if (!area) return res.status(404).json("No se encontro el area");
    await area.destroy();
    return res.status(200).json("Area eliminada correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

adminRoutes.put("/disable-professional/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getProfessionalById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    if(user.state === 'disavalible'){
      user.state = 'avalible';
    } else if(user.state === 'avalible'){
      user.state='disavalible';
    }
    await user.save();
    return res.status(200).json({message:"Estado de Usuario editado correctamente", state:user.state});
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.delete("/delete-professional/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getProfessionalById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    await user.destroy();
    return res.status(200).json('Usuario eliminado correctamente');
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.put("/disable-review/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await REVIEW.findByPk(id);
    if (!review) return res.status(404).json("No se encontro el review");
    review.state = !review.state;
    await review.save();
    return res.status(200).json("Estado de Review editado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.delete("/delete-review/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await  REVIEW.findByPk(id);
    if (!review) return res.status(404).json("No se encontro el review");
    await review.destroy();
    return res.status(200).json('Review eliminado correctamente');
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.put("/disable-skill/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await SKILLS.findByPk(id);
    if (!skill) return res.status(404).json("No se encontro el skill");
    skill.state = !skill.state;
    await skill.save();
    return res.status(200).json("Estado de skill editado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.delete("/delete-skill/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await  SKILLS.findByPk(id);
    if (!skill) return res.status(404).json("No se encontro el skill");
    await skill.destroy();
    return res.status(200).json('skill eliminado correctamente');
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default adminRoutes;

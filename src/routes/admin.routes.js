import { Router } from "express";
import AREA from "../models/AREAS.js";
import REVIEW from "../models/REVIEW.js";
import SKILLS from "../models/SKILLS.js";
import { getProfessionalById } from "../query/queryToPsico.js";
import { getUserById } from "../query/queryToUser.js";
import { cloudinary } from "./cloudinary.routes.js";

const adminRoutes = Router();
/*------------------------------------   USER    --------------------------------------------*/

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

/*------------------------------------   PROFESSIONAL    --------------------------------------------*/

adminRoutes.put("/disable-professional/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getProfessionalById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    if (user.state === "disavalible") {
      user.state = "avalible";
    } else if (user.state === "avalible") {
      user.state = "disavalible";
    }
    await user.save();
    return res
      .status(200)
      .json({
        message: "Estado de Usuario editado correctamente",
        state: user.state,
      });
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
    return res.status(200).json("Usuario eliminado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

/*------------------------------------   AREAS    --------------------------------------------*/

adminRoutes.put("/disable-area/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const area = await AREA.findByPk(id);
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
    const area = await AREA.findByPk(id);
    if (!area) return res.status(404).json("No se encontro el area");
    await area.destroy();
    return res.status(200).json("Area eliminada correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.post("/create-area", async (req, res) => {
  try {
  const { area, description, image } = req.body;
  if ((!area || !description, !image))
    return res.status(400).json("por favor complete bien todo los campos");
    
    const uploadResponse = await cloudinary.uploader.upload(image);
    const data = await AREA.create({area,description, image:uploadResponse.url});
    return res.status(201).json('Area creada correctamente');

  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});
adminRoutes.put("/edit-area/:id", async (req, res) => {
  const { id } = req.params;
  const { area, description, image } = req.body;
  if ((!area || !description, !image))
    return res.status(400).json("por favor complete bien todo los campos");
  try {
    const areaEdit = await AREA.findByPk(id);
    areaEdit.area = area;
    areaEdit.description = description;

    if(areaEdit.image !== image){
      const uploadResponse = await cloudinary.uploader.upload(image)
      areaEdit.image = uploadResponse.url;
    }
    await areaEdit.save();

    return res.status(200).json('Area editada correctamente')
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

/*------------------------------------   REVIEW    --------------------------------------------*/

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
    const review = await REVIEW.findByPk(id);
    if (!review) return res.status(404).json("No se encontro el review");
    await review.destroy();
    return res.status(200).json("Review eliminado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

/*------------------------------------   SKILL    --------------------------------------------*/

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
    const skill = await SKILLS.findByPk(id);
    if (!skill) return res.status(404).json("No se encontro el skill");
    await skill.destroy();
    return res.status(200).json("skill eliminado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default adminRoutes;

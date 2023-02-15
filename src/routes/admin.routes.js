import { Router } from "express";
import { getUserById } from "../query/queryToUser.js";

const adminRoutes = Router();

adminRoutes.put("/disable-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(404).json("No se encontro el usuario");
    user.status = !user.status;
    user.save();
    return res.status(200).json("Estado de Usuario editado correctamente");
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

export default adminRoutes;

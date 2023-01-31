import AREA from "../models/AREAS.js";

const user = ["Depresion","Ansiedad", "Autoestima", "Familia", "Genero"];

export async function mapAreaTesting() {

  user.map(async (u) => {
    await AREA.create({area: u });
  });
}

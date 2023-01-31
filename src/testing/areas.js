import AREA from "../models/AREAS.js";

const user = ["depresion","ansiedad", "autoestima", "familia", "genero"];

export async function mapUserTesting() {

  user.map(async (u) => {
    await AREA.create({area: u });
  });
}

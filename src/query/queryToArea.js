import PROFESSIONAL from "../models/PROFESSIONAL.js";

export async function findAllArea() {
    const data = await PROFESSIONAL.findAll({
      include:[PROFESSIONAL]
    });
    return data;
  }
  
export async function findAllProfessionalWithArea(area) {
    const data = await PROFESSIONAL.findAll({
      where:{
        area
      },
      include:[PROFESSIONAL]
    });
    return data;
  }
  
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";

export async function findAllArea() {
    const data = await AREA.findAll({
      //include:[PROFESSIONAL]
    });
    return data;
  }
  
export async function findAllProfessionalWithArea(area) {
    const data = await AREA.findOne({
      where:{
        area
      },
      include:[PROFESSIONAL]
    });
    return data.professionals;
  }
  
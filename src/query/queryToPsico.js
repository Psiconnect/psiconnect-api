import { hash } from "bcrypt";
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";
import SPECIALTY from "../models/SPECIALTY.js";
import { Op, where } from "sequelize";
import SKILLS from "../models/SKILLS.js";

const opIlikeProfessional = (text) => {
  return {
    name: {
      [Op.iLike]: `%${text}%`,
    },
    lastName: {
      [Op.iLike]: `%${text}%`,
    },
  };
};

export async function findAllProfessionalByAreaAndNames(area, name, lastName) {
  let data;
  if (area && name && lastName) {
    data = await PROFESSIONAL.findAll({
      where: {
        [Op.and]: {
          [Op.or]: opIlikeProfessional(name),
          [Op.or]: opIlikeProfessional(lastName),
        },
      },
      include: {
        model: AREA,
        where: {
          area,
        },
      },
    });
  } else if (area && name) {
    data = await PROFESSIONAL.findAll({
      where: {
        [Op.or]: opIlikeProfessional(name),
      },
      include: {
        model: AREA,
        where: {
          area,
        },
      },
    });
  } else if (name && lastName && !area) {
    data = await PROFESSIONAL.findAll({
      where: {
        [Op.and]: {
          [Op.or]: opIlikeProfessional(name),
          [Op.or]: opIlikeProfessional(lastName),
        },
      },
      include: {
        model: AREA,
      },
    });
  } else if (name) {
    data = await PROFESSIONAL.findAll({
      where: {
        [Op.or]: opIlikeProfessional(name),
      },
      include: {
        model: AREA,
      },
    });
  }

  return data;
}
export async function findAllProfessionalWithArea(area) {
  const data = await PROFESSIONAL.findAll({
    include: {
      model: AREA,
      where: {
        area,
      },
    },
  });
  return data;
}

export async function findAllProfessional() {
  const data = await PROFESSIONAL.findAll({
    include: {
      model: AREA,
    },
  });
  return data;
}

export async function getProfessionalByEmail(email) {
  const data = await PROFESSIONAL.findOne({ where: { email } });
  return data;
}

export async function getProfessionalByDNI(DNI) {
  const data = await PROFESSIONAL.findOne({ where: { DNI } });
  return data;
}

export async function createProfessionalUser(body) {
  const hashedPassword = await hash(body.password, 10);
  const date = await PROFESSIONAL.create({ ...body, password: hashedPassword });
  return date;
}

export async function getProfessionalById(id) {
  const data = await PROFESSIONAL.findOne({
    where: { id },
    include: [{ model: AREA }, { model: SKILLS }],
  });
  return data;
}
export async function getProfessionalByTokenAny(token, nameToken) {
  const data = await PROFESSIONAL.findOne({
    where: { [nameToken]: token },
  });
  return data;
}

export async function setModificationProfesional(params, body) {
  const data = await PROFESSIONAL.findOne({ where: { id: params } });
  if (!data) return null;
  data.description = body.description ? body.description : data.description;
  data.linkedin = body.linkedin ? body.linkedin : data.linkedin;
 
  const newAreas= await Promise.all(
    await body.areas.map(async (a) => {
      const area = await AREA.findOne({ where: { area: a } });
    return area.id
    })
  );
  await data.setAreas(newAreas)
  const  newSkill = await Promise.all(
    await body.skills.map(async (s)=>{
      const skill= await SKILLS.findOne({where:{skill:s}})
      return skill.id
    })
  )
  await data.setSkills(newSkill)
  await data.save();
  return data;
}

export async function setProfessionalDescription(params, body) {
  const data = await PROFESSIONAL.findOne({ where: { id: params } });

  if (!data) {
    return null;
  }
  data.description = body.description ? body.description : data.description;
  data.linkedin = body.linkedin ? body.linkedin : data.linkedin;

  await body.areas.map(async (a) => {
    const area = await AREA.findOne({ where: { area: a } });
    data.addArea(area);
  });

  await body.skills.map(async (a) => {
    const skill = await SKILLS.findOne({ where: { skill: a } });
    data.addSkills(skill);
  });
  await data.save();
  return data;
}

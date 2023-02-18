import { hash } from "bcrypt";
import AREA from "../models/AREAS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";
import { Op } from "sequelize";
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
  data = await data.filter(prof => prof.state === 'avalible' );
  return data
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
  const response = await data.filter(prof => prof.state === 'avalible' );
  return response;
}

export async function findAllProfessional() {
  const professionals = await PROFESSIONAL.findAll({
    include: [{ model: AREA }, { model: SKILLS }],
  });
  const data = await Promise.all(
    professionals.map(async (e) => {
      e = JSON.parse(JSON.stringify(e));
      e.areas = e.areas.map((e) => e.area).join();
      e.skills = e.skills.map((e) => e.skill).join();
      return e;
    })
  );
  return data;
}

export async function getProfessionalByEmail(email) {
  const data = await PROFESSIONAL.findOne({ where: { email:email } });
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

export async function setModificationProfesional(professional, body) {
  professional.description = body.description;
  professional.linkedin = body.linkedin;
  professional.avatar = body.avatar
    ? body.avatar
    : "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png";

  const areasIds = body.areas.map((el) => el.id);
  await professional.setAreas(areasIds);

  const skillsIds = body.skills.map((el) => el.id);
  await professional.setSkills(skillsIds);

  return professional;
}

export async function editProfesional(professional, body) {
  professional.description = body.description
    ? body.description
    : professional.description;
  professional.linkedin = body.linkedin ? body.linkedin : professional.linkedin;
  professional.avatar = body.avatar
    ? body.avatar
    : "https://res.cloudinary.com/dhkfa798t/image/upload/v1675414590/Smonkey/heroimg_qv9zgi.png";

  await professional.removeSkills();
  await professional.removeAreas();

  const areasIds = await Promise.all(
    body.areas?.map(async (el) => {
      const area = await AREA.findOne({ where: { area: el } });
      return area.id;
    })
  );
  await professional.setAreas(areasIds);
  const skillsIds = await Promise.all(
    body.skills?.map(async (el) => {
      const skill = await SKILLS.findOne({ where: { skill: el } });
      return skill.id;
    })
  );
  await professional.setSkills(skillsIds);

  await professional.save();

  return await PROFESSIONAL.findOne({
    where: {
      id: professional.id,
    },
    include: [{ model: AREA }, { model: SKILLS }],
  });
}

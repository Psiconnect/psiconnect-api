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

// export async function setModificationProfesional(professional, body) {
//   professional.description = body.description 
//   professional.linkedin = body.linkedin
//   professional.avatar = body.avatar

  // const areasIds = body.areas.map(el => el.id)
  // const skillsIds = body.skills.map(el => el.id)

  // await professional.setAreas(areasIds)
  // await professional.setSkills(skillsIds)

//   await professional.save();

//   return professional;
// }

export async function setModificationProfesional(professional, body) {
  professional.description = body.description 
  professional.linkedin = body.linkedin
  professional.avatar = body.avatar

  // const areasIds = await Promise.all( 
  //   body.areas?.map(async el => {
  //     const area = await AREA.findByPk(el.id)
  //     return area.id
  //   })
  // );
  // const skillsIds = await Promise.all( 
  //   body.skills?.map(async el => {
  //     const skill = await SKILLS.findByPk(el.id)
  //     return skill.id
  //   })
  // );

  const areasIds = body.areas.map(el => el.id)
  const skillsIds = body.skills.map(el => el.id)

  await professional.setAreas(areasIds)
  await professional.setSkills(skillsIds)

  await professional.setAreas(areasIds)
  await professional.setSkills(skillsIds)

  return professional;
}

export async function editProfesional(professional, body) {
  professional.description = body.description 
  professional.linkedin = body.linkedin
  professional.avatar = body.avatar

  const areasIds = await Promise.all( 
    body.areas?.map(async el => {
      const area = await AREA.findByPk(el.id)
      return area.id
    })
  );
  await professional.setAreas(areasIds)
  const skillsIds = await Promise.all( 
    body.skills?.map(async el => {
      const skill = await SKILLS.findByPk(el.id)
      return skill.id
    })
  );
  await professional.setSkills(skillsIds)

  await professional.save()

  return await PROFESSIONAL.findByPk(professional.id);
}
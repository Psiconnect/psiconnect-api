//// estos son los datos que habia en el enum de skills del modelo professional:
// "AMABLE","EMPATICO","SIMPATICO","MOTIVADOR","ENERGICO","CONSERVADOR",
// "LOGICO","PERSUASIVO","ORGANIZADO","ADAPTABLE","ANALITICO","PROGRESISTA"
import SKILLS from "../models/SKILLS.js";


const skills = [
  {
    skill: "AMABLE",
  },
  {
    skill: "EMPATICO",
  },
  {
    skill: "SIMPATICO",
  },
  {
    skill: "MOTIVADOR",
  },
  {
    skill: "ENERGICO",
  },
  {
    skill: "CONSERVADOR",
  },
  {
    skill: "LOGICO",
  },
  {
    skill: "PERSUASIVO",
  },
  {
    skill: "ORGANIZADO",
  },
  {
    skill: "ADAPTABLE",
  },
  {
    skill: "ANALITICO",
  },
  {
    skill: "PROGRESISTA",
  },
];



export async function mapSkillsTesting() {

    skills.map(async (u) => {
      await SKILLS.create(u);
    });
  }
  
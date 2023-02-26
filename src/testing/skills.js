import SKILLS from "../models/SKILLS.js";

const skills = [
  {
    skill: "Amable",
  },
  {
    skill: "Empatico",
  },
  {
    skill: "Simpatico",
  },
  {
    skill: "Motivador",
  },
  {
    skill: "Energico",
  },
  {
    skill: "Conservador",
  },
  {
    skill: "Logico",
  },
  {
    skill: "Persuasivo",
  },
  {
    skill: "Organizado",
  },
  {
    skill: "Adaptable",
  },
  {
    skill: "Analitico",
  },
  {
    skill: "Progresista",
  },
];



export async function mapSkillsTesting() {

    skills.map(async (u) => {
      await SKILLS.create(u);
    });
  }
  
  export default skills;
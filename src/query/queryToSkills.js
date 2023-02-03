import SKILLS from "../models/SKILLS.js";

export async function findAllSkills(){
    const skills = SKILLS.findAll();
    return skills;
}
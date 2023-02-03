import SKILLS from "../models/SKILLS";

export async function findAllSkills(){
    const skills = SKILLS.findAll();
    return skills;
}
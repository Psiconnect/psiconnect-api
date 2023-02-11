import CONSULT from "../models/CONSULT.js";



export async function createConsult(body){
    const newConsult = await CONSULT.create(body);
    console.log(body.id);
    return newConsult
}

export async function completeConsult(body){
    const confirmConsult = await CONSULT.findOne({where:{id:body.id}});
    confirmConsult.status = body.status;
    await confirmConsult.save()
    return confirmConsult;
}
export async function getAllConsultByProfessional(professionalId){
    const consults = await CONSULT.findAll({where:{professionalId}});
    return consults;
}
export async function getAllConsultByUser(userId){
    const consults = await CONSULT.findAll({where:{userId}});
    return consults;
}

export async function getConsultById(id){
const consult = await CONSULT.findOne({where:id});
    return consult;
}
export async function getAllConsult(){
    const consults = await CONSULT.findAll()
    return consults;
}

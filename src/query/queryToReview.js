import REVIEW from "../models/REVIEW.js";
import USERS from "../models/USERS.js"



export async function getProfessionalReview (){
    const reviws = await REVIEW.findAll({
        include: {
            model: USERS,
            attributes: ['name', 'lastname']
        },
    })
}








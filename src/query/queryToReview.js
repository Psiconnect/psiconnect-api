import REVIEW from "../models/REVIEW";
import USERS from "../models/USERS"
import PROFESSIONAL from "../models/PROFESSIONAL";


export async function getProfessionalReview (){
    const reviws = await REVIEW.findAll({
        include: {
            model: USERS,
            attributes: ['name', 'lastname']
        },
    })
}



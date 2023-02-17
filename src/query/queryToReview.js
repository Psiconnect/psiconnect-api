import REVIEW from "../models/REVIEW.js";
import USERS from "../models/USERS.js"
import PROFESSIONAL from "../models/PROFESSIONAL.js"




export async function findAllReviews (){
    const reviews = await REVIEW.findAll({
        include: [{
            model: USERS}, 

            {
                model: PROFESSIONAL,
                }
            ]

       
    })
    return reviews
}










import REVIEW from "../models/REVIEW.js";
import USER from "../models/USERS.js";
import PROFESSIONAL from "../models/PROFESSIONAL.js";

const review = [
{
  username: "pancho",
  userlastname: "vila",
  professionalname: "doctorchapatin" ,
  comments: "Excelente atencion ",
  score: 4
},

{
  username: "nameDTOSchema",
  userlastname: "surnameDTOSchema",
  professionalname: "doctorchapatin" ,
  comments: "Excelente atencion ",
  score: 3
  },

  
]

export  async function mapTestReview() {
  review.map(async el => {
    await REVIEW.create(el)
  
  })
}




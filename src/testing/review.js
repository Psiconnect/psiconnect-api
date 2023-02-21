import REVIEW from '../models/REVIEW.js'
import PROFESSIONAL from '../models/PROFESSIONAL.js'
import USER from '../models/USERS.js'

const comentarios = [
    "Muy buena atención, excelente profesional.",
    "Excelente experiencia, buen trato y muy amable.",
    "No estoy satisfecha con el servicio, fue bastante regular.",
    "Muy puntual en su atención, sin embargo no fue muy amable.",
    "Muy amable y buen trato, pero no muy puntual.",
    "Buen servicio en general, pero hubo algunas fallas en la atención.",
    "Una experiencia regular, nada del otro mundo.",
    "La atención fue excelente, pero la puntualidad no tanto.",
    "Muy buena atención, pero la profesionalidad dejó algo que desear.",
    "Muy amable y puntual, pero hubo algunos errores en el trato.",
    "La atención fue regular, pero la puntualidad y el trato fueron excelentes.",
    "No muy buena atención, pero el profesionalismo fue destacable.",
    "Excelente atención y muy buena actitud.",
    "No estoy satisfecha con el trato recibido.",
    "Una experiencia regular en general, nada destacable."
  ];

  


export async function mapTestingReviews() {
    
    const users = await USER.findAll()  
    const mapUsers = users.map(el => el.id)
    const professionals = await PROFESSIONAL.findAll()  
    const  mapProfessionals= professionals.map(el => el.id)
 
    const reviews = [
        {
        comments: comentarios[0],
        score: ((Math.random() * 4) +1).toFixed(1) ,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: await mapUsers[0], 
        professionalId: await mapProfessionals[0],
        state:true
        },

        {
        comments: comentarios[1],
        score: ((Math.random() * 4) +1).toFixed(1) ,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: await mapUsers[1], 
        professionalId: await mapProfessionals[0]
 
        },
        
        {
        comments:comentarios[8],
        score: ((Math.random() * 4) +1).toFixed(1) ,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: await mapUsers[1], 
        professionalId: await mapProfessionals[0]
        },

        {
        comments: comentarios[5],
        score: ((Math.random() * 4) +1).toFixed(1),
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: await mapUsers[1], 
        professionalId: await mapProfessionals[0]
        },

        {
        comments: comentarios[10],
        score: ((Math.random() * 4) +1).toFixed(1) ,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: await mapUsers[1], 
        professionalId: await mapProfessionals[0]
        },


    ]
    for( const el of reviews)  {
        await REVIEW.create(el)
    }

    const reviewsCreated = await REVIEW.findAll()

}
















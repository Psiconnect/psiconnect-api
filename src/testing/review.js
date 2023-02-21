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

    function calculateScore(num1, num2, num3){
    return String((num1+num2+num3)/3).slice(0,3)? Number(String((num1+num2+num3)/3).slice(0,3)) : (num1+num2+num3)/3
    }
    
    const reviews = [
        {
        comments: null,
        score: null,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: null, 
        professionalId: null,
        state:true
        },

        {
        comments: null,
        score: null,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: null, 
        professionalId: null,
        state:true
        },
        
        {
        comments: null,
        score: null,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: null, 
        professionalId: null,
        state:true
        },

        {
        comments: null,
        score: null,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId: null, 
        professionalId: null,
        state:true
        },
        {
        comments: null,
        score: null,
        puntualidad: (Math.floor(Math.random() * 5) + 1),
        trato: (Math.floor(Math.random() * 5) + 1),
        general: (Math.floor(Math.random() * 5) + 1),
        userId:null, 
        professionalId: null,
        state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null ,
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },
        {
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 4,
            trato: 4,
            general: 4,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 5,
            trato: 5,
            general: 5,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 5,
            trato: 3,
            general: 4,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 3,
            trato: 3,
            general: 3,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 5,
            trato: 5,
            general: 5,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 5,
            trato: 4,
            general: 4,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: 3,
            trato: 5,
            general: 5,
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        },{
            comments: null,
            score: null,
            puntualidad: (Math.floor(Math.random() * 5) + 1),
            trato: (Math.floor(Math.random() * 5) + 1),
            general: (Math.floor(Math.random() * 5) + 1),
            userId: null, 
            professionalId: null,
            state:true
        }
    ];

    for( const el of reviews)  {

        const indexOfProfessional = Math.round(Math.random() * (professionals.length-1));
        const indexOfUser = Math.round(Math.random() * (users.length-1));
        const indexOfComment = Math.round(Math.random() * (comentarios.length-1));
        
        el.comments = comentarios[indexOfComment];
        el.userId = mapUsers[indexOfUser];
        el.professionalId = mapProfessionals[indexOfProfessional];
        el.score = calculateScore(el.puntualidad, el.general, el.trato);

        const professional = await PROFESSIONAL.findOne({
            where:{
                id:mapProfessionals[indexOfProfessional===-1? indexOfProfessional+1 : indexOfProfessional]
            },
            include:[{
                model: REVIEW
            }]
        });

        const scoreHistory = professional.reviews.reduce((acc, el) => acc + el.score,0)

        let newScoreProfessional = professional.score ? (scoreHistory + el.score)/(professional.reviews.length+1) : el.score
        newScoreProfessional = String(newScoreProfessional).slice(0,3) ? Number(String(newScoreProfessional).slice(0,3)) : newScoreProfessional
        
        professional.score = newScoreProfessional;

        await professional.save()

        await REVIEW.create(el);
    };
}
















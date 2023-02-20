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


export async function idTestingReviews() {
    
    const users = await USER.findAll()  
    const mapUsers = users.map(el => el.id)
    
    const professionals = await PROFESSIONAL.findAll()  
    const  mapProfessionals= professionals.map(el => el.id)

    function calculateScore(num1, num2, num3){
    return
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

        const indexOfProfessional = Math.round(Math.random() * professionals.length);
        const indexOfUser = Math.round(Math.random() * users.length);
        const indexOfComment = Math.round(Math.random() * comentarios.length);
        
        el.comments = comentarios[indexOfComment]
        
        await REVIEW.create(el)
    }

   const review = await REVIEW.findAll()
    console.log(review)

}
















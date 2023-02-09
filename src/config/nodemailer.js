import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_EMAILER, // generated ethereal user
      pass: process.env.PASS_EMAILER, // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log('Ready for send emails')
}).catch(err => console.log(err))

export default transporter;
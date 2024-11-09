import nodemailer from 'nodemailer'
import envConfig from '../config/envConfig.js'


const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: envConfig.gmail_user,
        pass: envConfig.gmail_pass
    }
})


export default transport
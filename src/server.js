import express from 'express';
import envConfig from './config/envConfig.js';
import appRouter from './router/index.js';
import connectDB from './config/mongoDBConfig.js'
import passport from 'passport';
import {initializePassport} from './config/passportConfig.js'
import cookieParser from 'cookie-parser';


const app = express()
const PORT = envConfig.port



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
//? Passport JWT
initializePassport()
app.use(passport.initialize())

app.use(appRouter)

connectDB()

app.listen(PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor escuchando en puerto: ${PORT}`);
})


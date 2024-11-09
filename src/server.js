import express from 'express';
import envConfig from './config/envConfig.js';
import appRouter from './router/index.js';
import connectDB from './config/mongoDBConfig.js'
import passport from 'passport';
import {initializePassport} from './config/passportConfig.js'
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'




// Definir __dirname en un entorno de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = envConfig.port



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(cookieParser())
//? Passport JWT
initializePassport()
app.use(passport.initialize())

app.use(appRouter)

connectDB()




app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')







app.listen(PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor escuchando en puerto: ${PORT}`);
})


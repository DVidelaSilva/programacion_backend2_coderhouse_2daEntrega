import express from 'express';
import envConfig from './config/envConfig.js';
import appRouter from './router/index.js';
import connectDB from './config/mongoDBConfig.js'


const app = express()
const PORT = envConfig.port



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(appRouter)

connectDB()

app.listen(PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor escuchando en puerto: ${PORT}`);
})
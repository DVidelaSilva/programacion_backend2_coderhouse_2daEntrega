import { connect } from "mongoose";
import envConfig from './envConfig.js'



const uri = envConfig.mongoUrl

const connectDB = async () => {
    console.log('Conexion a MongoAtlas Exitosa')
    await connect(uri)
}



export default connectDB
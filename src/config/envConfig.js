import dotenv from 'dotenv'

dotenv.config();


export default {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    private_key_jwt: process.env.PRIVATE_KEY_JWT
}
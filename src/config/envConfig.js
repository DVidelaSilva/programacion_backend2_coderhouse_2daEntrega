import dotenv from 'dotenv'

dotenv.config();


export default {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    private_key_jwt: process.env.PRIVATE_KEY_JWT,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS
}

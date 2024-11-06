import SessionService from "../services/sessionsService.js"



class SessionController {

    constructor() {
        this.sessionService = new SessionService()
    }


    postSessionRegister = async (req, res) => {
        try {
            const {body} = req
            const user = await this.sessionService.sessionRegisterUser(body)

            return res.status(201).send({status: 'success', message: 'Usuario Registrado exitosamente', data: user})
        } catch (error) {
            return res.status(400).json({ status: 'error', error: error.message });
        }
    }


    postSessionLogin = async (req, res) => {
        try {
            //IN
            const {body} = req
            const {token} = await this.sessionService.sessionLoginUser(body)
            //OUT
            return res.cookie('token', token).status(201).send({status: 'success', message: 'Usuario Logueado exitosamente', token})
        } catch (error) {
            return res.status(400).json({ status: 'error', error: error.message });
        }
    }


    getSessionLogout = async (req, res) => {
        try {
            const {cookieName, message } = await this.sessionService.sessionLogoutUser()

            
            return res.clearCookie(cookieName).status(201).send({status: 'success', message: message})

        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
        }
    }

    
    

    getSessionGithubCallback = async (req, res) => {
        try {
            const { token, cookieOption } = await this.sessionService.sessionGithubLogin(req.user)

            res.cookie('token', token, cookieOption)

        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error en la autenticación con GitHub' });
        }
    }

    getSessionCurrentUser = async (req, res) => {
        try {

            console.log({dataUser: req.user, message: 'datos sensibles user'})
            res.send({ dataUser: req.user, message: 'datos sensibles user' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }

    getSessionCurrentUserPremium = async (req, res) => {
        try {

            console.log({dataUser: req.user, message: 'datos sensibles user'})
            res.send({ dataUser: req.user, message: 'datos sensibles user' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }

    getSessionCurrentUserAdmin = async (req, res) => {
        try {

            console.log({dataUser: req.user, message: 'datos sensibles user'})
            res.send({ dataUser: req.user, message: 'datos sensibles user' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }


}


export default SessionController

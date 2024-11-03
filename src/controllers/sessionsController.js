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
            const {body} = req
            const user = await this.sessionService.SessionLoginUser(body)

            return res.status(201).send({status: 'success', message: 'Usuario Logueado exitosamente', data: user})

        } catch (error) {
            return res.status(400).json({ status: 'error', error: error.message });
        }
    }


    // getSessionLogout = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionGithub = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentUser = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentUserPremium = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // getSessionCurrentAdmin = async (req, res) => {
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }




}


export default SessionController
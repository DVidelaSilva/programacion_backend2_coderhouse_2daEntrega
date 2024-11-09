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
            const {token, role} = await this.sessionService.sessionLoginUser(body)
            //OUT
            //console.log(('token', token).status(201).send({status: 'success', message: 'Usuario Logueado exitosamente', token}));
            return res.cookie('token', token).status(201).send({status: 'success', message: 'Usuario Logueado exitosamente', token, 'role': role})
            // .json({ status: 'success', message: 'Usuario logueado exitosamente', token });
            
        } catch (error) {
            return res.status(400).json({ status: 'error', error: error.message });
        }
    }


    getSessionLogout = async (req, res) => {
        try {
            // const {cookieName, message } = await this.sessionService.sessionLogoutUser()

            res.clearCookie('token') // Limpia la cookie del token
            //console.log({ status: 'success', message: 'Has cerrado sesión correctamente.' })
            res.send({ status: 'success', message: 'Has cerrado sesión correctamente.' });
            //res.redirect('/')
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

            // res.render('homeUsers.handlebars'), {
            //     dataUser: req.user,
            //     message: 'datos sensibles user'
            // }
            //res.send({ dataUser: req.user, message: 'datos sensibles user' });
            console.log({ dataUser: req.user, message: 'datos sensibles user' });
            //res.render('homeUsers.handlebars')
            res.redirect('/currentUser')



        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }

    getSessionCurrentUserPremium = async (req, res) => {
        try {

            //console.log({ dataUser: req.user, message: 'datos sensibles user' });
            // res.send({ dataUser: req.user, message: 'datos sensibles user' });
            // res.redirect('/currentUserPremium')
            console.log({ dataUser: req.user, message: 'datos sensibles user' });
            //res.render('homeUsers.handlebars')
            res.redirect('/currentUserPremium')
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }

    getSessionCurrentUserAdmin = async (req, res) => {
        try {

            console.log({dataUser: req.user, message: 'datos sensibles user'})
            //res.send({ dataUser: req.user, message: 'datos sensibles user' });
            res.redirect('/currentAdmin')
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }




    getExtractUserId = async (req, res) => {
        try {

            // res.render('homeUsers.handlebars'), {
            //     dataUser: req.user,
            //     message: 'datos sensibles user'
            // }
            res.send({ dataUser: req.user, message: 'datos sensibles user' });
            console.log({ dataUser: req.user, message: 'datos sensibles user' });
            //res.render('homeUsers.handlebars')
            //res.redirect('/currentUser')



        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error', message: 'Error al obtener los datos del usuario' });
        }
    }

}


export default SessionController

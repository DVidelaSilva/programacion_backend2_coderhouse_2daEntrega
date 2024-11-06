import { Router } from "express";
import SessionController from "../../controllers/sessionsController.js";
import { validateRegister , validateLogin, handleValidationSessionErrors} from "../../middlewares/validacionesMiddlewares/sessionValidation.middlewares.js";

import passport from "passport";
import {passportCall} from '../../middlewares/passportCall.middlewares.js'
import { authorization } from '../../middlewares/authorization.middlewares.js'


const sessionRouter = Router();

const sessionController = new SessionController()


sessionRouter.post('/register', handleValidationSessionErrors, validateRegister, sessionController.postSessionRegister)
sessionRouter.post('/login', validateLogin, handleValidationSessionErrors, sessionController.postSessionLogin)
sessionRouter.get('/logout', sessionController.getSessionLogout)
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'],  session: false }), async (req, res) => {})
sessionRouter.get('/githubcallback', passport.authenticate('github', { scope: ['user:email'], session: false}), sessionController.getSessionGithubCallback)
sessionRouter.get('/currentUser', passportCall('jwt'), sessionController.getSessionCurrentUser)
sessionRouter.get('/currentUserPremium', passportCall('jwt'), authorization('user-premium'), sessionController.getSessionCurrentUserPremium)
sessionRouter.get('/currentAdmin', passportCall('jwt'), authorization('admin'), sessionController.getSessionCurrentUserAdmin)






export default sessionRouter;

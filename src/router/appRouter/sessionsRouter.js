import { Router } from "express";
import SessionController from "../../controllers/sessionsController.js";
//import { validateUser, validateUserUpdate, validateUserId, handleValidationErrors } from "../../middlewares/userValidation.middlewares.js";

const sessionRouter = Router();

const sessionController = new SessionController()


sessionRouter.post('/register', sessionController.postSessionRegister)
sessionRouter.post('/login', sessionController.postSessionLogin)
// sessionRouter.get('/logout')
// sessionRouter.get('/github')
// sessionRouter.get('/currentUser')
// sessionRouter.get('/currentUserPremium')
// sessionRouter.get('/currentAdmin')





export default sessionRouter;

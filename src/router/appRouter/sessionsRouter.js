import { Router } from "express";
import SessionController from "../../controllers/sessionsController.js";
import { validateRegister , validateLogin, handleValidationErrors} from "../../middlewares/sessionValidation.middlewares.js";

const sessionRouter = Router();

const sessionController = new SessionController()


sessionRouter.post('/register', handleValidationErrors, validateRegister, sessionController.postSessionRegister)
sessionRouter.post('/login', validateLogin, handleValidationErrors, sessionController.postSessionLogin)
// sessionRouter.get('/logout')
// sessionRouter.get('/github')
// sessionRouter.get('/currentUser')
// sessionRouter.get('/currentUserPremium')
// sessionRouter.get('/currentAdmin')





export default sessionRouter;

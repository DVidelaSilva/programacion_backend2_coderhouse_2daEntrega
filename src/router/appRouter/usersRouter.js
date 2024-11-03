import { Router } from "express";
import UserController from '../../controllers/usersController.js'
import { validateUser, validateUserUpdate, validateUserId, handleValidationErrors } from "../../middlewares/userValidation.middlewares.js";

const userRouter = Router();

const userController = new UserController()


userRouter.post('/', validateUser, handleValidationErrors, userController.postUser)
userRouter.get('/', userController.getUsers)
userRouter.get('/:uid', validateUserId, handleValidationErrors, userController.getUser)
userRouter.put('/:uid', validateUserId, validateUserUpdate, handleValidationErrors, userController.putUser)
userRouter.delete('/:uid', validateUserId, handleValidationErrors, userController.deleteUser)




export default userRouter;


import { Router } from "express";
import UserController from '../../controllers/usersController.js'
import { validateUser, validateUserUpdate, validateUserId, handleValidationUserErrors } from "../../middlewares/validacionesMiddlewares/userValidation.middlewares.js";

const userRouter = Router();

const userController = new UserController()


userRouter.post('/', validateUser, handleValidationUserErrors, userController.postUser)
userRouter.get('/', userController.getUsers)
userRouter.get('/:uid', validateUserId, handleValidationUserErrors, userController.getUser)
userRouter.put('/:uid', validateUserId, validateUserUpdate, handleValidationUserErrors, userController.putUser)
userRouter.delete('/:uid', validateUserId, handleValidationUserErrors, userController.deleteUser)

userRouter.put('/update/role', userController.putUserEmail)




export default userRouter;


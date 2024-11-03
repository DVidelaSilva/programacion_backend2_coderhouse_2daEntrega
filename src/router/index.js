import { Router } from "express";

import userRouter from './appRouter/usersRouter.js'
import productRouter from "./appRouter/productsRouter.js";
import sessionRouter from "./appRouter/sessionsRouter.js";

const appRouter = Router()

appRouter.use('/api/users', userRouter)
appRouter.use('/api/products', productRouter)
appRouter.use('/api/sessions', sessionRouter)
//router.use('/', viewsRouter)


export default appRouter

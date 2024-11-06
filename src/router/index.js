import { Router } from "express";

import userRouter from './appRouter/usersRouter.js'
import productRouter from "./appRouter/productsRouter.js";
import sessionRouter from "./appRouter/sessionsRouter.js";
import cartRouter from "./appRouter/cartsRouter.js";

const appRouter = Router()

appRouter.use('/api/users', userRouter)
appRouter.use('/api/products', productRouter)
appRouter.use('/api/sessions', sessionRouter)
appRouter.use('/api/carts', cartRouter)
//router.use('/', viewsRouter)


export default appRouter

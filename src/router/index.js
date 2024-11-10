import { Router } from "express"

import userRouter from './appRouter/usersRouter.js'
import productRouter from "./appRouter/productsRouter.js"
import sessionRouter from "./appRouter/sessionsRouter.js"
import cartRouter from "./appRouter/cartsRouter.js"
import viewsRouter from './appRouter/viewsRouter.js'
import ticketRouter from './appRouter/ticketsRouter.js'

const appRouter = Router()

appRouter.use('/api/users', userRouter)
appRouter.use('/api/products', productRouter)
appRouter.use('/api/sessions', sessionRouter)
appRouter.use('/api/carts', cartRouter)
appRouter.use('/api/tickets', ticketRouter)
appRouter.use('/', viewsRouter)


export default appRouter

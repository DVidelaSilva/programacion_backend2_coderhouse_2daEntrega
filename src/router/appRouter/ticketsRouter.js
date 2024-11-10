import { Router } from "express"
import TicketController from "../../controllers/ticketController.js"


const ticketRouter = Router()

const ticketController = new TicketController()


ticketRouter.post('/mail', ticketController.getMail)



export default ticketRouter

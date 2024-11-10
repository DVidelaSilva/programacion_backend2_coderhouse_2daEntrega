
import TicketService from '../services/ticketService.js'


class TicketController {

    constructor() {
        this.ticketService = new TicketService()
    }


    getMail = async (req, res) =>{
        try{
            const {body} = req
            const email = await this.ticketService.ticketSendEmail(body)
            //OUT
            return res.status(201).send({status: 'success', message: 'Mail enviado', email})
        } catch (error){
            console.log(error)
            return res.status(500).json({ message: 'Error al enviar email' })
        }
    }


}


export default TicketController
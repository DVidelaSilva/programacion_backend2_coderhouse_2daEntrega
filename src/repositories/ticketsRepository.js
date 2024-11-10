import TicketDao from "../daos/ticketsDao.js"


class TicketRepository {

    constructor() {
        this.ticketDao = new TicketDao()
    }

    createTicketInDB = async (data) => {
        try {
            // IN
            const ticket = await this.ticketDao.create(data)
            //OUT
            return ticket
        } catch (error){
            console.log(error)
        }
    }

}



export default TicketRepository
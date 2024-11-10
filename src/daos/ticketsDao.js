import ticketModel from "../models/ticketModel.js"


class TicketDao {


    create = async (data) => {
        try {
            //IN
            const ticket = await ticketModel.create(data)
            //OUT
            return ticket
        } catch (error){
            console.log(error)
        }  
    }   


    getById = async (tid) => {
        try {
            //IN
            const ticket = await ticketModel.findById(tid)
            //OUT
            return ticket
        } catch (error){
            console.log(error)
        }  
    }


}



export default TicketDao

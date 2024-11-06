import ticketModel from "../models/ticketModel.js";


class TicketDao {

    //* Crear un usuario en BD
    create = async (data) => {
        try {
            //IN
            const ticket = await ticketModel.create(data)
            //OUT
            return ticket
        } catch (error){
            console.log(error);
        }  
    }   


    //* Buscar usuario por un Id
    getById = async (tid) => {
        try {
            //IN
            const ticket = await ticketModel.findById({_id: uid})
            //OUT
            return ticket
        } catch (error){
            console.log(error);
        }  
    }


}



export default TicketDao

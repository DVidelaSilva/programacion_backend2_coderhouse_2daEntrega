import { Schema, model, Types } from "mongoose"

const ticketsCollection = 'tickets'

const ticketSchema = new Schema ({

    created_at: {
        type: Date,
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },
    
    purchaser: {
        type: String,
    }
})



const ticketModel = model(ticketsCollection, ticketSchema)



export default ticketModel
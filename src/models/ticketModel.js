import { Schema, model, Types } from "mongoose";

const ticketsCollection = 'tickets'

const ticketSchema = new Schema ({

    created_at: {
        type: Date,
    },
    amount: {
        type: Types.Decimal128,
        required: true,
    },
    purchaser: {
        type: String,
        //required: true,
    }
})


const ticketModel = model(ticketsCollection, ticketSchema)


export default ticketModel
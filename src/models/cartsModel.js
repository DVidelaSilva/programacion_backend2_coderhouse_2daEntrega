import { Schema, model } from "mongoose";

const cartsCollection = 'carts'

const cartsSchema = new Schema ({

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
       quantity: Number,
        _id: false 
    }]
})


const cartModel = model(cartsCollection, cartsSchema)


export default cartModel
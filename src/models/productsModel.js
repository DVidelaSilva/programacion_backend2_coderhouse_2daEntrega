import {Schema, model} from 'mongoose'

const productsCollection = 'products'

const productSchema = new Schema ({

    title: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnails: {
        type: String,
    }
})


const productModel = model(productsCollection, productSchema)


export default productModel
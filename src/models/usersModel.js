import {Schema, model} from 'mongoose'

const usersCollection = 'users'


const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },

    last_name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
    },
    
    password: {
        type: String,
        required: true
    }, 

    role: {
        type: String,
        enum: ['user', 'user-premium', 'admin'],
        default: 'user'
    },

    userCartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: false
    }
})


const userModel = model(usersCollection, userSchema)



export default userModel
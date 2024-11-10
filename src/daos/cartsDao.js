import cartModel from "../models/cartsModel.js"


class CartDao {

    create = async (data) => {
        try {
            //IN
            const cart = await cartModel.create(data)
            //OUT
            return cart
        } catch (error){
            console.log(error)
        }  
    }   


    get = async () => {
        try {
            //IN
            const carts = await cartModel.find()
            //OUT
            return carts
        } catch (error){
            console.log(error)
        }  
    }


    getById = async (cid) => {
         try {
             //IN
             const cart = await cartModel.findById(cid)
             //OUT
             return cart
         } catch (error){
             console.log(error)
         }  
    }

}



export default CartDao
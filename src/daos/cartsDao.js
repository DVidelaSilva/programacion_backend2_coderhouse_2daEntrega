import cartModel from "../models/cartsModel.js";


class CartDao {

    //* Crear un carrito en BD
    create = async (data) => {
        try {
            //IN
            const cart = await cartModel.create(data)
            //OUT
            return cart
        } catch (error){
            console.log(error);
        }  
    }   


    //* Buscar todos los carritos en BD
    get = async () => {
        try {
            //IN
            const carts = await cartModel.find()
            //OUT
            return carts
        } catch (error){
            console.log(error);
        }  
    }


       //* Buscar carrito por un Id
       getById = async (cid) => {
        try {
            //IN
            const cart = await cartModel.findById(cid)
            //OUT
            return cart
        } catch (error){
            console.log(error);
        }  
    }

}



export default CartDao
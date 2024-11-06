import CartDao from "../daos/cartsDao.js";
import CartDto from "../dto/cartsDto.js";


class CartRepository {

    constructor() {
        this.cartDao = new CartDao()
    }

    createCartInDB = async (data) => {
        try {
            // IN
            const cart = await this.cartDao.create(data)
            //OUT
            return new CartDto(cart)
        } catch (error){
            console.log(error);
        }
    }


    findAllCartsInDB = async () => {
        try {
            //IN
            const carts = await this.cartDao.get()
            //OUT
            return carts.map((cart) => new CartDto(cart))
        } catch (error) {
            console.log(error);
        }
    }


    findCartByIdInDB = async (cid) => {
        try {
            //IN
            const cart = await this.cartDao.getById(cid)
            //OUT
            return cart
        } catch (error) {
            console.log(error)
        }
    } 



}



export default CartRepository
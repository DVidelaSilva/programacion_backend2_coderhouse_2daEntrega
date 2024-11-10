import ProductDao from "../daos/productsDao.js"
import ProductDto from "../dto/productsDto.js"
import CartDao from "../daos/cartsDao.js"


class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
        this.cartDao = new CartDao()
    }


    createProductInDB = async (data) => {
        try {
            // IN
            const product = await this.productDao.create(data)
            //OUT
            return new ProductDto(product)
        } catch (error){
            console.log(error)
        }
    }


    findAllProductsInDB = async () => {
        try {
            //IN
            const products = await this.productDao.get()
            //OUT
            return products.map((product) => new ProductDto(product))
        } catch (error) {
            console.log(error)
        }
    }


    findProductByIdInDB = async (pid) => {
        try {
            //IN
            const product = await this.productDao.getById(pid)
            //OUT
            return product
        } catch (error) {
            console.log(error)
        }
    } 


    findProductInCartInDB = async (pid, cid) => {
        try {
            const product = await this.productDao.getById(pid)
            if (!product) {
                throw new Error('Producto no encontrado')
            }
    
            const cart = await this.cartDao.getById(cid)
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
    
            const productInCart = cart.products.find(item => item.productId.toString() === pid.toString())
    
            if (!productInCart) {
                throw new Error('Producto no encontrado en el carrito')
            }
    
            return {
                productId: productInCart.productId,
                quantity: productInCart.quantity
            }
    
        } catch (error) {
            console.log('Error:', error)
            throw new Error('Hubo un problema al buscar el producto en el carrito')
        }
    }


    updateProductByIdInDB = async (pid, data) => {
        try{
            //IN
            const updateProduct = await this.productDao.update(pid, data)
            //OUT
            return new ProductDto(updateProduct)
        } catch (error) {
            console.log(error)
        }
    }


    deleteProductByIdInDB = async (pid) => {
        try{
            //IN
            const deleteProduct = await this.productDao.delete(pid)
            //OUT
            return deleteProduct
        } catch (error) {
            console.log(error)
        }
    }


    deleteProductOfCartInDB = async (cartId, productId) => {
        try {
            const cart = await this.cartDao.getById(cartId)
            if (!cart) {
                throw new Error("Carrito no encontrado")
            }

            const productIndex = cart.products.findIndex(item => item.product.toString() === productId.toString())

            if (productIndex === -1) {
                throw new Error("Producto no encontrado en el carrito")
            }

            cart.products.splice(productIndex, 1)

            await cart.save()

            return { status: "success", message: "Producto eliminado del carrito", cart: cart }
        } catch (error) {
            console.log(error)
            throw new Error('Error al eliminar el producto del carrito')
        }
    }


}




export default ProductRepository
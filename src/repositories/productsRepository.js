import ProductDao from "../daos/productsDao.js";
import ProductDto from "../dto/productsDto.js";
import CartDao from "../daos/cartsDao.js";


class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
        this.cartDao = new CartDao()
    }


    createProductInDB = async (data) => {
        try {
            // IN
            const product = await this.productDao.create(data);
            //OUT
            return new ProductDto(product)
        } catch (error){
            console.log(error);
        }
    }


    findAllProductsInDB = async () => {
        try {
            //IN
            const products = await this.productDao.get()
            //OUT
            return products.map((product) => new ProductDto(product))
        } catch (error) {
            console.log(error);
        }
    }


    findProductByIdInDB = async (pid) => {
        try {
            //IN
            const product = await this.productDao.getById(pid)
            //OUT
            //return new ProductDto(product)
            return product
        } catch (error) {
            console.log(error)
        }
    } 

    findProductInCartInDB = async (pid, cid) => {
        try {
            // Buscar el producto por su ID en la base de datos
            const product = await this.productDao.getById(pid);
            if (!product) {
                console.log('Producto no encontrado');
                throw new Error('Producto no encontrado');
            }
    
            // Buscar el carrito por su ID en la base de datos
            const cart = await this.cartDao.getById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                throw new Error('Carrito no encontrado');
            }
    
            // Verificar si el producto está en el carrito
            const productInCart = cart.products.find(item => item.productId.toString() === pid.toString());
    
            if (!productInCart) {
                console.log('Producto no está en el carrito');
                throw new Error('Producto no encontrado en el carrito');
            }
    
            // Si el producto se encuentra en el carrito, devolverlo con su cantidad
            return {
                productId: productInCart.productId,
                quantity: productInCart.quantity
            };
    
        } catch (error) {
            console.log('Error:', error);
            throw new Error('Hubo un problema al buscar el producto en el carrito');
        }
    };


    updateProductByIdInDB = async (pid, data) => {
        try{
            //IN
            const updateProduct = await this.productDao.update(pid, data)
            //OUT
            return new ProductDto(updateProduct)
        } catch (error) {
            console.log(error);
        }
    }


    deleteProductByIdInDB = async (pid) => {
        try{
            //IN
            const deleteProduct = await this.productDao.delete(pid)
            //OUT
            return deleteProduct//new ProductDto(deleteProduct)
        } catch (error) {
            console.log(error);
        }
    }

    // Método para eliminar un producto del carrito
    deleteProductOfCartInDB = async (cartId, productId) => {
        try {
            // Buscar el carrito por su ID
            const cart = await this.cartDao.getById(cartId)
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            // Encontrar el índice del producto en el array de productos del carrito
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId.toString());

            // Si no se encuentra el producto en el carrito
            if (productIndex === -1) {
                throw new Error("Producto no encontrado en el carrito");
            }

            // Eliminar el producto del array de productos del carrito
            cart.products.splice(productIndex, 1);

            // Guardar los cambios en el carrito
            await cart.save();  // Asumiendo que el cartDao tiene un método `save` para persistir los cambios

            return { status: "success", message: "Producto eliminado del carrito", cart: cart };
        } catch (error) {
            console.log(error);
            throw new Error('Error al eliminar el producto del carrito');
        }
    }




}


export default ProductRepository
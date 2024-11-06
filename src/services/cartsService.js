import { body } from "express-validator";
import CartRepository from "../repositories/cartsRepository.js";
import ProductRepository from "../repositories/productsRepository.js";


class CartService {

    constructor() {
        this.cartRepository = new CartRepository()
        this.productRepository = new ProductRepository()
    }

    createCart = async (data) => {
        try {
            //IN
            const cart = await this.cartRepository.createCartInDB(data)      
            //OUT
            return cart
        } catch (error) {
            console.log(error)
        }
    }


    findAllCarts = async () => {
        try {
            //IN
            const carts = await this.cartRepository.findAllCartsInDB()
            //OUT
            return carts
        } catch (error) {
            console.log(error);
        }
    }


    findCartById = async (cid) => {
        try {
            //IN
            const cart = await this.cartRepository.findCartByIdInDB(cid)
            //OUT
            return cart
        } catch (error) {
            console.log(error);
        }
    }


    saveProductToCart = async (cid, pid, quantity) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid);
            if (!cart) throw new Error('Carrito no encontrado');

            const product = await this.productRepository.findProductByIdInDB(pid);
            if (!product) throw new Error('Producto no encontrado');

            // Verificar si el producto ya está en el carrito
            const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid);
            if (existProductInCart) {
                console.log('Producto existe se suma una unidad');
                // Si el producto ya existe, se suma la cantidad
                existProductInCart.quantity += quantity;
            } else {
                console.log('Se guarda producto en carrito');
                // Si el producto no existe, se agrega al carrito
                cart.products.push({
                    product: product._id, 
                    quantity: quantity 
                });
            }
            // Guardar el carrito actualizado
            const updatedCart = await cart.save()
            return updatedCart;
        } catch (error) {
            console.log(error);
            throw new Error('Error al agregar producto al carrito');
        }
    }



    updateQuantityOfProductInCart = async (cid, pid, quantity) => {
        const cart = await this.cartRepository.findCartByIdInDB(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = await this.productRepository.findProductByIdInDB(pid);
        if (!product) throw new Error('Producto no encontrado');

        const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid);
            if (existProductInCart) {
                console.log('Producto existe se actualiza cantidad');
                // Si el producto ya existe, se actualiza cantidad
                existProductInCart.quantity = quantity + existProductInCart.quantity;
            } else {
                console.log('Se guarda producto en carrito');
                // Si el producto no existe, se agrega al carrito
                cart.products.push({ product: pid, quantity: quantity })
            }

            const updatedQuantity = await cart.save()
            return updatedQuantity;
    }
    


    deleteProductOfCart = async (cid, pid) => {
        const cart = await this.cartRepository.findCartByIdInDB(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        const product = await this.productRepository.findProductByIdInDB(pid);
        if (!product) throw new Error('Producto no encontrado');

        const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid);
        if (existProductInCart) {
            console.log('Producto existe se elimina del carrito');
            // Si el producto ya existe, se elimina
            cart.products = cart.products.filter(item => item.product && item.product.toString() !== pid);
            const updatedCart = await cart.save();
            return updatedCart;
        } else {
            console.log('Producto no encontrado en el carrito');
            throw new Error('Producto no encontrado en el carrito');
           
        }
    }


    deleteAllProductsOfCart = async (cid) => {

        const cart = await this.cartRepository.findCartByIdInDB(cid);
        if (cart) {
            cart.products = []
            const updatedCart = await cart.save();
            return updatedCart;
        } else {
            console.log('Producto no encontrado en el carrito');
            throw new Error('Producto no encontrado en el carrito');
        }
    }




    findCartByIdForPurchase = async (cid) => {
        try {
            // Obtener el carrito de la base de datos
            const cart = await this.cartRepository.findCartByIdInDB(cid);
            console.log('Carrito:', cart);
    
            // Crear un array para almacenar los resultados de la comprobación de stock
            const stockStatus = await Promise.all(
                cart.products.map(async (item) => {
                    // Obtener los detalles del producto desde el repositorio
                    const product = await this.productRepository.findProductByIdInDB(item.product);
                    
                    // Comparar el stock con la cantidad solicitada
                    if (product.stock >= item.quantity) {
                        return { productId: item.product, status: "stock disponible" };
                    } else {
                        return { productId: item.product, status: "no se puede comprar" };
                    }
                })
            );
    
            console.log('Estado de stock de los productos en el carrito:', stockStatus);
    
            // Retornar el carrito completo junto con el estado de stock de los productos
            return { cart: cart.toObject(), stockStatus };
        } catch (error) {
            console.log(error);
            throw new Error('Error al verificar el stock de los productos en el carrito');
        }
    }


    purchaseCart = async (cid) => {
        try {
            // Obtener el carrito de la base de datos
            const cart = await this.cartRepository.findCartByIdInDB(cid);
            console.log('Carrito:', cart);
    
        // Crear un array para almacenar los productos con stock disponible
        const stockStatus = (await Promise.all(
            cart.products.map(async (item) => {
                // Obtener los detalles del producto desde el repositorio
                const product = await this.productRepository.findProductByIdInDB(item.product);

                // Comparar el stock con la cantidad solicitada
                if (product.stock >= item.quantity) {
                    return { productId: item.product, status: "stock disponible" };
                }
                // Si el stock no es suficiente, retornar null para ignorarlo
                return null;
            })
        )).filter(item => item !== null); // Filtrar los elementos nulos

        console.log('Productos con stock disponible:', stockStatus);

        // Retornar solo los productos con stock disponible
        return stockStatus;
        } catch (error) {
            console.log(error);
            throw new Error('Error al verificar el stock de los productos en el carrito');
        }
    }


    payCart = async (cid) => {
        try {
            // Obtener el carrito de la base de datos
            const cart = await this.cartRepository.findCartByIdInDB(cid);
            //console.log('Carrito:', cart);
    
        // Crear un array para almacenar los productos con stock disponible
        const stockStatus = (await Promise.all(
            cart.products.map(async (item) => {
                // Obtener los detalles del producto desde el repositorio
                const product = await this.productRepository.findProductByIdInDB(item.product);
                console.log(item.product);
                console.log(product.stock);
                console.log(item.quantity);
                // Comparar el stock con la cantidad solicitada
                if (product.stock >= item.quantity) {
                    console.log(product.stock);
                    // Restar la cantidad directamente en la base de datos
                    product.stock -= item.quantity;
                    await product.save();  // Guardar el nuevo valor de stock en la base de datos

                    return { productId: item.product, status: "stock disponible" };
                }
                // Si el stock no es suficiente, retornar null para ignorarlo
                return null;
            })
        )).filter(item => item !== null); // Filtrar los elementos nulos

        console.log('Productos con stock disponible:', stockStatus);

        // Retornar solo los productos con stock disponible
        return stockStatus;
        } catch (error) {
            console.log(error);
            throw new Error('Error al verificar el stock de los productos en el carrito');
        }
    }





}


export default CartService
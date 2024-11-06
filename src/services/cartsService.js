import { body } from "express-validator";
import CartRepository from "../repositories/cartsRepository.js";
import ProductRepository from "../repositories/productsRepository.js";
import UserRepository from '../repositories/usersRepository.js'
import TicketRepository from '../repositories/ticketsRepository.js'

class CartService {

    constructor() {
        this.cartRepository = new CartRepository()
        this.productRepository = new ProductRepository()
        this.userRepository = new UserRepository()
        this.ticketRepository = new TicketRepository()
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




    findStockProductInCart = async (cid) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)

            // Array para almacenar los resultados de la comprobación de stock
            const stockStatus = await Promise.all(
                cart.products.map(async (item) => {
                    const product = await this.productRepository.findProductByIdInDB(item.product)
                    if (product.stock >= item.quantity) {
                        return { productId: item.product, status: "stock disponible" }
                    } else {
                        return { productId: item.product, status: "no hay stock disponible" }
                    }
                })
            )

            return { stockStatus }
        } catch (error) {
            console.log(error)
            throw new Error('Error al verificar el stock de los productos en el carrito')
        }
    }



    resumePurchaseCart = async (cid) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)

        // Array para almacenar los productos con stock disponible
        const stockStatus = (await Promise.all(
            cart.products.map(async (item) => {
                const product = await this.productRepository.findProductByIdInDB(item.product)

                if (product.stock >= item.quantity) {
                    return { productId: item.product, status: "stock disponible" }
                }
                // Si el stock no es suficiente, retorna null para ignorarlo
                return null
            })
        )).filter(item => item !== null);

        return stockStatus;
        } catch (error) {
            console.log(error);
            throw new Error('Error al verificar el stock de los productos en el carrito');
        }
    }


    payCart = async (cid, uid) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)
            const user = await this.userRepository.findUserByIdInDB(uid)

        let totalAmount = 0
        const userEmail = user.email

        // Array para almacenar los productos con stock disponible
        const stockStatus = (await Promise.all(
            cart.products.map(async (item) => {
                // Obtener los detalles del producto desde el repositorio
                const product = await this.productRepository.findProductByIdInDB(item.product)
                // Comparar el stock con la cantidad solicitada
                if (product.stock >= item.quantity) {
                    // Restar la cantidad directamente en la base de datos
                    product.stock -= item.quantity
                    await product.save()
                    // Sumar el precio del producto multiplicado por la cantidad al totalAmount
                    totalAmount += product.price * item.quantity
                }
                // Si el stock no es suficiente, retornar null para ignorarlo
                return null;
            })
        )).filter(item => item !== null)

        const payTicket = {
            created_at: Date.now(),
            amount: totalAmount,
            purchaser: userEmail
        }

        const payTicketToDB = await this.ticketRepository.createTicketInDB(payTicket)

        return payTicket;
        } catch (error) {
            console.log(error);
            throw new Error('Error al verificar el stock de los productos en el carrito');
        }
    }

}


export default CartService
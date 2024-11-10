import CartRepository from "../repositories/cartsRepository.js"
import ProductRepository from "../repositories/productsRepository.js"
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
            console.log(error)
        }
    }


    findCartById = async (cid) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)
            if (cart && cart.products) {
                const totalQuantity = cart.products.reduce((sum, product) => sum + product.quantity, 0)
            return {
                cart: cart,
                totalQuantity: totalQuantity
            }
        } else {
            return {
                cart: null,
                totalQuantity: 0
            }
        }
        } catch (error) {
            console.log(error)
        }
    }


    saveProductToCart = async (cid, pid, quantity) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)
            if (!cart) throw new Error('Carrito no encontrado')

            const product = await this.productRepository.findProductByIdInDB(pid)
            if (!product) throw new Error('Producto no encontrado')

            const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid)
            if (existProductInCart) {
                existProductInCart.quantity += quantity
            } else {
                cart.products.push({
                    product: product._id, 
                    quantity: quantity
                })
            }

            const updatedCart = await cart.save()
            return updatedCart
        } catch (error) {
            console.log(error)
            throw new Error('Error al agregar producto al carrito')
        }
    }


    updateQuantityOfProductInCart = async (cid, pid, quantity) => {
        const cart = await this.cartRepository.findCartByIdInDB(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        const product = await this.productRepository.findProductByIdInDB(pid)
        if (!product) throw new Error('Producto no encontrado')

        const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid)
            if (existProductInCart) {
                existProductInCart.quantity = quantity + existProductInCart.quantity
            } else {
                cart.products.push({ product: pid, quantity: quantity })
            }
            const updatedQuantity = await cart.save()
            return updatedQuantity
    }
    

    deleteProductOfCart = async (cid, pid) => {
        const cart = await this.cartRepository.findCartByIdInDB(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        const product = await this.productRepository.findProductByIdInDB(pid)
        if (!product) throw new Error('Producto no encontrado')

        const existProductInCart = cart.products.find(item => item.product && item.product.toString() === pid)
        if (existProductInCart) {
            cart.products = cart.products.filter(item => item.product && item.product.toString() !== pid)
            const updatedCart = await cart.save()
            return updatedCart
        } else {
            throw new Error('Producto no encontrado en el carrito')
        }
    }


    deleteAllProductsOfCart = async (cid) => {

        const cart = await this.cartRepository.findCartByIdInDB(cid)
        if (cart) {
            cart.products = []
            const updatedCart = await cart.save()
            return updatedCart
        } else {
            throw new Error('Producto no encontrado en el carrito')
        }
    }


    findStockProductInCart = async (cid) => {
        try {
            const cart = await this.cartRepository.findCartByIdInDB(cid)

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

        const stockStatus = (await Promise.all(
            cart.products.map(async (item) => {
                const product = await this.productRepository.findProductByIdInDB(item.product)

                if (product.stock >= item.quantity) {
                    return { productId: item.product, status: "stock disponible", amount: item.product.price }
                }
                return null
            })
        )).filter(item => item !== null)

        return stockStatus
        } catch (error) {
            console.log(error)
            throw new Error('Error al verificar el stock de los productos en el carrito')
        }
    }


    payCart = async (cid, uid) => {
        try {
            // Buscar el carrito y el usuario
            const cart = await this.cartRepository.findCartByIdInDB(cid)
            const user = await this.userRepository.findUserByIdInDB(uid)
    
            let totalAmount = 0
            const userEmail = user.email
    
            const stockStatus = await Promise.all(
                cart.products.map(async (item) => {
                    const product = await this.productRepository.findProductByIdInDB(item.product)

                    if (product.stock >= item.quantity) {
                       product.stock -= item.quantity
                        await product.save()

                    return { 
                        productId: item.product, 
                        status: "stock disponible", 
                        monto: product.price * item.quantity, 
                    } 

                    } else             
                        return { 
                        productId: item.product, 
                        status: "no hay stock disponible" 
                    }
                })
            )

            const totalprice = stockStatus.reduce((acc, item) => {
                if (item.status === "stock disponible") {
                    return acc + item.monto
                }
                return acc
            }, 0)

            const stockStatus2 = await Promise.all(
                cart.products.map(async (item) => {
                    const product = await this.productRepository.findProductByIdInDB(item.product)
                    if (product.stock >= item.quantity) {
                        return { productId: item.product, status: "stock disponible" }
                    } else {
                        return { productId: item.product, status: "no hay stock disponible" }
                    }
                })
            )

            const productsToRemove = stockStatus2.filter(item => item && item.status === "stock disponible")
            const productIds = productsToRemove.map(item => item.productId)    

            for (let item of productIds) {
                await this.productRepository.deleteProductOfCartInDB(cid, item)
            }

            // Crear el ticket de pago
            const payTicket = {
                created_at: Date.now(),
                amount: totalprice, 
                purchaser: userEmail
            }
            
            const payTicketToDB = await this.ticketRepository.createTicketInDB(payTicket)

            return payTicketToDB
    
        } catch (error) {
            console.log(error)
            throw new Error('Error al verificar el stock de los productos en el carrito')
        }
    }

}





export default CartService
import CartService from "../services/cartsService.js"
import ProductService from '../services/productsService.js'


class CartController {

    constructor() {
        this.cartService = new CartService()
        this.productService = new ProductService()
    }


    postCart = async (req, res) => {
        try{
            //IN
            const {body} = req
            const cart = await this.cartService.createCart(body)
            //OUT
            return res.status(201).send({status: 'success', message: 'Carrito Creado exitosamente', data: cart})
        } catch (error){
            console.log(error)
            return res.status(500).json({ message: 'Error al crear carrito' })
        }
    }


    getCarts= async (req, res) => {
        try{
            //IN
            const carts = await this.cartService.findAllCarts()
            //OUT
            return res.status(200).send({status: 'success', message: 'Carritos Encontrados exitosamente', data: carts})
        } catch (error){
            console.log(error)
            return res.status(500).json({ message: 'Error al devolver carritos' })
        }
    }


    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await this.cartService.findCartById(cid)
            if (cart) {
                return res.status(200).send({status: 'success', message: 'Carrito Encontrado exitosamente', data: cart})
            } else {
                return res.status(404).send({message: `Carrito id ${cid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error al devolver carrito' })
        }
    }



    postProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const quantity = req.body.quantity || 1
            // Verificar que el carrito existe
            const cart = await this.cartService.findCartById(cid)
            if (!cart) {
                return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' })
            }
            // Verificar que el producto existe
            const product = await this.productService.findProductById(pid)
            if (!product) {
                return res.status(404).send({ status: 'error', message: 'Producto no encontrado' })
            }
            // Agregar el producto al carrito
            const addCart = await this.cartService.saveProductToCart(cid, pid, quantity)

            return res.status(200).send({ status: 'success', message: 'Producto agregado al carrito', data: addCart })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ status: 'error', message: 'Error al agregar producto al carrito' })
        }
    }


    putQuantityOfProductInCart = async (req, res) => {
        try{
            const { cid, pid } = req.params

            const cart = await this.cartService.findCartById(cid)
            if (!cart) {
                return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' })
            }
            // Verificar que el producto existe
            const product = await this.productService.findProductById(pid)
            if (!product) {
                return res.status(404).send({ status: 'error', message: 'Producto no encontrado' })
            }

            const { quantity } = req.body

            const updateQuantity = await this.cartService.updateQuantityOfProductInCart(cid, pid, quantity)
            res.send({ status: 'success', message: 'Cantidad del producto actualizada en el carrito', data: updateQuantity })
        } catch (error) {
            console.error(error)
            res.status(400).send({ status: 'error', message: error.message })
        }
    }


    deleteProductOfCart = async (req, res) => {
        try{
            const { cid, pid } = req.params

            const cart = await this.cartService.findCartById(cid)
            if (!cart) {
                return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' })
            }
            // Verificar que el producto existe
            const product = await this.productService.findProductById(pid)
            if (!product) {
                return res.status(404).send({ status: 'error', message: 'Producto no encontrado' })
            }

            const result = await this.cartService.deleteProductOfCart(cid, pid)
            let productDelete = result.modifiedCount
            if(productDelete === 0){
                res.send({ status: 'success', message: 'Producto No se encuentra en el carrito'})
            } else{
                res.send({ status: 'success', message: 'Producto eliminado del carrito'})
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ status: 'error', message: error.message })
        }
    }


    deleteAllProductsOfCart = async (req, res) => {
        try {
            const { cid } = req.params

            const cart = await this.cartService.findCartById(cid)
            if (!cart) {
                return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' })
            }
    
            const result = await this.cartService.deleteAllProductsOfCart(cid)
            res.send({ status: 'success', message: 'Productos eliminados del carrito', data: result })
        } catch (error) {
            console.error(error)
            res.status(400).send({ status: 'error', message: error.message })
        }

    }


    getStockProductInCart = async (req, res) => {
        try {
            const { cid } = req.params
            const stockStatus = await this.cartService.findStockProductInCart(cid)

            if (stockStatus) {
                return res.status(200).send({status: 'success', message: 'Stock Status ', data: stockStatus})
            } else {
                return res.status(404).send({message: `Carrito id ${cid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({ status: 'error', message: error.message })
        }
    }


    getResumePurchaseCart = async (req, res) => {
        try {
            const { cid } = req.params
            const stockStatus = await this.cartService.resumePurchaseCart(cid)
            
            if (stockStatus) {
                return res.status(200).send({status: 'success', message: 'Resume Purchase', data: stockStatus})
            } else {
                return res.status(404).send({message: `Carrito id ${cid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({ status: 'error', message: error.message })
        }
    }



    getPay = async (req, res) => {
        try {
            const { cid, uid} = req.params
            const payTicket = await this.cartService.payCart(cid, uid)

            if (payTicket) {
                return res.status(200).send({status: 'success', message: 'Pago Realizado exitosamente', data: payTicket})
            } else {
                return res.status(404).send({message: `No se pudo procesar el pago para el carrito id ${cid}`})
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({ status: 'error', message: error.message })
        }
    }


}



export default CartController
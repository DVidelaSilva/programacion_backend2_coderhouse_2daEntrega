import ProductService from "../services/productsService.js"


class ProductController {

    constructor() {
        this.productService = new ProductService()
    }
    

    postProduct = async (req, res) => {
        try{
            //IN
            const {body} = req
            const product = await this.productService.createProduct(body)
            //OUT
            return res.status(201).send({status: 'success', message: 'Producto Creado exitosamente', data: product})
        } catch (error){
            console.log(error)
            return res.status(500).json({ message: 'Error al crear producto' })
        }
    }


    getProducts = async (req, res) => {
        try{
            //IN
            const products = await this.productService.findAllProducts()
            //OUT
            return res.status(200).send({status: 'success', message: 'Productos Encontrados exitosamente', data: products})
        } catch (error){
            return res.status(500).json({ message: 'Error al devolver productos' })
        }
    }


    getProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const product = await this.productService.findProductById(pid)
            if (product) {
                return res.status(200).send({status: 'success', message: 'Producto Encontrado exitosamente', data: product})
            } else {
                return res.status(404).send({message: `Producto id ${pid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
        }
    }


    putProduct = async (req, res) => {
        try{
            const {pid} = req.params
            const {body} = req
            const product = await this.productService.updateProductById(pid, body)
            if (product) {
                return res.status(201).send({status: 'success', message: 'Producto Actualizado exitosamente', data: product})
            } else {
                return res.status(404).send({message: `Producto id ${pid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Error al actualizar productos' })
        }
    }


    deleteProduct = async (req, res) => {
        try {
            const {pid} = req.params
            const product = await this.productService.deleteProductById(pid)
            if (product) {
                return res.status(200).send({status: 'success', message: 'Producto Eliminado exitosamente', data: product})
            } else {
                return res.status(404).send({message: `Usuario id ${pid} no encontrado`})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Error al eliminar productos' })
        }
    }


    



}







export default ProductController
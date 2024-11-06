import ProductRepository from "../repositories/productsRepository.js";



class ProductService {

    constructor() {
        this.productrepository = new ProductRepository()

    }

    createProduct = async (data) => {
        try {
            //IN
            const product = await this.productrepository.createProductInDB(data)         
            //OUT
            return product
        } catch (error) {
            console.log(error)
        }
    }

    
    findAllProducts = async () => {
        try {
            //IN
            const products = await this.productrepository.findAllProductsInDB()
            //OUT
            return products
        } catch (error) {
            console.log(error);
        }
    }


    findProductById = async (pid) => {
        try {
            //IN
            const product = await this.productrepository.findProductByIdInDB(pid)
            //OUT
            return product
        } catch (error) {
            console.log(error);
        }
    }


    updateProductById = async (pid, data) => {
        try{
            //IN
            const product = await this.productrepository.updateProductByIdInDB(pid, data)
            //OUT
            return product
        } catch (error) {
            console.log(error);
        }
    }


    deleteProductById = async (pid) => {
        try {
            //IN
            const product = await this.productrepository.deleteProductByIdInDB(pid)
            //OUT
            return product
        } catch (error) {
            console.log(error);
        }
    }

}


export default ProductService
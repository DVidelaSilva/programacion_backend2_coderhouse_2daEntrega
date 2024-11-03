import ProductDao from "../daos/productsDao.js";
import ProductDto from "../dto/productsDto.js";


class ProductRepository {

    constructor() {
        this.productDao = new ProductDao()
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
            return new ProductDto(product)
        } catch (error) {
            console.log(error)
        }
    } 


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
            return new ProductDto(deleteProduct)
        } catch (error) {
            console.log(error);
        }
    }




}


export default ProductRepository
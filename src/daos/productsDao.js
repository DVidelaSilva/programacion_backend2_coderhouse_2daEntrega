import productModel from "../models/productsModel.js";

class ProductDao {
    
    //* Crear un producto en BD
    create = async (data) => {
        try {
            //IN
            const product = await productModel.create(data)
            //OUT
            return product
        } catch (error){
            console.log(error);
        }  
    }    


    //* Buscar todos los productos en BD
    get = async () => {
        try {
            //IN
            const products = await productModel.find()
            //OUT
            return products
        } catch (error){
            console.log(error);
        }  
    }


    //* Buscar producto por un Id
    getById = async (pid) => {
        try {
            //IN
            const product = await productModel.findById({_id: pid})
            //OUT
            return product
        } catch (error){
            console.log(error);
        }  
    }

    
    //* Actualizar un producto por un Id
    update = async (pid, data) => {
        try {
            //IN
            const product = await productModel.findByIdAndUpdate({_id: pid}, data, {new: true})
            //OUT
            return product
        } catch (error){
            console.log(error);
        }  
    }
    
    //* Eliminar un producto por un Id
    delete = async (pid) => {
        try {
            //IN
            const product = await productModel.findByIdAndDelete(pid)
            //OUT
            return product
        } catch (error){
            console.log(error);
        }  
    } 
}



export default ProductDao
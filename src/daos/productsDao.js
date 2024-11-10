import productModel from "../models/productsModel.js"

class ProductDao {
    

    create = async (data) => {
        try {
            //IN
            const product = await productModel.create(data)
            //OUT
            return product
        } catch (error){
            console.log(error)
        }  
    }    


    get = async () => {
        try {
            //IN
            const products = await productModel.find()
            //OUT
            return products
        } catch (error){
            console.log(error)
        }  
    }


    getById = async (pid) => {
        try {
            //IN
            const product = await productModel.findById({_id: pid})
            //OUT
            return product
        } catch (error){
            console.log(error)
        }  
    }

    
    update = async (pid, data) => {
        try {
            //IN
            const product = await productModel.findByIdAndUpdate({_id: pid}, data, {new: true})
            //OUT
            return product
        } catch (error){
            console.log(error)
        }  
    }
    

    delete = async (pid) => {
        try {
            //IN
            const product = await productModel.findByIdAndDelete(pid)
            //OUT
            return product
        } catch (error){
            console.log(error)
        }  
    } 
}



export default ProductDao
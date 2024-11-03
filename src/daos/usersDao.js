import userModel from "../models/usersModel.js"


class UserDao {
    
    //* Crear un usuario en BD
    create = async (data) => {
        try {
            //IN
            const user = await userModel.create(data)
            //OUT
            return user
        } catch (error){
            console.log(error);
        }  
    }    


    //* Buscar todos los usuarios en BD
    get = async () => {
        try {
            //IN
            const users = await userModel.find()
            //OUT
            return users
        } catch (error){
            console.log(error);
        }  
    }


    //* Buscar usuario por un Id
    getById = async (uid) => {
        try {
            //IN
            const user = await userModel.findById({_id: uid})
            //OUT
            return user
        } catch (error){
            console.log(error);
        }  
    }

    //* Buscar usuario por un Id
    getByEmail = async (email) => {
        try {
            //IN
            const user = await userModel.findOne(email)
            //OUT
            return user
        } catch (error){
            console.log(error);
        }  
    }

    
    //* Actualizar un usuario por un Id
    update = async (uid, data) => {
        try {
            //IN
            const user = await userModel.findByIdAndUpdate({_id: uid}, data, {new: true})
            //OUT
            return user
        } catch (error){
            console.log(error);
        }  
    }
    
    //* Eliminar un usuario por un Id
    delete = async (uid) => {
        try {
            //IN
            const user = await userModel.findByIdAndDelete(uid)
            //OUT
            return user
        } catch (error){
            console.log(error);
        }  
    } 
}


export default UserDao
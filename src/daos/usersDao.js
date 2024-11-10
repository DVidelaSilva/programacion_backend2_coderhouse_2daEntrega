import userModel from "../models/usersModel.js"


class UserDao {
    

    create = async (data) => {
        try {
            //IN
            const user = await userModel.create(data)
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    }    


    get = async () => {
        try {
            //IN
            const users = await userModel.find()
            //OUT
            return users
        } catch (error){
            console.log(error)
        }  
    }


    getById = async (uid) => {
        try {
            //IN
            const user = await userModel.findById({_id: uid})
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    }


    getByEmail = async (email) => {
        try {
            //IN
            const user = await userModel.findOne(email)
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    }

    
    update = async (uid, data) => {
        try {
            //IN
            const user = await userModel.findByIdAndUpdate({_id: uid}, data, {new: true})
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    }


    updateRole = async (email, newRole) => {
        try {
            //IN
            const user = await userModel.findOneAndUpdate(
                { email }, 
                { $set: { role: newRole } },
                { new: true }
            )
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    }
    

    delete = async (uid) => {
        try {
            //IN
            const user = await userModel.findByIdAndDelete(uid)
            //OUT
            return user
        } catch (error){
            console.log(error)
        }  
    } 
}




export default UserDao
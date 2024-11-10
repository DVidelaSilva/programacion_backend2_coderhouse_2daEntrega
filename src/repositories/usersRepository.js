import UserDao from "../daos/usersDao.js"
import UserDto from "../dto/usersDto.js"

class UserRepository {

    constructor() {
        this.userDao = new UserDao()
    }


    createUserInDB = async (data) => {
        try {
            // IN
            const user = await this.userDao.create(data)
            //OUT
            return new UserDto(user)
        } catch (error){
            console.log(error)
        }
    }


    findAllUsersInDB = async () => {
        try {
            //IN
            const users = await this.userDao.get()
            //OUT
            return users.map((user) => new UserDto(user))
        } catch (error) {
            console.log(error)
        }
    }


    findUserByIdInDB = async (uid) => {
        try {
            //IN
            const user = await this.userDao.getById(uid)
            //OUT
            return new UserDto(user)
        } catch (error) {
            console.log(error)
        }
    } 
    

    findUserByEmailInDB = async (email) => {
        try {
            //IN
            const user = await this.userDao.getByEmail(email)
            if(!user) {
                return null
            }
            //OUT
            return user
        } catch (error) {
            console.log(error)
        }
    } 


    updateUserByIdInDB = async (uid, data) => {
        try{
            //IN
            const updateUser = await this.userDao.update(uid, data)
            //OUT
            return new UserDto(updateUser)
        } catch (error) {
            console.log(error)
        }
    }


    updateUserByEmailInDB = async (email, newRole) => {
        try{
            //IN
            const updateUser = await this.userDao.updateRole(email, newRole)
            //OUT
            return updateUser
        } catch (error) {
            console.log(error)
        }
    }


    deleteUserByIdInDB = async (uid) => {
        try{
            //IN
            const deleteUser = await this.userDao.delete(uid)
            //OUT
            return new UserDto(deleteUser)
        } catch (error) {
            console.log(error)
        }
    }

}



export default UserRepository
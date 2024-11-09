import { body } from "express-validator"
import UserService from "../services/usersService.js"


class UserController {

    constructor() {
        this.userService = new UserService()
    }
    

    postUser = async (req, res) => {
        try{
            //IN
            const {body} = req
            const user = await this.userService.createUser(body)
            //OUT
            return res.status(201).send({status: 'success', message: 'Usuario Creado exitosamente', data: user})
        } catch (error){
            console.log(error);
            return res.status(500).json({ message: 'Error al crear usuario' });
        }
    }


    getUsers = async (req, res) => {
        try{
            //IN
            const users = await this.userService.findAllUsers()
            //OUT
            return res.status(200).send({status: 'success', message: 'Usuarios Encontrados exitosamente', data: users})
        } catch (error){
            return res.status(500).json({ message: 'Error al devolver usuarios' });
        }
    }


    getUser = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await this.userService.findUserById(uid)
            if (user) {
                return res.status(200).send({status: 'success', message: 'Usuario Encontrado exitosamente', data: user})
            } else {
                return res.status(404).send({message: `Usuario id ${uid} no encontrado`})
            }
        } catch (error) {
            console.log(error);
        }
    }


    putUser = async (req, res) => {
        try{
            const {uid} = req.params
            const {body} = req
            const user = await this.userService.updateUserById(uid, body)
            if (user) {
                return res.status(201).send({status: 'success', message: 'Usuario Actualizado exitosamente', data: user})
            } else {
                return res.status(404).send({message: `Usuario id ${uid} no encontrado`})
            }
        } catch (error) {
            console.log(error);
        }
    }

    putUserEmail = async (req, res) => {
        try{
            const {email, newRole} = req.body
            const user = await this.userService.updateUserByEmail(email, newRole)
            if (user) {
                return res.status(201).send({status: 'success', message: 'Role Actualizado exitosamente', data: user})
            } else {
                return res.status(404).send({message: `Usuario id no encontrado`})
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    

    deleteUser = async (req, res) => {
        try {
            const {uid} = req.params
            const user = await this.userService.deleteUserById(uid)
            if (user) {
                return res.status(200).send({status: 'success', message: 'Usuario Eliminado exitosamente', data: user})
            } else {
                return res.status(404).send({message: `Usuario id ${uid} no encontrado`})
            }
        } catch (error) {
            console.log(error);
        }
    }



}





export default UserController
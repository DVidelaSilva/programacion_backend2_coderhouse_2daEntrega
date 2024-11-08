import { Router } from "express";


const viewsRouter = Router()


viewsRouter.get('/', (req, res) => {
    res.render('homeProducts.handlebars')
})

viewsRouter.get('/login', (req, res) => {
    res.render('login.handlebars')
})

viewsRouter.get('/register', (req, res) => {
    res.render('register.handlebars')
})

viewsRouter.get('/registerOK', (req, res) => {
    res.render('registerOK.handlebars')
})

viewsRouter.get('/currentUser', (req, res) => {
    res.render('homeUsers.handlebars')
})

viewsRouter.get('/currentAdmin', (req, res) => {
    res.render('homeAdmin.handlebars')
})

viewsRouter.get('/currentUserPremium', (req, res) => {
    res.render('homeUsersPremium.handlebars')
})









export default viewsRouter
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

viewsRouter.get('/cart', (req, res) => {
    res.render('cart.handlebars')
})

viewsRouter.get('/cartStock', (req, res) => {
    res.render('cartStock.handlebars')
})

viewsRouter.get('/cartPay', (req, res) => {
    res.render('cartPay.handlebars')
})

viewsRouter.get('/createUser', (req, res) => {
    res.render('createUser.handlebars')
})

viewsRouter.get('/createProduct', (req, res) => {
    res.render('createProduct.handlebars')
})

viewsRouter.get('/updateRole', (req, res) => {
    res.render('assignRole.handlebars')
})

viewsRouter.get('/soon', (req, res) => {
    res.render('soon.handlebars')
})







export default viewsRouter
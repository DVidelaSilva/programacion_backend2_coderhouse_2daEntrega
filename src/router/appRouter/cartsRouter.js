import { Router } from "express";
import CartController from "../../controllers/cartsController.js";
import { validateCart, validateCartUpdate, validateCartId, handleValidationCartErrors } from '../../middlewares/validacionesMiddlewares/cartValidation.middlewares.js'
import { validateProductId, handleValidationProductErrors } from "../../middlewares/validacionesMiddlewares/productValidation.middlewares.js";
import { validateUserId, handleValidationUserErrors} from '../../middlewares/validacionesMiddlewares/userValidation.middlewares.js'

const cartRouter = Router()

const cartController = new CartController()


cartRouter.post('/', cartController.postCart)
cartRouter.get('/', cartController.getCarts)
cartRouter.get('/:cid', validateCartId, handleValidationCartErrors, cartController.getCart)
cartRouter.post('/:cid/products/:pid', validateCart, validateCartId, handleValidationCartErrors, validateProductId, handleValidationProductErrors, cartController.postProductToCart);
cartRouter.put('/:cid/products/:pid', validateCart, validateCartId, handleValidationCartErrors, validateProductId, handleValidationProductErrors, cartController.putQuantityOfProductInCart)
cartRouter.delete('/:cid/products/:pid', validateCartId, handleValidationCartErrors, validateProductId, handleValidationProductErrors, cartController.deleteProductOfCart)
cartRouter.delete('/:cid', validateCartId, handleValidationCartErrors, cartController.deleteAllProductsOfCart)
cartRouter.get('/purchase/:cid', validateCartId, handleValidationCartErrors, cartController.getStockProductInCart)
cartRouter.get('/purchaseCart/:cid', validateCartId, handleValidationCartErrors, cartController.getResumePurchaseCart)
cartRouter.get('/pay/:cid/user/:uid', validateCartId, handleValidationCartErrors,validateUserId, handleValidationUserErrors, cartController.getPay)


export default cartRouter

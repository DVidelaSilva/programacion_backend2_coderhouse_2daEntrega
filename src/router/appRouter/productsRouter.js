import { Router } from "express";
import ProductController from "../../controllers/productsController.js";
import { validateProduct, validateProductUpdate, validateProductId, handleValidationProductErrors } from "../../middlewares/validacionesMiddlewares/productValidation.middlewares.js";

const productRouter = Router();

const productController = new ProductController()


productRouter.post('/', validateProduct, handleValidationProductErrors, productController.postProduct)
productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', validateProductId, handleValidationProductErrors, productController.getProduct)
productRouter.put('/:pid', validateProductId, validateProductUpdate, handleValidationProductErrors, productController.putProduct)
productRouter.delete('/:pid', validateProductId, handleValidationProductErrors, productController.deleteProduct)




export default productRouter;

import { Router } from "express";
import ProductController from "../../controllers/productsController.js";
import { validateProduct, validateProductUpdate, validateProductId, handleValidationErrors } from "../../middlewares/productValidation.middlewares.js";

const productRouter = Router();

const productController = new ProductController()


productRouter.post('/', validateProduct, handleValidationErrors, productController.postProduct)
productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', validateProductId, handleValidationErrors, productController.getProduct)
productRouter.put('/:pid', validateProductId, validateProductUpdate, handleValidationErrors, productController.putProduct)
productRouter.delete('/:pid', validateProductId, handleValidationErrors, productController.deleteProduct)




export default productRouter;

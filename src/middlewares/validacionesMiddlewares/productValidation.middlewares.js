import { body, param, validationResult } from "express-validator"
import mongoose from "mongoose"


const validateProduct = [
    body('title')
        .notEmpty().withMessage('El title es obligatorio')
        .isLength({max: 50}).withMessage('El title no puede exceder los 50 caracteres')
        .isString().withMessage('El title solo debe ser un String.'),
    body('autor')
        .notEmpty().withMessage('El autor es obligatorio')
        .isLength({max: 50}).withMessage('El autor no puede exceder los 50 caracteres')
        .isString().withMessage('El autor solo debe ser un String.'),
    body('description')
        .optional()
        .isLength({ max: 100 }).withMessage('La description no puede exceder los 100 caracteres.')
        .isString().withMessage('La description solo debe ser un String.'),
    body('code')
        .notEmpty().withMessage('El code es obligatorio.')
        .isLength({ max: 50 }).withMessage('El code no puede exceder los 50 caracteres.')
        .isString().withMessage('El code solo debe ser un String.'),
    body('price')
        .notEmpty().withMessage('El price es obligatorio')
        .isNumeric().withMessage('El price solo debe ser un Numeric.'),
    body('status')
        .optional()
        .isBoolean().withMessage('El status solo debe ser true o false.'),
    body('stock')
        .notEmpty().withMessage('El stock es obligatorio')
        .isNumeric().withMessage('El stock solo debe ser un Numeric.'),
    body('category')
        .notEmpty().withMessage('El category es obligatorio')
        .isLength({max: 50}).withMessage('El category no puede exceder los 50 caracteres')
        .isString().withMessage('El category solo debe ser un String.'),
    body('thumbnails')
        .notEmpty().withMessage('El thumbnails es obligatorio')
        .isString().withMessage('El thumbnails solo debe ser un String.'),
]



const validateProductUpdate = [
    body('title')
        .isLength({max: 50}).withMessage('El title no puede exceder los 50 caracteres')
        .isString().withMessage('El title solo debe ser un String.'),
    body('autor')
        .isLength({max: 50}).withMessage('El autor no puede exceder los 50 caracteres')
        .isString().withMessage('El autor solo debe ser un String.'),
    body('description')
        .optional()
        .isLength({ max: 100 }).withMessage('La description no puede exceder los 100 caracteres.')
        .isString().withMessage('La description solo debe ser un String.'),
    body('code')
        .isLength({ max: 50 }).withMessage('El code no puede exceder los 50 caracteres.')
        .isString().withMessage('El code solo debe ser un String.'),
    body('price')
        .isNumeric().withMessage('El price solo debe ser un Numeric.'),
    body('status')
        .optional()
        .isBoolean().withMessage('El status solo debe ser true o false.'),
    body('stock')
        .isNumeric().withMessage('El stock solo debe ser un Numeric.'),
    body('category')
        .isLength({max: 50}).withMessage('El category no puede exceder los 50 caracteres')
        .isString().withMessage('El category solo debe ser un String.'),
    body('thumbnails')
        .isString().withMessage('El thumbnails solo debe ser un String.'),
]



const validateProductId = [
    param('pid')
        .exists().withMessage('El ID Product es obligatorio.')
        .custom(value => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID Product no válido.')
            }
            return true
        })
]



const handleValidationProductErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    next()
}




export{
    validateProduct,
    validateProductUpdate,
    validateProductId,
    handleValidationProductErrors
}
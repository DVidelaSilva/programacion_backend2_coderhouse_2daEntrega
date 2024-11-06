import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";


const validateCart = [

    body('quantity')
        .notEmpty().withMessage('La Cantidad es obligatorio')
        .isInt({ gt: 0 }).withMessage('La Cantidad debe ser un número entero mayor a cero') // Verifica que sea un número entero mayor que cero
]

const validateCartUpdate = [
   
    body('quantity')
        .isInt({ gt: 0 }).withMessage('La Cantidad debe ser un número entero mayor a cero') // Verifica que sea un número entero mayor que cero
]

// Nueva validación para el ID
const validateCartId = [
    param('cid')
        .exists().withMessage('El ID User es obligatorio.')
        .custom(value => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID User no válido.');
            }
            return true;
        })
]


const handleValidationCartErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    next()
}


export{
    validateCart,
    validateCartUpdate,
    validateCartId,
    handleValidationCartErrors
}
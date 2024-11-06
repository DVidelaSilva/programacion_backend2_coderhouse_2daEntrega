import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";


const validateRegister = [
    body('first_name')
        .notEmpty().withMessage('El first_name es obligatorio')
        .isLength({max: 20}).withMessage('El first_name no puede exceder los 20 caracteres')
        .isString().withMessage('El first_name solo debe ser un String.'),
    body('last_name')
        .notEmpty().withMessage('El last_name es obligatorio.')
        .isLength({ max: 20 }).withMessage('El last_name no puede exceder los 20 caracteres.')
        .isString().withMessage('El last_name solo debe ser un String.'),
    body('email')
        .isEmail().withMessage('El email electrónico debe ser válido.')
        .isLength({ max: 50 }).withMessage('El email no puede exceder los 50 caracteres.')
        .notEmpty().withMessage('El email electrónico es obligatorio.'),
    body('age')
        .optional()
        .isNumeric().withMessage('El age solo debe ser un Numeric.'),
    body('password')
        .notEmpty().withMessage('El password es obligatoria.')
        .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres.')
        .isString().withMessage('El password solo debe ser un String.'),

    
]


const validateLogin = [
    body('email')
        .isEmail().withMessage('El email electrónico debe ser válido.')
        .notEmpty().withMessage('El email electrónico es obligatorio.'),
    body('password')
        .notEmpty().withMessage('El password es obligatoria.')
        .isString().withMessage('El password solo debe ser un String.'),
    
]


const handleValidationSessionErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    next()
}


export{
    validateRegister,
    validateLogin,
    handleValidationSessionErrors
}
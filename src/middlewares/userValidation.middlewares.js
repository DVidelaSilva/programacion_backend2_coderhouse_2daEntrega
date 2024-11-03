import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";


const validateUser = [
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
        .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres.'),
    body('role')
        .optional()
        .isIn(['user', 'user-premium', 'admin']).withMessage('El role debe ser uno de los siguientes: user, user-premium, admin.')
    
]

const validateUserUpdate = [
    body('first_name')
        .isLength({max: 20}).withMessage('El first_name no puede exceder los 20 caracteres')
        .isString().withMessage('El first_name solo debe ser un String.'),
    body('last_name')
        .isLength({ max: 20 }).withMessage('El last_name no puede exceder los 20 caracteres.')
        .isString().withMessage('El last_name solo debe ser un String.'),
    body('email')
        .isEmail().withMessage('El email electrónico debe ser válido.')
        .isLength({ max: 50 }).withMessage('El email no puede exceder los 50 caracteres.'),
    body('age')
        .optional()
        .isNumeric().withMessage('El age solo debe ser un Numeric.'),
    body('password')
        .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres.'),
    body('role')
        .optional()
        .isIn(['user', 'user-premium', 'admin']).withMessage('El role debe ser uno de los siguientes: user, user-premium, admin.')
    
]

// Nueva validación para el ID
const validateUserId = [
    param('uid')
        .exists().withMessage('El ID User es obligatorio.')
        .custom(value => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID User no válido.');
            }
            return true;
        })
]


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    next()
}


export{
    validateUser,
    validateUserId,
    validateUserUpdate,
    handleValidationErrors
}
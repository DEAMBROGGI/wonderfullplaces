const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        fullName: joi.string().max(20).min(3).trim().pattern(/(?=.*[A-Z])(?=.*[a-z])/).required().messages({
            'string.min': 'fullName / El NOMBRE debe contener mas de 3 caracteres',
            'string.max': "fullName / El nombre debe contener como maximo 20 caracteres",
            'string.pattern.base': "Por favor esciba su nombre con mayusculas y munisculas"
        }),

        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email': 'Formato incorrecto de email'
        }),
        password: joi.string().max(30).min(6).pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/).required().messages({
            "string.pattern.base": "La contraseña debe contener minimo una mayuscula, una minuscula y un numero",
            "string.min": "La contraseña debe contener minimo 6 caracteres alfanumericos",
            "string.max": "La contraseña no debe exceder de 30 caracteres alfanumericos"
        }),
        from: joi.string(),
        pais: joi.string()
    })

    const validation = schema.validate(req.body.userData, { abortEarly: false })

    if (validation.error) {

        return res.json({
            success: false,
            from: "validator",
            message: validation.error.details,
        })
    }
    next()
}

module.exports = validator
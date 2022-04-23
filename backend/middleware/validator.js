const { check, validationResult } = require("express-validator");

exports.validateUser  = [check("email").normalizeEmail().isEmail().withMessage("Email is Invalid"),
    check("password").trim().not().isEmpty().withMessage("Password is Invalid").isLength({min: 8, max: 20})
    .withMessage("Password should be min 8 and max 20 characters.")
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array()
    if(!error.length) {
        return next()
    }
    res.status(400).json({success: false, error: error[0].msg})
}
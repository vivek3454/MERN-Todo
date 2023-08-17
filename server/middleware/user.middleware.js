const JWT = require('jsonwebtoken');
const userModel = require("../model/user.model");
const emailValidator = require('email-validator');

const loginDataValidate = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is mandatory'
        });
    }
    req.user = { email, password };
    next();
}
const signupDataValidate = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        });
    }

    const validEmail = emailValidator.validate(email);

    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }
    next();
}
const jwtAuth = (req, res, next) => {
    const token = req.body.token;
    // const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            succes: false,
            message: 'Not authorized'
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = { id: payload.id, email: payload.email };
        next();
    } catch (error) {
        return res.status(400).json({
            succes: false,
            message: 'Not authorized'
        });
    }
}

module.exports = { signupDataValidate, loginDataValidate, jwtAuth };

const joi = require('joi');

const registerSchema = joi.object({
    name:joi.string().trim().min(3).max(10).required(),
    email:joi.string().trim().email().required(),
    password:joi.string().min(6).max(13).required()
})

const loginSchema = joi.object({

    email: joi.string()
        .trim()
        .email()
        .required(),

    password: joi.string()
        .required()

});
const createJobSchema = joi.object({

    title: joi.string()
        .trim()
        .required(),

    company: joi.string()
        .trim()
        .required(),

    location: joi.string()
        .trim()
        .required(),

    salary: joi.number()
        .positive()
        .required(),

    description: joi.string()
        .trim()
        .required()

});

module.exports = {registerSchema, loginSchema, createJobSchema}
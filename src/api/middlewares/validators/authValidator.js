import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const login = Joi.string().required();
const password = Joi.string().required().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'));
const refreshToken = Joi.string().required();

const signinBodySchema = Joi.object({
    login,
    password
});

const refreshBodySchema = Joi.object({
    refreshToken
});

const validator = createValidator({ passError: true });

export const signinValidator = validator.body(signinBodySchema);
export const refreshValidator = validator.body(refreshBodySchema);

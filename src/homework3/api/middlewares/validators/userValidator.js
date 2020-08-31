import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const login = Joi.string().required();
const password = Joi.string().required().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'));
const age = Joi.number().required().min(4).max(130);
const isDeleted = Joi.bool().required();
const loginSubstring = Joi.string().alphanum().required();
const limit = Joi.number().required().min(1);

const userCreateBodySchema = Joi.object({
    login,
    password,
    age
});

const userUpdateBodySchema = Joi.object({
    login,
    password,
    age,
    isDeleted
});

const userSuggestQuerySchema = Joi.object({
    loginSubstring,
    limit
});

const validator = createValidator({ passError: true });

export const userCreateValidator = validator.body(userCreateBodySchema);
export const userUpdateValidator = validator.body(userUpdateBodySchema);
export const userSuggestValidator = validator.query(userSuggestQuerySchema);

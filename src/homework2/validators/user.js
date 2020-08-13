import Joi from '@hapi/joi';

const id = Joi.string().required();
const login = Joi.string().required();
const password = Joi.string().required().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'));
const age = Joi.number().required().min(4).max(130);
const isDeleted = Joi.bool().required();
const loginSubstring = Joi.string().alphanum().required();
const limit = Joi.number().required().min(1);

export const userCreateBodySchema = Joi.object({
    login,
    password,
    age
});

export const userUpdateBodySchema = Joi.object({
    id,
    login,
    password,
    age,
    isDeleted
});

export const userSuggestQuerySchema = Joi.object({
    loginSubstring,
    limit
});

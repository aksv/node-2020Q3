import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const userIds = Joi.array()
    .items(
        Joi.string().uuid().required()
    )
    .required();

const addToGroupBodySchema = Joi.object({
    userIds
});


const validator = createValidator({ passError: true });

export const addToGroupValidator = validator.body(addToGroupBodySchema);

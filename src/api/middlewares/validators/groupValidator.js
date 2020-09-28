import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const name = Joi.string().required();
const permissions = Joi.array()
    .items(
        Joi.string()
            .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
            .required()
    )
    .required();

const groupCreateUpdateBodySchema = Joi.object({
    name,
    permissions
});


const validator = createValidator({ passError: true });

export const groupCreateUpdateValidator = validator.body(groupCreateUpdateBodySchema);

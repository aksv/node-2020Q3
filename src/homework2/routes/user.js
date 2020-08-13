import express from 'express';
import { createValidator } from 'express-joi-validation';

import {
    create,
    getById,
    update,
    deleteById,
    getAutoSuggest
} from '../controllers/user';
import {
    userCreateBodySchema,
    userUpdateBodySchema,
    userSuggestQuerySchema
} from '../validators/user';

const validator = createValidator({ passError: true });

const userRouter = express.Router();

userRouter.route('/:id')
    .get(getById)
    .put(validator.body(userUpdateBodySchema), update)
    .delete(deleteById);

userRouter.route('/')
    .get(validator.query(userSuggestQuerySchema), getAutoSuggest)
    .post(validator.body(userCreateBodySchema), create);

export default userRouter;

import { Router } from 'express';
import { UserController } from '../controllers';
import config from '../../config';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    userController: UserController,
    userValidators
) => {
    const userRouter = Router();
    app.use(`${config.api.prefix}/users`, userRouter);

    userRouter.get(
        '/:id',
        asyncErrorHandler(userController.getUserById)
    );

    userRouter.put(
        '/:id',
        userValidators.onUpdate,
        asyncErrorHandler(userController.updateUser)
    );

    userRouter.delete(
        '/:id',
        asyncErrorHandler(userController.deleteUser)
    );

    userRouter.get(
        '/',
        userValidators.onSuggest,
        asyncErrorHandler(userController.getAutoSuggestUsers)
    );

    userRouter.post(
        '/',
        userValidators.onCreate,
        asyncErrorHandler(userController.createUser)
    );
};

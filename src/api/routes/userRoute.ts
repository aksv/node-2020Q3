import { Router } from 'express';
import { UserController } from '../controllers';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    userController: UserController,
    userValidators,
    authMiddleware
) => {
    const userRouter = Router();
    app.use(`${process.env.API_PREFIX}/users`, userRouter);

    userRouter.get(
        '/:id',
        authMiddleware,
        asyncErrorHandler(userController.getUserById)
    );

    userRouter.put(
        '/:id',
        userValidators.onUpdate,
        authMiddleware,
        asyncErrorHandler(userController.updateUser)
    );

    userRouter.delete(
        '/:id',
        authMiddleware,
        asyncErrorHandler(userController.deleteUser)
    );

    userRouter.get(
        '/',
        userValidators.onSuggest,
        authMiddleware,
        asyncErrorHandler(userController.getAutoSuggestUsers)
    );

    userRouter.post(
        '/',
        userValidators.onCreate,
        authMiddleware,
        asyncErrorHandler(userController.createUser)
    );
};

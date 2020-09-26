import { Router } from 'express';
import { UserController } from '../controllers'
import config from '../../config';

export default (app, userController: UserController, userValidators) => {
    const userRouter = Router();
    app.use(`${config.api.prefix}/users`, userRouter);

    userRouter.get('/:id', userController.getUserById);

    userRouter.put(
        '/:id',
        userValidators.onUpdate,
        userController.updateUser
    );

    userRouter.delete('/:id', userController.deleteUser);

    userRouter.get(
        '/',
        userValidators.onSuggest,
        userController.getAutoSuggestUsers
    );

    userRouter.post(
        '/',
        userValidators.onCreate,
        userController.createUser
    );
};

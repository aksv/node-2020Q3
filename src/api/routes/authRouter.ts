import { Router } from 'express';
import { AuthController } from '../controllers';
import config from '../../config';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    authController: AuthController,
    authValidators
) => {
    const authRouter = Router();
    app.use(`${config.api.prefix}/auth`, authRouter);

    authRouter.post(
        '/signin',
        authValidators.onSignin,
        asyncErrorHandler(authController.signIn)
    );

    authRouter.post(
        '/refresh',
        authValidators.onRefresh,
        asyncErrorHandler(authController.refresh)
    )
};

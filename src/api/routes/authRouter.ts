import { Router } from 'express';
import { AuthController } from '../controllers';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    authController: AuthController,
    authValidators
) => {
    const authRouter = Router();
    app.use(`${process.env.API_PREFIX}/auth`, authRouter);

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

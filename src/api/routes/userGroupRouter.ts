import { Router } from 'express';
import { UserGroupController } from '../controllers';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    userGroupController: UserGroupController,
    userGroupValidators,
    authMiddleware
) => {
    const groupRouter = Router();
    app.use(`${process.env.API_PREFIX}/group`, groupRouter);

    groupRouter.post(
        '/:id/users',
        userGroupValidators.onAddToGroup,
        authMiddleware,
        asyncErrorHandler(userGroupController.addUsersToGroup)
    );
};

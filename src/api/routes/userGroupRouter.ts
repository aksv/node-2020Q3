import { Router } from 'express';
import { UserGroupController } from '../controllers';
import config from '../../config';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    userGroupController: UserGroupController,
    userGroupValidators
) => {
    const groupRouter = Router();
    app.use(`${config.api.prefix}/group`, groupRouter);

    groupRouter.post(
        '/:id/users',
        userGroupValidators.onAddToGroup,
        asyncErrorHandler(userGroupController.addUsersToGroup)
    );
};

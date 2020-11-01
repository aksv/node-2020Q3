import { Router } from 'express';
import { GroupController } from '../controllers';
import config from '../../config';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    groupController: GroupController,
    groupValidators,
    authMiddleware
) => {
    const groupRouter = Router();
    app.use(`${config.api.prefix}/groups`, groupRouter);

    groupRouter.get(
        '/',
        authMiddleware,
        asyncErrorHandler(groupController.getGroups)
    );

    groupRouter.get(
        '/:id',
        authMiddleware,
        asyncErrorHandler(groupController.getGroupById)
    );

    groupRouter.post(
        '/',
        groupValidators.onCreateUpdate,
        authMiddleware,
        asyncErrorHandler(groupController.createGroup)
    );

    groupRouter.put(
        '/:id',
        groupValidators.onCreateUpdate,
        authMiddleware,
        asyncErrorHandler(groupController.updateGroup)
    );

    groupRouter.delete(
        '/:id',
        authMiddleware,
        asyncErrorHandler(groupController.deleteGroup)
    );
};

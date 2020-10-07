import { Router } from 'express';
import { GroupController } from '../controllers';
import config from '../../config';
import { asyncErrorHandler } from '../../utils';

export default (
    app,
    groupController: GroupController,
    groupValidators
) => {
    const groupRouter = Router();
    app.use(`${config.api.prefix}/groups`, groupRouter);

    groupRouter.get(
        '/',
        asyncErrorHandler(groupController.getGroups)
    );

    groupRouter.get(
        '/:id',
        asyncErrorHandler(groupController.getGroupById)
    );

    groupRouter.post(
        '/',
        groupValidators.onCreateUpdate,
        asyncErrorHandler(groupController.createGroup)
    );

    groupRouter.put(
        '/:id',
        groupValidators.onCreateUpdate,
        asyncErrorHandler(groupController.updateGroup)
    );

    groupRouter.delete(
        '/:id',
        asyncErrorHandler(groupController.deleteGroup)
    );
};

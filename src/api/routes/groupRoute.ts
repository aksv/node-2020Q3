import { Router } from 'express';
import { GroupController } from '../controllers'
import config from '../../config';

export default (app, groupController: GroupController, groupValidators) => {
    const groupRouter = Router();
    app.use(`${config.api.prefix}/groups`, groupRouter);

    groupRouter.get(
        '/',
        groupController.getGroups
    );

    groupRouter.get(
        '/:id',
        groupController.getGroupById
    );

    groupRouter.post(
        '/',
        groupValidators.onCreateUpdate,
        groupController.createGroup
    );

    groupRouter.put(
        '/:id',
        groupValidators.onCreateUpdate,
        groupController.updateGroup
    );

    groupRouter.delete(
        '/:id',
        groupController.deleteGroup
    );
};

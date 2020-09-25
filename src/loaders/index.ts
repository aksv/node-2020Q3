import { Express } from 'express';

import dbLoader from './db';
import express from './express';
import { loadUser } from '../models';
import { UserRepository, UserMapper } from '../data-access';
import { UserService } from '../services';
import { userValidators } from '../api/middlewares/validators';
import { userRoute } from '../api/routes';
import { UserController } from '../api/controllers';
import { validationErrorHandler } from '../api/middlewares/errors';

export default async (app: Express) => {
    const db = await dbLoader();
    loadUser(db);
    const userRepository = new UserRepository(new UserMapper());
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    express(app);
    userRoute(app, userController, userValidators);
    app.use(validationErrorHandler);
};

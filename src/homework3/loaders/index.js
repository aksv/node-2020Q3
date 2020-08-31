import dbLoader from './db';
import express from './express';
import { userModel } from '../models';
import { UserRepository, UserMapper } from '../data-access';
import { UserService } from '../services';
import { userValidators } from '../api/middlewares/validators';
import { userRoute } from '../api/routes';
import { validationErrorHandler } from '../api/middlewares/errors';

export default async ({ app }) => {
    const db = await dbLoader();
    const User = userModel(db);
    const userRepository = new UserRepository(User, new UserMapper());
    const userService = new UserService(userRepository);
    express({ app });
    userRoute({ app, userService, userValidators });
    app.use(validationErrorHandler);
};

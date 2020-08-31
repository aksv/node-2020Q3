import { Router } from 'express';
import config from '../../config';

function sendNotFound(res, id) {
    res.status(404);
    res.json({ error: `User with id ${id} is not found` });
}

function sendError(res, error) {
    let errorMesage;
    if (error?.name === 'SequelizeUniqueConstraintError') {
        res.status(409);
        errorMesage = error.errors.map(err => ({ error: err.message }));
    } else {
        res.status(500);
        errorMesage = [{ error: 'Unexpected error' }];
    }
    res.json(errorMesage);
}

export default ({ app, userService, userValidators }) => {
    const userRouter = Router();
    app.use(`${config.api.prefix}/users`, userRouter);

    userRouter.get('/:id', async (req, res) => {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        if (!user) {
            sendNotFound(res, id);
        } else {
            res.json(user);
        }
    });

    userRouter.put(
        '/:id',
        userValidators.onUpdate,
        async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const updated = await userService.updateUser(id, user);
            if (!updated) {
                sendNotFound(res, id);
            } else {
                res.json(user);
            }
        }
    );

    userRouter.delete('/:id', async (req, res) => {
        const id = req.params.id;
        const isDeleted = await userService.deleteUser(id);
        if (!isDeleted) {
            sendNotFound(res, id);
        } else {
            res.status(204);
            res.end();
        }
    });

    userRouter.get(
        '/',
        userValidators.onSuggest,
        async (req, res) => {
            const { loginSubstring, limit } = req.query;
            const users = await userService.getAutoSuggest(
                loginSubstring,
                Number(limit)
            );
            res.json(users);
        }
    );

    userRouter.post(
        '/',
        userValidators.onCreate,
        async (req, res) => {
            const user = req.body;
            try {
                const created = await userService.createUser(user);
                res.json(created);
            } catch (err) {
                sendError(res, err);
            }
        }
    );
};

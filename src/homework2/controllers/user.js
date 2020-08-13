import {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAutoSuggestUsers,
    findUserWithSameLogin
} from '../models/user';

function sendNotFound(res, id) {
    res.status(404);
    res.json({ error: `User with id ${id} is not found` });
}

function sendConflict(res, field) {
    res.status(409);
    res.json({ error: `Duplicated field: ${field}` });
}

function isLoginUnique(login, id = null) {
    return !findUserWithSameLogin(login, id);
}

function getById(req, res) {
    const id = req.params.id;
    const user = getUserById(id);
    if (!user) {
        sendNotFound(res, id);
    } else {
        res.json(user);
    }
}

function update(req, res) {
    const id = req.params.id;
    const user = {
        ...req.body,
        id
    };
    if (!isLoginUnique(user.login, user.id)) {
        sendConflict(res, 'login');
    }
    const updated = updateUser(user);
    if (!updated) {
        sendNotFound(res, user.id);
    } else {
        res.json(user);
    }
}

function deleteById(req, res) {
    const id = req.params.id;
    const isDeleted = deleteUser(id);
    if (!isDeleted) {
        sendNotFound(res, id);
    } else {
        res.status(204);
        res.end();
    }
}

function create(req, res) {
    const user = req.body;
    if (!isLoginUnique(user.login)) {
        sendConflict(res, 'login');
    } else {
        const created = createUser(user);
        res.json(created);
    }
}

function getAutoSuggest(req, res) {
    const { loginSubstring, limit } = req.query;
    res.json(getAutoSuggestUsers(loginSubstring, Number(limit)));
}


export {
    create,
    getById,
    update,
    deleteById,
    getAutoSuggest
};

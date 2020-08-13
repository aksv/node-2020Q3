import { createUUID } from '../util/uuid';

const users = {};

function createUser(user) {
    const id = createUUID();
    users[id] = {
        id,
        ...user,
        isDeleted: false
    };
    return users[id];
}

function getUserById(id) {
    return users[id];
}

function updateUser(user) {
    if (!users.hasOwnProperty(user.id)) {
        return undefined;
    }
    users[user.id] = user;
    return user;
}

function deleteUser(id) {
    if (!users.hasOwnProperty(id)) {
        return false;
    }
    users[id].isDeleted = true;
    return true;
}

function compare(first, second) {
    if (first.login < second.login) {
        return -1;
    }
    if (first.login > second.login) {
        return 1;
    }
    return 0;
}

function getAutoSuggestUsers(loginSubstr, limit) {
    const filtered = Object.entries(users)
        // eslint-disable-next-line
        .map(([_, value]) => value)
        .filter(user => !user.isDeleted)
        .filter(user => user.login.includes(loginSubstr));
    filtered.sort(compare);
    return filtered.slice(0, limit);
}

function findUserWithSameLogin(login, id) {
    return Object.entries(users)
        // eslint-disable-next-line
        .find(([_, user]) => (!id || user.id !== id) && user.login === login);
}

export {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAutoSuggestUsers,
    findUserWithSameLogin
};

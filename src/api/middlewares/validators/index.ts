import {
    userCreateValidator,
    userUpdateValidator,
    userSuggestValidator
} from './userValidator';

import {
    groupCreateUpdateValidator
} from './groupValidator';

import {
    addToGroupValidator
} from './userGroupValidator';

import {
    signinValidator,
    refreshValidator
} from './authValidator';

const userValidators = {
    onCreate: userCreateValidator,
    onUpdate: userUpdateValidator,
    onSuggest: userSuggestValidator
};

const groupValidators = {
    onCreateUpdate: groupCreateUpdateValidator
}

const userGroupValidators = {
    onAddToGroup: addToGroupValidator
}

const authValidators = {
    onSignin: signinValidator,
    onRefresh: refreshValidator
}

export {
    userValidators,
    groupValidators,
    userGroupValidators,
    authValidators
};

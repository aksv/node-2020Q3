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

export { userValidators, groupValidators, userGroupValidators };

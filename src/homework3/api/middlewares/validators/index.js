import {
    userCreateValidator,
    userUpdateValidator,
    userSuggestValidator
} from './userValidator';

const userValidators = {
    onCreate: userCreateValidator,
    onUpdate: userUpdateValidator,
    onSuggest: userSuggestValidator
};

export { userValidators };

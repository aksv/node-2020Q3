import { UserRepository } from '../data-access';
import { UserAutoSuggest, User } from '../models';

class UserService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    createUser(user: User) {
        return this.userRepository.createUser(user);
    }

    updateUser(id: string, user: User) {
        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    getAutoSuggest(userSuggest: UserAutoSuggest): Promise<Array<User>> {
        return this.userRepository.getAutoSuggest(userSuggest);
    }
}

export default UserService;

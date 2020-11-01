import { UserRepository } from '../data-access';
import { UserAutoSuggest, User, UserInfo } from '../models';
import { hashPassword } from '../utils';

class UserService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(user: User) {
        const password: String = await hashPassword(user.password);
        const userToCreate: User = { ...user, password: user.password };
        return this.userRepository.createUser(userToCreate);
    }

    async updateUser(id: string, user: User) {
        const password: String = await hashPassword(user.password);
        const userToUpdate: User = { ...user, password: user.password}
        return this.userRepository.updateUser(id, userToUpdate);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }

    getUserById(id: string): Promise<UserInfo> {
        return this.userRepository.getUserById(id);
    }

    getAutoSuggest(userSuggest: UserAutoSuggest): Promise<Array<User>> {
        return this.userRepository.getAutoSuggest(userSuggest);
    }
}

export default UserService;

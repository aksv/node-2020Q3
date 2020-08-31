class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    createUser(user) {
        return this.userRepository.createUser(user);
    }

    updateUser(id, user) {
        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }

    getUserById(id) {
        return this.userRepository.getUserById(id);
    }

    getAutoSuggest(loginSubstr, limit) {
        return this.userRepository.getAutoSuggest(loginSubstr, limit);
    }
}

export default UserService;

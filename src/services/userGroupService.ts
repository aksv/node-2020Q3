import { UserGroup } from '../models';
import { UserGroupRepository } from '../data-access';

export default class UserGroupService {
    private userGroupRepository: UserGroupRepository;

    constructor(userGroupRepository: UserGroupRepository) {
        this.userGroupRepository = userGroupRepository;
    }

    async addUsersToGroup(groupId: string, userIds: Array<string>): Promise<Array<UserGroup>> {
        return this.userGroupRepository.addUsersToGroup(groupId, userIds);
    }
}
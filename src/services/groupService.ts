import { GroupRepository } from '../data-access';
import { Group } from '../models';

class GroupService {
    groupRepository: GroupRepository;

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository;
    }

    createGroup(group: Group): Promise<Group> {
        return this.groupRepository.createGroup(group);
    }

    getGroups(): Promise<Array<Group>> {
        return this.groupRepository.getGroups();
    }

    getGroupById(id: string): Promise<Group> {
        return this.groupRepository.getGroupById(id);
    }

    updateGroup(id: string, group: Group): Promise<Group> {
        return this.groupRepository.updateGroup(id, group);
    }

    deleteGroup(id: string): Promise<number> {
        return this.groupRepository.deleteGroup(id);
    }
}

export default GroupService;
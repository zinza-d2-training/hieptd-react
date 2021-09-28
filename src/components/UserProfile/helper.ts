import { ProjectStatus, TaskStatus, User } from 'utils/types';
//handle comvert status, member
export const convertTaskStatus = (status: TaskStatus): string => {
   switch (status) {
      case 1:
         return TaskStatus[1];
      case 2:
         return TaskStatus[2];
      case 3:
         return TaskStatus[3];
      case 4:
         return TaskStatus[4];
      case 5:
         return TaskStatus[5];
      case 6:
         return TaskStatus[6];
      default:
         return '';
   }
};
export const convertProjectStatus = (status: ProjectStatus): string => {
   switch (status) {
      case 1:
         return ProjectStatus[1];
      case 2:
         return ProjectStatus[2];
      case 3:
         return ProjectStatus[3];
      case 4:
         return ProjectStatus[4];

      default:
         return '';
   }
};

export const convertToUserInfo = (members: User[]) => {};

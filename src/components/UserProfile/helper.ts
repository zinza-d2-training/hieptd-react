import { USERS } from 'fakeData/users';
//handle comvert status, member
export const convertTaskStatus = (status: number): string => {
   switch (status) {
      case 1:
         return 'Requesting';
      case 2:
         return 'Unscheduled';
      case 3:
         return 'Doing';
      case 4:
         return 'Reviewing';
      case 5:
         return 'Completed';
      case 6:
         return 'Cancelled';

      default:
         return '';
   }
};
export const convertProjectStatus = (status: number): string => {
   switch (status) {
      case 1:
         return 'Pending';
      case 2:
         return 'InProgress';
      case 3:
         return 'Completed';
      case 4:
         return 'Cancelled';

      default:
         return '';
   }
};

export const convertToUserInfo = (
   numbers: number[]
): { id: number; name: string }[] => {
   const result: { id: number; name: string }[] = [];
   USERS.forEach((user) => {
      if (numbers.includes(user.id)) {
         result.push({
            name: user.username,
            id: user.id,
         });
      }
   });
   return result;
};

import { TaskStatus } from 'utils/types';

export const textFromTaskStatus = (status: TaskStatus): string => {
   switch (status) {
      case TaskStatus.Cancelled:
         return 'Cancelled';
      case TaskStatus.Completed:
         return 'Completed';
      case TaskStatus.Doing:
         return 'Doing';
      case TaskStatus.Reviewing:
         return 'Reviewing';
      case TaskStatus.Unscheduled:
         return 'Unscheduled';
      default:
         return '';
   }
};

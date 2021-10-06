import { getUser } from 'utils/auth';
import { nonAccentVietnameses } from 'utils/convert';
import { Task } from 'utils/types';
import { TaskFilterType } from '../ProjectTasks';

export const useGetTaskListByFilter = (
   filter: TaskFilterType,
   tasks: Task[]
) => {
   const currentUser = getUser();
   const filterKeys = Object.keys(filter);
   let tasksFilter = tasks.filter((task) => {
      return filterKeys.every((eachKey) => {
         if (!filter[eachKey].length && typeof filter[eachKey] !== 'boolean') {
            return true;
         }
         switch (eachKey) {
            case 'search':
               const searchWord: string = nonAccentVietnameses(filter[eachKey]);
               return (
                  nonAccentVietnameses(task.title).includes(
                     nonAccentVietnameses(searchWord)
                  ) ||
                  nonAccentVietnameses(task.notes!).includes(
                     nonAccentVietnameses(searchWord)
                  )
               );
            case 'createBy':
               console.log('ss', task.requestByUser.id === currentUser?.id);
               return (
                  (task.requestByUser.id === currentUser?.id) ===
                  filter[eachKey]
               );
            case 'assignTo':
               return (task.assign?.id === currentUser?.id) === filter[eachKey];
            case 'status':
               return task[eachKey]
                  .toString()
                  .toLowerCase()
                  .includes(filter[eachKey]);
            case 'priority':
               return task[eachKey]
                  .toString()
                  .toLowerCase()
                  .includes(filter[eachKey]);
            default:
               return true;
         }
      });
   });
   return { tasksFilter };
};

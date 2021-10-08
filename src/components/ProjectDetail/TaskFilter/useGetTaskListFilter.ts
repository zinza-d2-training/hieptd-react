import { getUser } from 'utils/auth';
import { nonAccentVietnameses } from 'utils/convert';
import { Task } from 'utils/types';
import { TasksFilter } from '../ProjectTasks';

export const useGetTaskListByFilter = (filter: TasksFilter, tasks: Task[]) => {
   const currentUser = getUser();
   const filterKeys = Object.keys(filter);
   let tasksFilter = tasks.filter((task) => {
      return filterKeys.every((eachKey) => {
         if (filter[eachKey] === null) {
            return true;
         }
         if (
            filter[eachKey] &&
            !filter[eachKey].length &&
            typeof filter[eachKey] !== 'boolean'
         ) {
            return true;
         }
         // if (filter[eachKey].length === 0 && Array.isArray(filter[eachKey])) {
         //    return true;
         // }

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
               return (
                  (task.requestByUser.id === currentUser?.id) ===
                  filter[eachKey]
               );
            case 'assignTo':
               return (task.assign?.id === currentUser?.id) === filter[eachKey];
            case 'statuses':
               return filter['statuses'].includes(task.status);
            case 'priority':
               return filter[eachKey] === task[eachKey];
            default:
               return true;
         }
      });
   });
   return { tasksFilter };
};

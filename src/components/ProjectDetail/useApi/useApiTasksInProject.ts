import { useCallback, useState } from 'react';
import projectService from 'services/project';
import taskService, { TaskStatusAndSequence } from 'services/task';
import { Response, Task } from 'utils/types';
import { TasksFilter } from '../ProjectTasks';
import { FormValue as UpdateTask } from '../TaskListBoard/TaskDrawer';

export const useApiTask = () => {
   const [loading, setLoading] = useState<boolean>(false);

   const getTasks = useCallback(
      async (
         projectId: number,
         filterData: TasksFilter
      ): Promise<Response<Task[]>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await projectService.getTasksInProject(
               projectId,
               filterData
            );
            return res;
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
         }
      },
      []
   );
   // update task in project
   const updateTask = useCallback(
      async (taskId: number, task: UpdateTask): Promise<Response<Task>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await taskService.updateTask(taskId, task);
            return res;
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
         }
      },
      []
   );
   // update task status
   const updateTaskStatusAndSequence = useCallback(
      async (
         taskId: number,
         updateTask: TaskStatusAndSequence
      ): Promise<Response<Task>> => {
         setLoading(true);
         try {
            setLoading(false);
            const res = await taskService.updateTaskStatusAndSequence(
               taskId,
               updateTask
            );
            return res;
         } catch (e: any) {
            setLoading(false);
            throw e.response.data.message;
         }
      },
      []
   );

   return { loading, getTasks, updateTask, updateTaskStatusAndSequence };
};

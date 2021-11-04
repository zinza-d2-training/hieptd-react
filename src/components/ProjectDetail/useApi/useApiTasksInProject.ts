import { useState, useCallback } from 'react';
import projectService from 'services/project';
import { Task, Response } from 'utils/types';
import { TasksFilter } from '../ProjectTasks';

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
   return { loading, getTasks };
};

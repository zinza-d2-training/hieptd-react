import { useCallback, useState } from 'react';
import taskService from 'services/task';
import { CreateTask, Response, Task } from 'utils/types';

export const useApiCreateTask = () => {
   const [loading, setLoading] = useState<boolean>(false);

   const createTask = useCallback(
      async (task: CreateTask): Promise<Response<Task>> => {
         setLoading(true);
         try {
            setLoading(false);
            const response = await taskService.createTask(task);
            return response;
         } catch (e: any) {
            setLoading(false);

            throw e.response.data.message;
         }
      },
      []
   );
   return { loading, createTask };
};

import axiosClient from 'utils/axios';
import { CreateTask, Task } from 'utils/types';
import { Response } from 'utils/types';

const taskService = {
   //create project
   createTask: async (task: CreateTask): Promise<Response<Task>> => {
      return await axiosClient.post('/tasks', task);
   },
};
export default taskService;

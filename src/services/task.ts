import axiosClient from 'utils/axios';
import { CreateTask, Task } from 'utils/types';
import { Response } from 'utils/types';
import { TasksFilter } from 'components/ProjectDetail/ProjectTasks';

const taskService = {
   //create project
   createTask: async (task: CreateTask): Promise<Response<Task>> => {
      return await axiosClient.post('/tasks', task);
   },
   // get tasks
   getTasks: async (filterData?: TasksFilter): Promise<Response<Task[]>> => {
      let queries = `&`;
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }

      return await axiosClient.get(`/tasks?${queries}`);
   },
};
export default taskService;

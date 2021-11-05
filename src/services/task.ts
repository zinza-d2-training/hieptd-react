import axiosClient from 'utils/axios';
import { CreateTask, Task, TaskStatus } from 'utils/types';
import { Response } from 'utils/types';
import { TasksFilter } from 'components/ProjectDetail/ProjectTasks';
import { FormValue as UpdateTask } from 'components/ProjectDetail/TaskListBoard/TaskDrawer';

export type TaskStatusAndSequence = {
   status: TaskStatus;
   sequence: number;
};

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
   // update task with id
   updateTask: async (
      id: number,
      task: UpdateTask
   ): Promise<Response<Task>> => {
      return await axiosClient.put(`/tasks/${id}`, task);
   },
   // update task status with id
   updateTaskStatusAndSequence: async (
      id: number,
      updateTask: TaskStatusAndSequence
   ): Promise<Response<Task>> => {
      return await axiosClient.put(`/tasks/${id}/status`, updateTask);
   },
};
export default taskService;

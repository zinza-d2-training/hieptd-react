import { FilterType } from 'components/ListProjects/types';
import { TasksFilter } from 'components/ProjectDetail/ProjectTasks';
import axiosClient from 'utils/axios';
import { CreateProject, Project, Task } from 'utils/types';
import { Response } from 'utils/types';

const projectService = {
   getProjects: async (
      page?: number,
      limit?: number,
      filterData?: FilterType
   ): Promise<Response<Project[]>> => {
      let queries = `page=${page}&limit=${limit}&`;
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }

      return await axiosClient.get(`/projects?${queries}`);
   },
   //create project
   createProject: async (
      project: CreateProject
   ): Promise<Response<Project>> => {
      return await axiosClient.post('/projects', project);
   },
   // get project by id
   getProjectById: async (id: number): Promise<Response<Project>> => {
      return await axiosClient.get(`/projects/${id}`);
   },
   // get tasks in project
   getTasksInProject: async (
      id: number,
      filterData?: TasksFilter
   ): Promise<Response<Task[]>> => {
      let queries = '';
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }

      return await axiosClient.get(`/projects/${id}/tasks?${queries}`);
   },
   // edit project by id
   editProject: async (
      id: number,
      project: Partial<Project>
   ): Promise<Response<Project>> => {
      return await axiosClient.put(`/projects/${id}`, project);
   },
};
export default projectService;

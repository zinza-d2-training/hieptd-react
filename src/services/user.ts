import { ChangePassForm } from 'components/ChangePassword';
import { UserImport } from 'components/UserImportModal/functions';
import { FilterType } from 'components/Users/types';
import axiosClient from 'utils/axios';
import { Project, Response, Task, User, UserExport } from 'utils/types';

const userService = {
   getAllUsers: (): Promise<Response<User[]>> => {
      return axiosClient.get('/users');
   },
   getAllUserToExport: async (): Promise<Response<UserExport[]>> =>
      await axiosClient.get('/users'),
   getUsers: async (
      page: number,
      limit: number,
      filterData: FilterType
   ): Promise<Response<User[]>> => {
      let queries = `page=${page}&limit=${limit}&`;
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }

      return await axiosClient.get(`/users?${queries}`);
   },
   getUser: async (id: number): Promise<Response<User>> =>
      await axiosClient.get(`/users/${id}`),
   editUser: async (
      id: number,
      editData: Partial<User>
   ): Promise<Response<User>> =>
      await axiosClient.put(`/users/${id}`, editData),
   deleteUSer: async (id: number): Promise<Response<User>> =>
      await axiosClient.delete(`/users/${id}`),
   createUser: async (user: Partial<User>): Promise<Response<User>> =>
      await axiosClient.post('/users', user),
   importUser: async (users: UserImport[]): Promise<Response<User[]>> =>
      await axiosClient.post(`/users/import`, users),

   deleteUsers: async (ids: number[]): Promise<Response<User[]>> =>
      await axiosClient.delete(`/users/deleteMany`, {
         data: ids,
      }),

   //change password
   changePassword: async (
      id: number,
      changePass: ChangePassForm
   ): Promise<Response<User>> =>
      await axiosClient.put(`/users/${id}/change-password`, changePass),
   getTasksOfUser: async (id: number): Promise<Response<Task[]>> =>
      await axiosClient.get(`/users/${id}/tasks`),
   getProjectsOfUser: async (id: number): Promise<Response<Project[]>> =>
      await axiosClient.get(`/users/${id}/projects`),
};
export default userService;

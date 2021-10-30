import { FilterType } from 'components/Users/types';
import axiosClient from 'utils/axios';
import { Project, User, UserExport } from 'utils/types';
import { UserImport } from 'components/UserImportModal/functions';
import { Response } from 'utils/types';
import { FilterType as FilerProject } from 'components/ListProjects/types';

const userService = {
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
   getProjects: async (
      id: number,
      page: number,
      limit: number,
      filterData: FilerProject
   ): Promise<Response<Project[]>> => {
      let queries = `page=${page}&limit=${limit}&`;
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] &&
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }
      return await axiosClient.get(`/users/${id}/projects?${queries}`);
   },
};
export default userService;

import { FilterType } from 'components/Users/types';
import axiosClient from 'utils/axios';
import { User } from 'utils/types';
import { UserImport } from 'components/UserImportModal/functions';

const userService = {
   getAllUser: async () => await axiosClient.get('/users'),
   getUsers: async (page: number, limit: number, filterData: FilterType) => {
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
   getUser: async (id: number) => await axiosClient.get(`/users/${id}`),
   editUser: async (id: number, editData: Partial<User>) =>
      await axiosClient.put(`/users/${id}`, editData),
   deleteUSer: async (id: number) => await axiosClient.delete(`/users/${id}`),
   createUser: async (user: Partial<User>) =>
      await axiosClient.post('/users', user),
   importUser: async (users: UserImport[]) =>
      await axiosClient.post(`/users/import`, users),
};
export default userService;

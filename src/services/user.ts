import axiosClient from 'utils/axios';
import { User } from 'utils/types';
import { UserImport } from 'components/UserImportModal/functions';

const userService = {
   getAllUser: async () => await axiosClient.get('/user'),
   getUser: async (id: number) => await axiosClient.get(`/user/${id}`),
   editUser: async (id: number, editData: Partial<User>) =>
      await axiosClient.put(`/user/${id}`, editData),
   deleteUSer: async (id: number) => await axiosClient.delete(`/user/${id}`),
   createUser: async (user: Partial<User>) =>
      await axiosClient.post('/user', user),
   importUser: async (users: UserImport[]) =>
      await axiosClient.post(`/user/import`, users),
};
export default userService;

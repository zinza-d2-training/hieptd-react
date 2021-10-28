import axiosClient from 'utils/axios';
import { Response, User } from 'utils/types';

const authService = {
   login: async (username: string, password: string): Promise<Response> => {
      return await axiosClient.post('/auth/login', {
         username,
         password,
      });
   },
   me: async (): Promise<Response<User>> => {
      return await axiosClient.get('/auth/profile');
   },
};
export default authService;

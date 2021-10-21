import axiosClient from 'utils/axios';

const authService = {
   login: async (username: string, password: string) => {
      return await axiosClient.post('/auth/login', {
         username,
         password,
      });
   },
   me: async () => {
      return await axiosClient.get('/auth/profile');
   },
};
export default authService;

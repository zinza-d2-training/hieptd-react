import axiosClient from './axiosClient';

const URL = '/auth';

const userApi = {
   postLogin: (username: string, password: string) => {
      return axiosClient.post(`${URL}/login`, { username, password });
   },
   getInfo: () => {
      return axiosClient.get(`${URL}/profile`);
   },
};

export default userApi;

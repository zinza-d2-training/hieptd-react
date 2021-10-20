import userApi from 'api/userApi';
import { Role, User } from './types';

export async function login(username: string, password: string) {
   const response = await userApi.postLogin(username, password);
   if (response) {
      window.localStorage.setItem(
         'accessToken',
         JSON.stringify(Object.values(response['accessToken'])[0])
      );
   }
}
export function logout() {
   window.localStorage.removeItem('accessToken');
   window.location.replace('/login');
}
export function getUser(): User | undefined {
   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

   return currentUser;
}

export function getUserRole(): Role | undefined {
   return getUser()?.role;
}

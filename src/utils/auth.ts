import { LoginData, Role, User } from './types';

export function login(user: LoginData) {
   window.localStorage.setItem('user', JSON.stringify(user));
}
export function logout() {
   window.localStorage.removeItem('user');
   window.location.replace('/login');
}
export function getUser(): User | undefined {
   const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

   return currentUser;
}

export function getUserRole(): Role | undefined {
   return getUser()?.role;
}

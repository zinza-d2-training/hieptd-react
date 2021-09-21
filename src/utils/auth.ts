import { LoginData, Role, User } from './types';

export function login(user: LoginData) {
   window.localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User | undefined {
   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
   return currentUser;
}

export function getUserRole(): Role | undefined {
   return getUser()?.role;
}

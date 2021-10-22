import { STORAGE_KEYS } from './constants';
import { User } from './types';

export function setToken(token: string) {
   if (token) {
      window.localStorage.setItem(
         STORAGE_KEYS.accessToken,
         JSON.stringify(token)
      );
   }
}
export function getToken(): string | undefined {
   return window.localStorage.getItem(STORAGE_KEYS.accessToken)
      ? JSON.parse(window.localStorage.getItem(STORAGE_KEYS.accessToken)!)
      : undefined;
}
export function logout() {
   window.localStorage.removeItem(STORAGE_KEYS.accessToken);
   window.localStorage.removeItem(STORAGE_KEYS.user);
   window.location.replace('/login');
}
export function getUser(): User | undefined {
   const currentUser =
      JSON.parse(localStorage.getItem(STORAGE_KEYS.user)!) || undefined;

   return currentUser;
}
export function setUser(user: User | undefined) {
   window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

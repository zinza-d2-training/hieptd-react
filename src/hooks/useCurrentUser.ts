import { useEffect, useState } from 'react';
import authService from 'services/auth';
import { setUser as setLocalStorageUser } from 'utils/auth';
import { User } from 'utils/types';

export function useCurrentUser(): {
   user: User | undefined;
   loading: boolean;
} {
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<User | undefined>();

   useEffect(() => {
      async function getUser() {
         try {
            const res = await authService.me();
            setUser((res as any).user);
            setLocalStorageUser((res as any).user);
            setLoading(false);
         } catch (e) {
            console.log(e);
            setLoading(false);
         }
      }
      getUser();
   }, []);
   return {
      user,
      loading,
   };
}

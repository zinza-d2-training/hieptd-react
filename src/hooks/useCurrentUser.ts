import { useCallback, useEffect, useState } from 'react';
import authService from 'services/auth';
import {
   getUser as getLocalStorageUser,
   setUser as setLocalStorageUser,
} from 'utils/auth';
import { User } from 'utils/types';

export function useCurrentUser(): {
   user: User | undefined;
   loading: boolean;
} {
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<User | undefined>();
   const getUser = useCallback(async () => {
      const currentUser = getLocalStorageUser();
      if (!currentUser) {
         try {
            const res = await authService.me();
            setUser((res as any).user);
            setLocalStorageUser((res as any).user);
            setLoading(false);
         } catch (e) {
            console.log(e);
            setLoading(false);
         }
      } else {
         setUser(currentUser);
         setLoading(false);
      }
   }, []);
   useEffect(() => {
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return {
      user,
      loading,
   };
}

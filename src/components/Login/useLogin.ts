import { useHistory } from 'react-router';
import { useCallback, useState } from 'react';
import authService from 'services/auth';
import { setToken } from 'utils/auth';

export function useLogin() {
   const history = useHistory();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string>();
   const login = useCallback(
      async (username: string, password: string) => {
         setLoading(true);
         try {
            const res = await authService.login(username, password);

            setToken(res['accessToken']!);
            history.push('/');
         } catch (error: any) {
            setError(error.response.data.message);
         } finally {
            setLoading(false);
         }
      },
      [history]
   );

   return {
      loading,
      error,
      login,
   };
}

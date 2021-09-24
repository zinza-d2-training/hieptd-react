import { useForm } from 'hooks';

export const useLoginForm = (onLogin: () => void) => {
   return useForm({
      onSubmit: onLogin,
      fields: [
         {
            name: 'username',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Username is required';
               } else if (!/^(?=[a-zA-Z0-9._]{5,20}$)/.test(value)) {
                  return 'Invalid username, at least 5 characters required';
               }
               return null;
            },
         },
         {
            name: 'password',
            validate: (value: string) => {
               if (!value) {
                  return 'Password is required';
               } else if (value.length < 6) {
                  return 'Invalid password, at least 6 characters required';
               }
               return null;
            },
         },
      ],
   });
};

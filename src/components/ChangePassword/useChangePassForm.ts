import { useForm } from 'hooks';

export const useChangePassForm = (handleChangePass: () => void) => {
   return useForm({
      onSubmit: handleChangePass,
      fields: [
         {
            name: 'currentPass',
            validate: (value: string) => {
               if (!value) {
                  return 'Current password is required';
               } else if (value.length < 6) {
                  return 'Invalid password, at least 6 characters required';
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
         {
            name: 'confirmPass',
            fieldNameToCompare: 'password',
            compareValidate: (value: string, secondValue: string) => {
               if (!value) {
                  return 'Confirm password is required';
               } else if (value.length < 6) {
                  return 'Invalid password, at least 6 characters required';
               } else if (value !== secondValue) {
                  return 'Not match';
               }

               return null;
            },
         },
      ],
   });
};

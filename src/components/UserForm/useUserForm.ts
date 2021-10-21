import { useForm } from 'hooks/useForm';
import { nonAccentVietnameses } from 'utils/convert';

export const useUserForm = (handleSubmitUser: () => void) => {
   return useForm({
      onSubmit: handleSubmitUser,
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
            name: 'firstName',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'First name is required';
               } else if (
                  !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                     nonAccentVietnameses(value)
                  )
               ) {
                  return 'Invalid first name, at least 2 characters required';
               }
               return null;
            },
         },
         {
            name: 'lastName',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Last name is required';
               } else if (
                  !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                     nonAccentVietnameses(value)
                  )
               ) {
                  return 'Invalid last name, at least 2 characters required';
               }
               return null;
            },
         },
         {
            name: 'email',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Email is required';
               } else if (
                  !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                     value
                  )
               ) {
                  return 'Invalid email address';
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

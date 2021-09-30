import { useForm } from 'hooks';
import { nonAccentVietnameses } from 'utils/convert';

export const useCreateProjectForm = (onLogin: () => void) => {
   return useForm({
      onSubmit: onLogin,
      fields: [
         {
            name: 'name',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Name is required';
               } else if (
                  !/^[A-Za-z\s]{2,20}$/.test(nonAccentVietnameses(value))
               ) {
                  return 'Invalid  name, at least 2, max 20 characters required';
               }
               return null;
            },
         },
         {
            name: 'client',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Client is required';
               } else if (
                  !/^[A-Za-z\s]{4,2000}$/.test(nonAccentVietnameses(value))
               ) {
                  return 'Invalid, at least 4 characters required';
               }
               return null;
            },
         },
         {
            name: 'description',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Description is required';
               } else if (
                  !/^[A-Za-z\s]{10,200}$/.test(nonAccentVietnameses(value))
               ) {
                  return 'Invalid description, at least 10,  max 200 characters required';
               }
               return null;
            },
         },
      ],
   });
};

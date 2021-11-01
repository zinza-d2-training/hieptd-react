import { useForm } from 'hooks';

export const useCreateProjectForm = (handleCreateProject: () => void) => {
   return useForm({
      onSubmit: handleCreateProject,
      fields: [
         {
            name: 'name',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Name is required';
               } else if (value.length < 4 || value.length > 20) {
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
               } else if (value.length < 4) {
                  return 'Invalid, at least 4 characters required';
               }
               return null;
            },
         },
         {
            name: 'description',
            validate: (value: string) => {
               if (value.length === 0) {
                  return null;
               } else if (value.length < 10 || value.length > 200) {
                  return 'Invalid description, at least 10,  max 200 characters required';
               }
               return null;
            },
         },
      ],
   });
};

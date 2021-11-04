import { useForm } from 'hooks';

export const useCreateTaskForm = (handleCreateTask: () => void) => {
   return useForm({
      onSubmit: handleCreateTask,
      fields: [
         {
            name: 'title',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Title is required';
               } else if (value.length > 20 || value.length < 2) {
                  return 'Invalid  title, at least 2, max 20 characters required';
               }
               return null;
            },
         },

         {
            name: 'notes',
            validate: (value: string) => {
               if (value.length === 0) {
                  return null;
               } else if (value.length > 200 || value.length < 10) {
                  return 'Invalid note, at least 10,  max 200 characters required';
               }
               return null;
            },
         },
      ],
   });
};

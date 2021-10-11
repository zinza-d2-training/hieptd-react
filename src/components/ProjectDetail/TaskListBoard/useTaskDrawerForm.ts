import { useForm } from 'hooks';

export const useTaskDrawerForm = (handleUpdateTask: () => void) => {
   return useForm({
      onSubmit: handleUpdateTask,
      fields: [
         {
            name: 'title',
            validate: (value: string) => {
               if (!value || value.length === 0 || value.length < 4) {
                  return 'Invalid  title, at least 3 characters required';
               }
               return null;
            },
         },

         {
            name: 'notes',
            validate: (value: string) => {
               if (!value || value.length === 0 || value.length < 4) {
                  return 'Invalid  note, at least 3 characters required';
               }
               return null;
            },
         },
      ],
   });
};

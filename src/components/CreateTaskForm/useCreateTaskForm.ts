import { useForm } from 'hooks';
import { nonAccentVietnameses } from 'utils/convert';

export const useCreateTaskForm = (handleCreateTask: () => void) => {
   return useForm({
      onSubmit: handleCreateTask,
      fields: [
         {
            name: 'title',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Title is required';
               } else if (
                  !/^[A-Za-z\s]{2,20}$/.test(nonAccentVietnameses(value))
               ) {
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
               } else if (
                  !/^[A-Za-z\s]{10,200}$/.test(nonAccentVietnameses(value))
               ) {
                  return 'Invalid note, at least 10,  max 200 characters required';
               }
               return null;
            },
         },
      ],
   });
};

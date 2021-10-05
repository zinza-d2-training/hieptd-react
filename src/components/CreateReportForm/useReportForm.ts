import { useForm } from 'hooks/useForm';
import { nonAccentVietnameses } from 'utils/convert';

export const useReportForm = (handleCreateReport: () => void) => {
   return useForm({
      onSubmit: handleCreateReport,
      fields: [
         {
            name: 'title',
            validate: (value: string) => {
               if (!value || value.length === 0) {
                  return 'Title is required';
               } else if (
                  !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                     nonAccentVietnameses(value)
                  )
               ) {
                  return 'Invalid title, at least 2 characters required';
               }
               return null;
            },
         },
         {
            name: 'note',
            validate: (value: string) => {
               if (value.length === 0) {
                  return null;
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

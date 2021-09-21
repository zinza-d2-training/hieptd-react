import { useEffect, useState } from 'react';

type Field = {
   name: string; //field name;
   validate?: (value: any) => string | null;
};

interface Dependencies {
   onSubmit: () => void;
   fields: Field[];
}

type FormValue = { [x: string]: string };
type FormErr = { [x: string]: string };

const validateValue = (values: FormValue, fields: Field[]): FormErr => {
   const errors: FormErr = {};
   Object.keys(values).forEach((field) => {
      const fieldConfig = fields.find((fieldConfig) => {
         return fieldConfig.name === field;
      });
      if (
         fieldConfig &&
         fieldConfig.validate &&
         fieldConfig.validate(values[field]) !== null
      ) {
         errors[field] = fieldConfig.validate(values[field])!;
      }
   });
   return errors;
};

export const useForm = ({ fields = [], onSubmit }: Dependencies) => {
   const [values, setValues] = useState<FormValue>({});
   const [errors, setErrors] = useState<FormErr>({});
   const [isSubmit, setIsSubmit] = useState<boolean>(false);

   // check if no errr , confirm to Submit
   useEffect(() => {
      if (isSubmit && Object.keys(errors).length === 0) {
         onSubmit();
      }
      // eslint-disable-next-line
   }, [errors, isSubmit]);

   // handleSubmit
   const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmit(true);
      setErrors(validateValue(values, fields));
   };
   const handleChange = (event) => {
      event.persist();
      setIsSubmit(false);
      setValues((values) => ({
         ...values,
         [event.target.name]: event.target.value,
      }));
   };
   //reset form
   const resetForm = () => setValues({});
   return {
      handleChange,
      handleSubmit,
      values,
      errors,
      resetForm,
   };
};

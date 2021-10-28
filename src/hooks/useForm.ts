import { useState, useEffect } from 'react';
import { CallbackFunc, PromiseFunc } from 'utils/types';
type Field = {
   name: string; //field name;
   validate?: (value: any) => string | null;
   fieldNameToCompare?: string;
   compareValidate?: (value: any, secondValue: string) => string | null;
};

interface Dependencies {
   onSubmit: CallbackFunc | PromiseFunc;
   fields: Field[];
}

export type FormValue = { [x: string]: string };
type FormErr = { [x: string]: string };

const validateValue = (values: FormValue, fields: Field[]): FormErr => {
   const errors: FormErr = {};

   Object.keys(values).forEach((field) => {
      const fieldConfig = fields.find((fieldConfig) => {
         return fieldConfig.name === field;
      });
      if (fieldConfig && fieldConfig.validate && values[field] !== null) {
         errors[field] = fieldConfig.validate(values[field])!;
      }

      if (
         fieldConfig &&
         fieldConfig.compareValidate &&
         values[field] !== null &&
         fieldConfig.fieldNameToCompare
      ) {
         // compare password vs confirm password
         errors[field] = fieldConfig.compareValidate(
            values[field],
            values[fieldConfig.fieldNameToCompare]
         )!;
      }
   });
   //remove fields are  null or undefined
   for (const key in errors) {
      if (errors[key] === null || errors[key] === undefined) {
         delete errors[key];
      }
   }
   return errors;
};

export const useForm = ({ fields = [], onSubmit }: Dependencies) => {
   const [values, setValues] = useState<FormValue>({});
   const [errors, setErrors] = useState<FormErr>({});

   useEffect(() => {
      setErrors(validateValue(values, fields));
      // eslint-disable-next-line
   }, [values]);

   const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(validateValue(values, fields));
      if (Object.keys(errors).length === 0) {
         onSubmit();
      }
   };
   const handleChange = (event) => {
      event.persist();
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
      setValues,
      errors,
      resetForm,
   };
};

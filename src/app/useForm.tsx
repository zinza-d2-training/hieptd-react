import { useEffect, useState } from 'react';

type FormValue = {
   username?: string;
   password?: string;
};
type FormErr = {
   username?: string;
   password?: string;
};
export const validateValue = (values: FormValue) => {
   let errors: FormErr = {};
   if (!values.username) {
      errors.username = 'Username is required';
   } else if (!/^(?=[a-zA-Z0-9._]{6,20}$)/.test(values.username)) {
      errors.username = 'Invalid username, at least 6 characters required';
   }
   if (!values.password) {
      errors.password = 'Password is required';
   } else if (values.password.length < 6) {
      errors.password = 'Invalid password, at least 6 characters required';
   }
   return errors;
};
export const useForm = (handleLogin) => {
   const [values, setValues] = useState<FormValue>({});
   const [errors, setErrors] = useState<FormErr>({});
   const [isSubmit, setIsSubmit] = useState<boolean>(false);

   // check if no errr , confirm to login
   useEffect(() => {
      if (isSubmit && Object.keys(errors).length === 0) {
         handleLogin();
      }
      // eslint-disable-next-line
   }, [errors]);
   // handleSubmit
   const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmit(true);
      setErrors(validateValue(values));
   };
   const handleChange = (event) => {
      event.persist();
      setValues((values) => ({
         ...values,
         [event.target.name]: event.target.value,
      }));
      setErrors(validateValue(values));
   };

   return {
      handleChange,
      handleSubmit,
      values,
      errors,
   };
};

import { useEffect, useMemo, useState } from 'react';
import { User } from 'utils/types';
import { useApi } from './useApi';
import { useUserForm } from './useUserForm';

interface UseHandleData {
   id?: number;
}

export const useHandleData = ({ id }: UseHandleData) => {
   const { createUser, getUser, editUser, response, loading } = useApi();

   let user = useMemo<Partial<User>>(() => {
      if (id) {
         const users = response;
         if (users) {
            return {
               username: users.username,
               email: users.email,
               firstName: users.firstName,
               lastName: users.lastName,
               avatar: users.avatar,
               dateOfBirth: users.dateOfBirth,
               status: users.status,
               role: users.role,
               password: users.password,
            };
         }
      }
      return {
         username: '',
         email: '',
         firstName: '',
         lastName: '',
         status: false,
         dateOfBirth: '',
         avatar: null,
         role: 'member',
         password: '',
      };
   }, [id, response]);
   const [formData, setFormData] = useState<Partial<User> | undefined>(user);
   //------------ handleSubmit --------------
   const handleSubmitUser = async () => {
      const { username, password, email, firstName, lastName, confirmPass } =
         values;
      // if create new user
      if (!id) {
         if (
            username &&
            password &&
            email &&
            firstName &&
            lastName &&
            confirmPass
         ) {
            await createUser(formData as unknown as Partial<User>);
            if (response) {
               alert('Create user successfully');
            }
         } else alert('Some fields are required!');
      } else {
         if (
            username &&
            password &&
            email &&
            firstName &&
            lastName &&
            confirmPass
         ) {
            await editUser(id, formData as unknown as Partial<User>);
            if (response) {
               alert('Updated!');
            }
         } else alert('Some fields are required!');
      }
   };

   //---------use Form-------
   const { values, errors, handleChange, handleSubmit, setValues } =
      useUserForm(handleSubmitUser);

   //   ----------- handle upload image base64 ---------

   const handleUploadFile = (e) => {
      try {
         const file = e.target.files[0];
         const fileReader = new FileReader();
         fileReader.readAsDataURL(file);
         fileReader.onload = () => {
            const res = fileReader.result?.toString();

            if (res) setFormData({ ...formData, avatar: res });
         };
      } catch (error) {
         console.error(error);
      }
   };

   // onChange fields
   useEffect(() => {
      setFormData({
         ...formData,
         username: values.username,
         password: values.password,
         email: values.email,
         firstName: values.firstName,
         lastName: values.lastName,
      });

      // eslint-disable-next-line
   }, [values]);

   // fill user data

   useEffect(() => {
      getUser(id!);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (id) {
         setValues({
            username: user?.username!,
            email: user?.email!,
            password: user?.password!,
            firstName: user?.firstName!,
            lastName: user?.lastName!,
         });
         setFormData({
            ...formData,
            avatar: user.avatar,
            dateOfBirth: user.dateOfBirth,
            status: user?.status,
            role: user?.role,
         });
      }
      // eslint-disable-next-line
   }, [user]);
   return {
      loading,
      handleUploadFile,
      errors,
      handleChange,
      handleSubmit,
      formData,
      setFormData,
      values,
      user,
   };
};

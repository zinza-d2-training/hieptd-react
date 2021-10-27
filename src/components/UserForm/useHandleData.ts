import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Role, User, UserStatus } from 'utils/types';
import { useApiUserForm } from './useApiUserForm';
import { useUserForm } from './useUserForm';
interface UseHandleData {
   id?: number;
}

export const useHandleData = ({ id }: UseHandleData) => {
   const { createUser, getUser, editUser, loading } = useApiUserForm();

   const [user, setUser] = useState<User>({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      status: UserStatus.active,
      role: Role.Member,
   });

   const fetchUser = async (id: number) => {
      try {
         const { data } = await getUser(id);
         setUser(data);
      } catch (error) {
         toast.error(error as string, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
         });
      }
   };

   useEffect(() => {
      fetchUser(id!);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const [formData, setFormData] = useState<Partial<User> | undefined>(user);
   //------------ handleSubmit --------------
   const handleSubmitUser = async () => {
      const { username, email, firstName, lastName } = values;
      // if create new user
      if (!id) {
         if (username && email && firstName && lastName) {
            try {
               const { message } = await createUser(
                  formData as unknown as Partial<User>
               );

               toast.success(message, {
                  position: 'top-right',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
               });
               resetForm();
            } catch (error) {
               toast.error(error as string, {
                  position: 'top-right',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
               });
            }
         } else alert('Some fields are required!');
      } else {
         if (username && email && firstName && lastName) {
            try {
               const { message } = await editUser(
                  id,
                  formData as unknown as Partial<User>
               );

               toast.success(message, {
                  position: 'top-right',
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
               });
            } catch (error) {
               toast.error(error as string, {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
               });
            }
         } else alert('Some fields are required!');
      }
   };

   //---------use Form-------
   const { values, errors, handleChange, handleSubmit, setValues, resetForm } =
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
         email: values.email,
         firstName: values.firstName,
         lastName: values.lastName,
      });

      // eslint-disable-next-line
   }, [values]);

   // fill user data

   useEffect(() => {
      getUser(id!);
   }, [id, getUser]);

   useEffect(() => {
      if (id) {
         setValues({
            username: user?.username!,
            email: user?.email!,
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

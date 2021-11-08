import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from 'services/user';
import './index.scss';
import { useChangePassForm } from './useChangePassForm';

export type ChangePassForm = {
   password: string;
   confirmPass: string;
   currentPass: string;
};

const ChangePassword = () => {
   const { user: currentUser } = useCurrentUser();
   const history = useHistory();
   const [formData, setFormData] = useState<ChangePassForm>({
      password: '',
      confirmPass: '',
      currentPass: '',
   });

   const handleChangePass = async () => {
      if (
         formData.password &&
         formData.confirmPass &&
         formData.currentPass &&
         !Object.keys(errors).length
      ) {
         try {
            const { data } = await userService.changePassword(
               currentUser?.id!,
               formData
            );
            if (data) {
               toast.success('Password changed successfully');
               history.push(`/users/${currentUser?.id}/details`);
            }
         } catch (error: any) {
            toast.error(error.response.data.message);
         }
      }
   };

   const { values, errors, handleChange, handleSubmit } =
      useChangePassForm(handleChangePass);

   useEffect(() => {
      setFormData({ ...formData, ...values });

      // eslint-disable-next-line
   }, [values]);
   return (
      <div className="changePass">
         <h3>ChangePassword</h3>
         <form className="changePass__form" onSubmit={handleSubmit}>
            <div className="changePass__wrap">
               <div className="changePass__item">
                  <label>Current Password</label>
                  <input
                     type="password"
                     placeholder="Enter your current password"
                     value={values.currentPass || ''}
                     onChange={handleChange}
                     name="currentPass"
                  />
                  <div className="changePass__err">
                     {errors.currentPass || ''}
                  </div>
               </div>
               <div className="changePass__item">
                  <label>New Password</label>
                  <input
                     type="password"
                     placeholder="Enter your password"
                     value={values.password || ''}
                     onChange={handleChange}
                     name="password"
                  />
                  <div className="changePass__err">{errors.password || ''}</div>
               </div>
               <div className="changePass__item">
                  <label>Re-type Password</label>
                  <input
                     type="password"
                     placeholder="Confirm your password"
                     value={values.confirmPass || ''}
                     onChange={handleChange}
                     name="confirmPass"
                  />
                  <div className="changePass__err">{errors.confirmPass}</div>
               </div>
               <div className="changePass__item">
                  <button
                     type="submit"
                     disabled={
                        !formData.password ||
                        !formData.confirmPass ||
                        Object.keys(errors).length > 0
                     }
                  >
                     Change Password
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};
export default ChangePassword;

import { USERS } from 'fakeData/users';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Role } from 'utils/types';
import Breadcrumb from '../Breadcrumb';
import './UserForm.scss';
import { useUserForm } from './useUserForm';

interface UserFormProps {
   id?: number;
}
type FormValue = { [x: string]: string };
function UserForm({ id }: UserFormProps) {
   const history = useHistory();

   const [showPass, setShowPass] = useState<boolean>(false);
   const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
   const inputPasswordRef = useRef<HTMLInputElement>(null);
   const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

   let user = useMemo<FormValue | undefined>(() => {
      if (id) {
         const users = USERS.find((user) => user.id === id);
         if (users) {
            return {
               username: users.username,
               email: users.email,
               firstName: users.firstName,
               lastName: users.lastName,
               avatar: users.avatar,
               dateOfBirth: users.dateOfBirth,
               active: users.active.toString(),
               role: users.role,
               password: users.password,
            };
         }
         return undefined;
      }
      return {
         username: '',
         email: '',
         firstName: '',
         lastName: '',
         avatar: '',
         dateOfBirth: '',
         active: '',
         role: '',
         password: '',
      };
   }, [id]);

   // if (id) {
   //    const users = USERS.find((user) => user.id === id);

   //    if (users) {
   //       user = {
   //          username: users.username,
   //          email: users.email,
   //          firstName: users.firstName,
   //          lastName: users.lastName,
   //          avatar: users.avatar,
   //          dateOfBirth: users.dateOfBirth,
   //          active: users.active.toString(),
   //          role: users.role,
   //          password: users.password,
   //       };
   //    }
   // }

   const [formData, setFormData] = useState<FormValue | undefined>(user);

   // --------toggle show/hide password-------
   const handleToggleShowPass = () => {
      if (inputPasswordRef.current !== null) {
         if (inputPasswordRef.current.type === 'password') {
            inputPasswordRef.current.type = 'text';
            setShowPass(true);
         } else if (inputPasswordRef.current.type === 'text') {
            inputPasswordRef.current.type = 'password';
            setShowPass(false);
         }
      }
   };

   const handleToggleShowConfirmPass = () => {
      if (inputConfirmPasswordRef.current !== null) {
         if (inputConfirmPasswordRef.current.type === 'password') {
            inputConfirmPasswordRef.current.type = 'text';
            setShowConfirmPass(true);
         } else if (inputConfirmPasswordRef.current.type === 'text') {
            inputConfirmPasswordRef.current.type = 'password';
            setShowConfirmPass(false);
         }
      }
   };

   //------------ handleSubmit --------------
   const handleSubmitUser = () => {
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
            alert(JSON.stringify(formData));
            resetForm();
         } else alert('Some fields are required!');
      } else {
         if (username && password && email && firstName && lastName) {
            alert(JSON.stringify(formData));
            resetForm();
         } else alert('Some fields are required!');
      }
   };

   //---------use Form-------
   const { values, errors, handleChange, handleSubmit, resetForm, setValues } =
      useUserForm(handleSubmitUser);

   // handle upload image base64
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
      if (id) {
         setValues({
            username: formData?.username!,
            email: formData?.email!,
            password: formData?.password!,
            firstName: formData?.firstName!,
            lastName: formData?.lastName!,
         });
      }
      // eslint-disable-next-line
   }, []);
   if (id && !user) {
      return <h1>User Not Found</h1>;
   }

   return (
      <div className="userForm">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: 'Users', link: '/users' },
               {
                  name: `${!id ? 'Create' : 'Update'}`,
                  link: `${!id ? '/users/create' : '/users/update'}`,
               },
            ]}
         />
         <h1>{!id ? 'Create user' : 'Update user'}</h1>
         <form onSubmit={handleSubmit}>
            {/*--- Username ---*/}
            <div className="userForm__input">
               <label htmlFor="userForm__input-username">Username*</label>
               <div className="userForm__wrap">
                  <input
                     id="userForm__input-username"
                     type="text"
                     placeholder="Username"
                     value={values.username || ''}
                     name="username"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.username}</div>
               </div>
            </div>
            {/*--- Email ---*/}
            <div className="userForm__input">
               <label htmlFor="userForm__input-email">Email*</label>
               <div className="userForm__wrap">
                  <input
                     id="userForm__input-email"
                     type="email"
                     placeholder="Email"
                     value={values.email || ''}
                     name="email"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.email}</div>
               </div>
            </div>
            {/*--- Password ---*/}
            <div className="userForm__input">
               <label htmlFor="userForm__input-password">Password*</label>
               <div className="userForm__wrap">
                  <input
                     ref={inputPasswordRef}
                     id="userForm__input-password"
                     type="password"
                     placeholder="Password"
                     value={values.password || ''}
                     name="password"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.password}</div>
               </div>
               <i
                  onClick={handleToggleShowPass}
                  className={`${showPass ? 'fas fa-eye' : 'fas fa-eye-slash'}`}
               ></i>
            </div>
            {/*--- Confirm Pass ---*/}
            {!id && (
               <div className="userForm__input">
                  <label htmlFor="userForm__input-password">
                     Confirm Password*
                  </label>
                  <div className="userForm__wrap">
                     <input
                        ref={inputConfirmPasswordRef}
                        id="userForm__input-confirmPass"
                        type="password"
                        placeholder="Password"
                        value={values.confirmPass || ''}
                        name="confirmPass"
                        onChange={handleChange}
                     />
                     <div className="userForm__err">{errors.confirmPass}</div>
                  </div>
                  <i
                     onClick={handleToggleShowConfirmPass}
                     className={`${
                        showConfirmPass ? 'fas fa-eye' : 'fas fa-eye-slash'
                     }`}
                  ></i>
               </div>
            )}
            {/*--- Avatar ---*/}

            <div className="userForm__input">
               <label htmlFor="userForm__input-avatar">Avatar</label>
               <div className="userForm__wrap">
                  <input
                     accept="image/png, image/gif, image/jpeg"
                     id="userForm__input-avatar"
                     type="file"
                     placeholder="Confirm Password"
                     onChange={(e) => handleUploadFile(e)}
                  />
               </div>
            </div>
            {/*--- image ---*/}
            {formData?.avatar && (
               <div className="userForm__image">
                  <img src={formData?.avatar} alt="avatar" />
               </div>
            )}

            {/* ----dateOfBirth ------*/}
            <div className="userForm__input">
               <label htmlFor="userForm__input-date">Date Of Birth*</label>
               <div className="userForm__wrap">
                  <input
                     id="userForm__input-date"
                     type="date"
                     value={formData?.dateOfBirth}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           dateOfBirth: e.target.value,
                        });
                     }}
                  />
               </div>
            </div>
            {/*--- firstName and lastName---- */}
            <div className="userForm__input">
               <label htmlFor="userForm__input-name">Name*</label>
               <div className="userForm__wrap">
                  <input
                     id="userForm__input-name"
                     type="text"
                     placeholder="First name"
                     value={values.firstName || ''}
                     name="firstName"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.firstName}</div>
               </div>
               <div className="userForm__wrap">
                  <input
                     id="userForm__input-lastname"
                     type="text"
                     placeholder="Last name"
                     value={values.lastName || ''}
                     name="lastName"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.lastName}</div>
               </div>
            </div>
            <div className="userForm__input">
               <label htmlFor="userForm__input-role">Role*</label>
               <div className="userForm__wrap">
                  <select
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           role: Role[e.target.value],
                        });
                     }}
                  >
                     <option value="Member">Member</option>
                     <option value="PM">Project Manager</option>
                  </select>
               </div>
            </div>
            <div className="userForm__input">
               <label htmlFor="userForm__input-active">Active*</label>
               <div className="userForm__wrap">
                  <input
                     type="checkbox"
                     id="userForm__input-active"
                     defaultChecked={formData?.active !== ''}
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           active: e.target.checked.toString(),
                        });
                     }}
                  />
               </div>
            </div>
            <div className="userForm__btn">
               <button onClick={() => history.goBack()} type="button">
                  Cancel
               </button>
               <button type="submit">{id ? 'Create' : 'Save'}</button>
            </div>
         </form>
      </div>
   );
}

export default UserForm;

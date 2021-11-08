import CircleLoading from 'components/Loading/CircleLoading';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Role, UserStatus } from 'utils/types';
import Breadcrumb from '../Breadcrumb';
import { useHandleData } from './useHandleData';
import './UserForm.scss';

interface UserFormProps {
   id?: number;
   showBreadcrumb?: boolean;
}

function UserForm({ id, showBreadcrumb }: UserFormProps) {
   const history = useHistory();
   const { user: currentUser } = useCurrentUser();

   const {
      loading,
      errors,
      formData,
      values,
      handleUploadFile,
      handleChange,
      handleSubmit,
      setFormData,
   } = useHandleData({ id });

   // -----render -------

   if (id && !formData) {
      return <h1>User Not Found</h1>;
   }
   if (loading) {
      return <CircleLoading />;
   }

   return (
      <div className="userForm">
         {!showBreadcrumb && (
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
         )}
         <h1>{!id ? 'Create user' : 'Update user'}</h1>
         <form onSubmit={handleSubmit}>
            {/*--- Username ---*/}
            <div className="userForm__input">
               <label className="required" htmlFor="userForm__input-username">
                  Username
               </label>
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
               <label className="required" htmlFor="userForm__input-email">
                  Email
               </label>
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
            {/*--- firstName and lastName---- */}
            <div className="userForm__input">
               <label className="required" htmlFor="userForm__input-name">
                  FirstName
               </label>

               <div className="userForm__wrap">
                  <input
                     id="userForm__input-firstname"
                     type="text"
                     placeholder="First name"
                     value={values.firstName || ''}
                     name="firstName"
                     onChange={handleChange}
                  />
                  <div className="userForm__err">{errors.firstName}</div>
               </div>
            </div>
            {/*--- lastName---- */}
            <div className="userForm__input">
               <label className="required" htmlFor="userForm__input-name">
                  LastName
               </label>
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

            {/* ----dateOfBirth ------*/}
            <div className="userForm__input">
               <label htmlFor="userForm__input-date">Date Of Birth</label>
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

            {currentUser?.role === Role.Admin &&
               currentUser.username !== formData.username && (
                  <>
                     <div className="userForm__input">
                        <label
                           className="required"
                           htmlFor="userForm__input-role"
                        >
                           Role
                        </label>
                        <div className="userForm__wrap">
                           <select
                              value={formData?.role!}
                              onChange={(e) => {
                                 setFormData({
                                    ...formData,
                                    role: e.target.value as Role,
                                 });
                              }}
                           >
                              <option value={Role.Member}>member</option>
                              <option value={Role.PM}>pm</option>
                           </select>
                        </div>
                     </div>
                     <div className="userForm__input">
                        <label
                           className="required"
                           htmlFor="userForm__input-active"
                        >
                           Status
                        </label>
                        <div className="userForm__wrap">
                           <select
                              value={UserStatus[formData?.status!]}
                              onChange={(e) => {
                                 setFormData({
                                    ...formData,
                                    status: UserStatus[e.target.value],
                                 });
                              }}
                           >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                           </select>
                        </div>
                     </div>
                  </>
               )}
            {/*--- Avatar ---*/}

            <div className="userForm__input">
               <label htmlFor="userForm__input-avatar">Avatar</label>
               <div className="userForm__wrap">
                  <input
                     accept="image/png, image/gif, image/jpeg"
                     id="userForm__input-avatar"
                     type="file"
                     onChange={(e) => handleUploadFile(e)}
                  />
               </div>
            </div>
            {/*--- image ---*/}
            {formData?.avatar && (
               <div className="userForm__image">
                  <h2>Image Preview</h2>{' '}
                  {formData?.avatar.includes('/uploads') ? (
                     <img
                        src={`${process.env.REACT_APP_BASEURL}${formData?.avatar}`}
                        alt="avatar"
                     />
                  ) : (
                     <img src={formData?.avatar} alt="avatar" />
                  )}
                  <i
                     className="fas fa-times"
                     onClick={() => {
                        setFormData({ ...formData, avatar: null });
                     }}
                  ></i>
               </div>
            )}
            <div className="userForm__btn">
               <button onClick={() => history.goBack()} type="button">
                  Cancel
               </button>
               <button
                  disabled={
                     !formData?.username ||
                     !formData.firstName ||
                     !formData.lastName ||
                     !formData.email
                  }
                  type="submit"
               >
                  {id ? 'Save' : 'Create'}
               </button>
            </div>
         </form>
      </div>
   );
}

export default UserForm;

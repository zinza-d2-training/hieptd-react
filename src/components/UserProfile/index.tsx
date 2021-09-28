import missing from 'assets/missing.png';
import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import ProfileTable from './ProfileTable';
import { useGetUserProfile } from './useGetUserProfile';

interface UserProfileProps {
   id: number;
}

function UserProfile({ id }: UserProfileProps) {
   const { userProfile, listRender, currentUser } = useGetUserProfile({
      id: id,
   });

   return (
      <div className="userprofile">
         <div className="userprofile__header">
            <Breadcrumb
               listLink={[
                  { name: 'Home', link: '/' },
                  { name: 'Users', link: '/users' },
                  { name: 'Detail', link: '/users/detail' },
               ]}
            />
         </div>
         <div className="userprofile__info">
            {userProfile?.avatar ? (
               <img src={userProfile?.avatar} alt="user avatar" />
            ) : (
               <img src={missing} alt="user avatar" />
            )}
            <div className="userprofile__card">
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> FullName:</span>
                  <span className="userprofile__content">
                     {`${userProfile?.firstName} ${userProfile?.lastName}`}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> UserName:</span>
                  <span className="userprofile__content">
                     {userProfile?.username}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Email:</span>
                  <span className="userprofile__content">
                     {userProfile?.email}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> DateOfBirth:</span>
                  <span className="userprofile__content">
                     {userProfile?.dateOfBirth}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Role:</span>
                  <span className="userprofile__content">
                     {userProfile?.role}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Status:</span>
                  <span className="userprofile__content">
                     {userProfile?.active ? 'Active' : 'Inactive'}
                  </span>
               </div>
               {(userProfile?.role === 'admin' ||
                  (currentUser && userProfile?.id === currentUser.id)) && (
                  <Link to={`/users/${userProfile?.id}/update`}>Edit</Link>
               )}
            </div>
         </div>
         <ProfileTable listRender={listRender} currentUser={currentUser!} />
      </div>
   );
}

export default UserProfile;

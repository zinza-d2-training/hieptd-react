import missing from 'assets/missing.png';
import Breadcrumb from 'components/Breadcrumb';
import ProjectTable from 'components/ProjectTable';
import TaskTable from 'components/TaskTable';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';
import './index.scss';
import { useGetUserProfile } from './useGetUserProfile';

interface UserProfileProps {
   id: number;
}

function UserProfile({ id }: UserProfileProps) {
   const currentUser = getUser();
   const userProfile = useGetUserProfile({ id: id });

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
               {currentUser?.role === Role.Admin && (
                  <Link to={`/users/${userProfile?.id}/update`}>Edit</Link>
               )}
               {currentUser &&
                  currentUser.role !== Role.Admin &&
                  userProfile?.id === currentUser.id && (
                     <Link to={`/users/${userProfile?.id}/edit`}>Edit</Link>
                  )}
            </div>
         </div>

         {userProfile?.projects && (
            <ProjectTable projects={userProfile.projects} />
         )}
         {userProfile?.tasks && <TaskTable tasks={userProfile.tasks} />}
      </div>
   );
}

export default UserProfile;

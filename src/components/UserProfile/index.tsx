import missing from 'assets/missing.png';
import Breadcrumb from 'components/Breadcrumb';
import CircleLoading from 'components/Loading/CircleLoading';
import ProjectTable from 'components/ProjectTable';
import TaskTable from 'components/TaskTable';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Role, UserStatus } from 'utils/types';
import './index.scss';
import { useGetUserProfile } from './useGetUserProfile';

interface UserProfileProps {
   id: number;
}

function UserProfile({ id }: UserProfileProps) {
   const { user: currentUser } = useCurrentUser();

   const {
      loading,
      user,
      projects,
      tasks,
      fetchTasksOfUser,
      fetchProjectsOfUser,
      fetchUser,
   } = useGetUserProfile({ id: id });

   //refetch
   const refetch = useCallback(() => {
      fetchUser();

      fetchProjectsOfUser();
      fetchTasksOfUser();
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      fetchUser();

      fetchProjectsOfUser();
      fetchTasksOfUser();

      // eslint-disable-next-line
   }, [id]);
   if (loading) return <CircleLoading />;
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
            {user?.avatar ? (
               <img
                  src={`${process.env.REACT_APP_BASEURL}${user?.avatar}`}
                  alt="user avatar"
               />
            ) : (
               <img src={missing} alt="user avatar" />
            )}
            <div className="userprofile__card">
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> FullName:</span>
                  <span className="userprofile__content">
                     {`${user?.firstName} ${user?.lastName}`}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> UserName:</span>
                  <span className="userprofile__content">{user?.username}</span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Email:</span>
                  <span className="userprofile__content">{user?.email}</span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> DateOfBirth:</span>
                  <span className="userprofile__content">
                     {user?.dateOfBirth}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Role:</span>
                  <span className="userprofile__content user-role">
                     {user?.role}
                  </span>
               </div>
               <div className="userprofile__card-item">
                  <span className="userprofile__title"> Status:</span>
                  <span className="userprofile__content">
                     {user?.status === UserStatus.active
                        ? 'Active'
                        : 'Inactive'}
                  </span>
               </div>
               {currentUser?.role === Role.Admin && (
                  <Link to={`/users/${user?.id}/update`}>Edit</Link>
               )}
               {currentUser &&
                  currentUser.role !== Role.Admin &&
                  user?.id === currentUser.id && (
                     <Link to={`/users/${user?.id}/edit`}>Edit</Link>
                  )}
            </div>
         </div>

         {!!projects?.length && (
            <>
               <h1>Projects</h1>
               <ProjectTable refetch={refetch} projects={projects} />
            </>
         )}
         {!!tasks?.length && (
            <>
               <h1>Tasks</h1>
               <TaskTable tasks={tasks} />
            </>
         )}
      </div>
   );
}

export default UserProfile;

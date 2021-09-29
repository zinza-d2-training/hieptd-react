import React from 'react';
import UserForm from 'components/UserForm';
import { getUser } from 'utils/auth';
import NotFoundPage from 'components/NotFound';

interface UserEditInfoProps {
   id?: number;
}
function UserEditInfo({ id }: UserEditInfoProps) {
   const currentUser = getUser();
   return (
      <>
         {currentUser?.id === id ? (
            <UserForm id={id} showBreadcrumb={true} />
         ) : (
            <NotFoundPage />
         )}
      </>
   );
}

export default UserEditInfo;

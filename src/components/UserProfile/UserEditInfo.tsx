import NotFoundPage from 'components/NotFound';
import UserForm from 'components/UserForm';
import React from 'react';
import { getUser } from 'utils/auth';

interface UserEditInfoProps {
   id?: number;
}
function UserEditInfo({ id }: UserEditInfoProps) {
   const currentUser = getUser();

   return (
      <>
         {currentUser?.id === id?.toString() ? (
            <UserForm id={id} showBreadcrumb={true} />
         ) : (
            <NotFoundPage />
         )}
      </>
   );
}

export default UserEditInfo;

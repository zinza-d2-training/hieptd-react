import { Breadcrumb, Pagination } from 'components';
import { Filter, UserTable } from 'components/UserList';
import { FilterType } from 'components/UserList/types';
import { useGetUserData } from 'components/UserList/useGetUserData';
import { USERS } from 'fakeData/users';
import { useTitle } from 'hooks';
import React, { useState } from 'react';
import './styles/User.scss';

function UserPage() {
   useTitle('User list');

   const [filter, setFilter] = useState<FilterType>({
      dateOfBirth: '',
      role: '',
      active: false,
      search: '',
   });

   const [pagination, setPagination] = useState({
      total: USERS.length,
      page: 1,
      limit: 10,
   });
   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });
   const { listUsers } = useGetUserData({ filter, pagination });

   return (
      <div className="user">
         <div className="user__header">
            <Breadcrumb listLink={['home', 'users']} />
         </div>
         <Filter filter={filter} handleFilter={setFilter} />
         <UserTable
            data={listUsers}
            handleConfirmDelete={() => alert('Deleted')}
         />
         <Pagination info={pagination} onChange={handlePagination} />
      </div>
   );
}
export default UserPage;

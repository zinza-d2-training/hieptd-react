import Breadcrumb from 'components/Breadcrumb';
import Pagination from 'components/Pagination';
import { FilterType } from 'components/Users/types';
import { useGetUserData } from 'components/Users/useGetUserData';
import { USERS } from 'fakeData/users';
import { useTitle } from 'hooks';
import React, { useState } from 'react';
import Filter from './Filters';
import './styles/Users.scss';
import UserTable from './UserTable';

function Users() {
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
            <Breadcrumb
               listLink={[
                  { name: 'Home', link: '/' },
                  { name: 'Users', link: '/users' },
               ]}
            />
         </div>
         <Filter filter={filter} handleFilter={setFilter} />
         <UserTable
            data={listUsers}
            handleConfirmDelete={() => alert('Deleted')}
         />

         {listUsers.length >= 10 && (
            <Pagination info={pagination} onChange={handlePagination} />
         )}
      </div>
   );
}
export default Users;

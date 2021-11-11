import Breadcrumb from 'components/Breadcrumb';
import CircleLoading from 'components/Loading/CircleLoading';
import Pagination from 'components/Pagination';
import { FilterType } from 'components/Users/types';
import { useTitle } from 'hooks';
import React, { useState } from 'react';
import Filter from './Filters';
import './styles/Users.scss';
import { useGetUserData } from './useGetUserData';
import UserTable from './UserTable';

function Users() {
   useTitle('User list');

   const [filter, setFilter] = useState<FilterType>({
      dob: '',
      role: '',
      status: undefined,
      keyword: '',
   });

   const { users, loading, pagination, handlePagination, fetchData } =
      useGetUserData({
         filter: filter,
      });
   const refetch = async (page?: number) => {
      if (page) {
         handlePagination(page);
      }
      await fetchData();
   };

   if (loading) {
      return <CircleLoading />;
   }
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
         <h1>Users</h1>
         <Filter filter={filter} handleFilter={setFilter} />

         <UserTable data={users} refetch={refetch} />

         <Pagination info={pagination} onChange={handlePagination} />
      </div>
   );
}
export default Users;

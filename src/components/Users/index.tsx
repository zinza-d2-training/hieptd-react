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

   const { listUsers, loading, _pagination, handlePagination } = useGetUserData(
      {
         filter: filter,
      }
   );

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
         <Filter filter={filter} handleFilter={setFilter} />

         <UserTable data={listUsers} />

         <Pagination info={_pagination} onChange={handlePagination} />
      </div>
   );
}
export default Users;

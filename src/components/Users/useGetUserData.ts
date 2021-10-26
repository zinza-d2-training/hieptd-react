import { useEffect, useMemo, useState } from 'react';
import { PaginationType, User } from 'utils/types';
import { FilterType } from './types';
import { useApiUser } from './useApiUser';

interface GetUsersProps {
   filter: FilterType;
}

export const useGetUserData = ({ filter }: GetUsersProps) => {
   const { response, loading, getUsers } = useApiUser();

   // remove undefined in filter
   let _filter = useMemo(() => {
      Object.keys(filter).forEach(
         (key) => filter[key] === undefined && delete filter[key]
      );
      return filter;
   }, [filter]);

   let _pagination = useMemo(
      () => (response ? response['pagination'] : { page: 1, limit: 10 }),
      [response]
   );

   const [pagination, setPagination] = useState<PaginationType>(_pagination);

   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   // get users
   useEffect(() => {
      getUsers(pagination.page, pagination.limit, _filter);
   }, [pagination, _filter, getUsers]);

   let listUsers = useMemo<User[]>(() => {
      if (response) {
         return response['data'] as User[];
      }
      return [];
   }, [response]);

   return { listUsers, loading, _pagination, handlePagination };
};

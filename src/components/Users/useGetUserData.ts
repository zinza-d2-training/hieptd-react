import { useEffect, useMemo, useState } from 'react';
import { PaginationType, User } from 'utils/types';
import { FilterType } from './types';
import { useApiUser } from './useApiUser';

interface GetUsersProps {
   filter: FilterType;
}

export const useGetUserData = ({ filter }: GetUsersProps) => {
   const { response, loading, getUsers } = useApiUser();

   let _pagination = useMemo(
      () => (response ? response['paginationObj'] : { page: 1, limit: 10 }),
      [response]
   );

   const [pagination, setPagination] = useState<PaginationType>(_pagination);

   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   useEffect(() => {
      getUsers(pagination.page, pagination.limit, filter);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pagination, filter]);

   let listUsers = useMemo<User[]>(() => {
      if (response) {
         return response['data'] as User[];
      }
      return [];
   }, [response]);

   return { listUsers, loading, _pagination, handlePagination };
};

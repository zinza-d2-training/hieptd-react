import { useEffect, useMemo, useState } from 'react';
import { PaginationType, User } from 'utils/types';
import { FilterType } from './types';
import { useApiUser } from 'hooks/useApiUser';

interface GetUsersProps {
   filter: FilterType;
}
interface Result {
   users: User[];
   loading: boolean;
   pagination: PaginationType;
   handlePagination: (page: number) => void;
   fetchData: () => Promise<void>;
}

export const useGetUserData = ({ filter }: GetUsersProps): Result => {
   const { loading, getUsers } = useApiUser();
   const [users, setUsers] = useState<User[]>([]);
   const [pagination, setPagination] = useState<PaginationType>({
      page: 1,
      limit: 10,
   });

   // remove undefined in filter
   let _filter = useMemo(() => {
      Object.keys(filter).forEach(
         (key) => filter[key] === undefined && delete filter[key]
      );
      return filter;
   }, [filter]);

   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   const fetchData = async () => {
      try {
         const { data, pagination: paginationRes } = await getUsers(
            pagination.page,
            pagination.limit,
            _filter
         );

         setUsers(data || []);
         setPagination(paginationRes || { page: 1, limit: 10 });
      } catch (e) {
         console.log(e);
         setUsers([]);
      }
   };
   // get users
   useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pagination.page, pagination.limit, _filter]);

   return { users, loading, pagination, handlePagination, fetchData };
};

import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { nonAccentVietnameses } from 'utils/converString';
import { User } from 'utils/types';
import { FilterType } from './types';

interface GetUsersProps {
   filter: FilterType;
   pagination: {
      total: number;
      page: number;
      limit: number;
   };
}

export const useGetUserData = ({ filter, pagination }: GetUsersProps) => {
   const { page, limit } = pagination;
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   //--------handle filter----------
   const handleFilterMultiple = (filter: FilterType, list: User[]) => {
      const filterKeys = Object.keys(filter);
      return list.filter((user) => {
         return filterKeys.every((eachKey) => {
            if (!filter[eachKey].length) {
               return true;
            }
            if (eachKey === 'search') {
               return true;
            }
            return user[eachKey]
               .toString()
               .toLowerCase()
               .includes(filter[eachKey].toString().toLowerCase());
         });
      });
   };

   // ----useMemo()----
   const listUsers: User[] = useMemo(() => {
      const result: User[] = [];
      for (let i = startIndex; i < endIndex; i++) {
         result.push(USERS[i]);
      }
      if (filter.search) {
         const searchWord: string = nonAccentVietnameses(filter.search);
         let listUserBySearch = result.filter(
            (user) =>
               nonAccentVietnameses(user.lastName).includes(
                  nonAccentVietnameses(searchWord)
               ) ||
               nonAccentVietnameses(user.firstName).includes(
                  nonAccentVietnameses(searchWord)
               ) ||
               user.email?.toLowerCase().includes(searchWord) ||
               user.role?.toLowerCase().includes(searchWord)
         );
         if (filter.active) {
            listUserBySearch = listUserBySearch.filter((user) => user.active);
         }
         return handleFilterMultiple(filter, listUserBySearch);
      }
      if (filter.active) {
         const listUserByActive = result.filter((user) => user.active);
         return handleFilterMultiple(filter, listUserByActive);
      }

      return handleFilterMultiple(filter, result);
   }, [filter, startIndex, endIndex]);

   return { listUsers };
};

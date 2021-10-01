import { USERS } from 'fakeData/users';
import { useMemo } from 'react';
import { nonAccentVietnameses } from 'utils/convert';
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

      let result: User[] = list.filter((user) => {
         return filterKeys.every((eachKey) => {
            if (!filter[eachKey].length) {
               return true;
            }
            switch (eachKey) {
               case 'search':
                  const searchWord: string = nonAccentVietnameses(
                     filter[eachKey]
                  );
                  return (
                     nonAccentVietnameses(user.lastName).includes(
                        nonAccentVietnameses(searchWord)
                     ) ||
                     nonAccentVietnameses(user.firstName).includes(
                        nonAccentVietnameses(searchWord)
                     ) ||
                     user.email?.toLowerCase().includes(searchWord) ||
                     user.role?.toLowerCase().includes(searchWord)
                  );
               case 'dateOfBirth':
                  return (
                     user[eachKey].toString().toLowerCase() ===
                     filter[eachKey].toString().toLowerCase()
                  );
               case 'role':
                  return user[eachKey]
                     .toString()
                     .toLowerCase()
                     .includes(filter[eachKey].toString().toLowerCase());

               default:
                  return true;
            }
         });
      });

      return result.splice(startIndex, endIndex);
   };
   // ----useMemo()----
   const listUsers: User[] = useMemo(() => {
      //filter.active isboolean
      if (filter.active) {
         const listUserByActive = USERS.filter((user) => user.active);
         return handleFilterMultiple(filter, listUserByActive);
      }
      return handleFilterMultiple(filter, USERS);
      // eslint-disable-next-line
   }, [filter, pagination]);

   return { listUsers };
};

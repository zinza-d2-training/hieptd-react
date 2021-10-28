import { nonAccentVietnameses, textFromRole } from 'utils/convert';
import { Role, User } from 'utils/types';
import isDate from 'date-fns/isDate';

export type DataErr = {
   [x: string]: string;
};
export type UserImport = Pick<
   User,
   'username' | 'email' | 'dateOfBirth' | 'lastName' | 'firstName' | 'role'
>;

export const handleValidateRow = (user: UserImport) => {
   let dataErr: DataErr = {},
      isError: boolean = false;
   Object.keys(user).forEach((key) => {
      switch (key) {
         case 'username':
            const checkUsername: boolean = !/^(?=[a-zA-Z0-9._]{5,20}$)/.test(
               user[key]
            );

            if (checkUsername) {
               dataErr[key] = 'Username required, at least 5 characters';
               isError = true;
            }

            break;
         case 'email':
            const checkEmail: boolean =
               !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  user[key]
               );
            if (user[key].length === 0) {
               dataErr[key] = 'Email required';
               isError = true;
            } else if (checkEmail) {
               dataErr[key] = 'Invalid email address';
               isError = true;
            }

            break;

         case 'firstName':
            const checkName: boolean =
               !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                  nonAccentVietnameses(user[key])
               );
            if (checkName) {
               dataErr[
                  key
               ] = `Invalid first name, at least 2 characters required`;
               isError = true;
            }

            break;

         case 'lastName':
            const checkLastName: boolean =
               !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                  nonAccentVietnameses(user[key])
               );
            if (checkLastName) {
               dataErr[
                  key
               ] = `Invalid last name, at least 2 characters required`;
               isError = true;
            }

            break;
         case 'role':
            const checkRole: boolean = ![
               textFromRole(Role.PM),
               textFromRole(Role.Member),
               textFromRole(Role.Admin),
            ].includes(user[key]);
            if (user[key].length === 0) {
               dataErr[key] = 'Role required';
               isError = true;
            } else if (checkRole) {
               dataErr[key] = 'Not exits role';
               isError = true;
            }

            break;
         case 'dateOfBirth':
            const checkDate = isDate(new Date(user[key]!));
            if (!checkDate) {
               dataErr[key] = 'Invalid date';
               isError = true;
            }

            break;
         default:
            break;
      }
   });
   return { isError, dataErr };
};

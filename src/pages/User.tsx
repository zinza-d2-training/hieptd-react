import { USERS } from 'fakeData/users';
import { useTitle } from 'hooks';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { nonAccentVietnameses } from 'utils/converString';
import { Role } from 'utils/types';
import './styles/User.scss';
import { UserTable } from 'components';
import { getUser } from 'utils/auth';

type filterType = {
   roles: any;
   dateOfBirth: string;
   firstName?: string;
   lastName?: string;
   active: boolean;
   search?: string;
};

function UserPage() {
   useTitle('User list');
   //getUser
   const currentUser = getUser();
   const [showOption, setShowOption] = useState<boolean>(false);

   //--------handle filter----------
   const [filter, setFilter] = useState<filterType>({
      dateOfBirth: '',
      roles: '',
      active: true,
      search: '',
   });
   // ----useMemo()----
   const listUsers: typeof USERS = useMemo(() => {
      if (filter.search) {
         const searchWord: string = nonAccentVietnameses(filter.search);
         return USERS.filter(
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
      }
      const filterKeys = Object.keys(filter);
      return USERS.filter((user) => {
         return filterKeys.every((eachKey) => {
            if (!filter[eachKey].length) {
               return true;
            }
            return user[eachKey]
               .toString()
               .toLowerCase()
               .includes(filter[eachKey].toString().toLowerCase());
         });
      });
   }, [filter]);
   // ---- render ------
   return (
      <div className="user">
         <div className="user__header">
            <Link to="/">Home</Link> / <Link to="user">User</Link>
         </div>
         {/* ----- option filter---------- */}
         <div className="user__button">
            <button onClick={() => setShowOption(!showOption)} type="button">
               {showOption ? ' Hide filter' : ' Show Filter'}
            </button>

            {/* if role = admin show more options */}
            {currentUser?.role === 'admin' && (
               <div className="dropdown">
                  <button>
                     More actions
                     <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                     <Link to="/user/create">Create new user</Link>
                     <Link to="/user/create">Import</Link>
                     <Link to="/user/create">Export</Link>
                  </div>
               </div>
            )}
         </div>

         {showOption && (
            <div className="user__option">
               <div className="user__input">
                  <label htmlFor="search">
                     <i className="fa fa-search"></i>
                  </label>
                  <input
                     type="text"
                     placeholder="Search"
                     id="search"
                     value={filter.search}
                     onChange={(e) =>
                        setFilter({ ...filter, search: e.target.value })
                     }
                  />
               </div>

               <div className="user__input">
                  <label htmlFor="date">DateOfBirth</label>
                  <input
                     type="date"
                     id="date"
                     name="trip-start"
                     min="01-01-1970"
                     max="31-12-2003"
                     placeholder="/mm/dd/yyyy"
                     onChange={(e) =>
                        setFilter({
                           ...filter,
                           dateOfBirth: new Date(
                              e.target.value
                           ).toLocaleDateString('en-GB'),
                        })
                     }
                  />
               </div>
               <div className="user__input">
                  <span>Role</span>
                  <select
                     onChange={(e) =>
                        setFilter({ ...filter, roles: Role[e.target.value] })
                     }
                  >
                     <option value="Member">Member</option>
                     <option value="Admin">Admin</option>
                     <option value="PM">PM</option>
                  </select>
               </div>
               <div className="user__input">
                  <input
                     defaultChecked={filter.active}
                     onChange={() =>
                        setFilter({
                           ...filter,
                           active: !filter.active,
                        })
                     }
                     id="check"
                     type="checkbox"
                  />{' '}
                  <label htmlFor="check">Active</label>
               </div>
               {/* clear filter */}
               <button
                  type="button"
                  onClick={() =>
                     setFilter({
                        dateOfBirth: '',
                        roles: '',
                        active: true,
                        search: '',
                     })
                  }
               >
                  Clear filter
               </button>
            </div>
         )}
         {/* --------list user-------- */}
         <UserTable
            data={listUsers}
            handleConfirmDelete={() => alert('Deleted')}
         />
      </div>
   );
}
export default UserPage;

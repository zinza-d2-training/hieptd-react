import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import { Link } from 'react-router-dom';
import { Role } from 'utils/types';
import { FilterType } from './types';
import './styles/Filter.scss';

interface FilterProps {
   filter: FilterType;
   handleFilter: (filter: FilterType) => void;
}

function Filter({ filter, handleFilter }: FilterProps) {
   const currentUser = getUser();
   const [showOption, setShowOption] = useState<boolean>(false);
   console.log(filter);
   //--------handle filter----------
   return (
      <>
         <div className="filter__header">
            <div className="filter__search">
               <label htmlFor="search">
                  <i className="fa fa-search"></i>
               </label>
               <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  value={filter.search}
                  onChange={(e) => {
                     handleFilter({ ...filter, search: e.target.value });
                  }}
               />
            </div>
            <div className="filter__button">
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
         </div>
         {showOption && (
            <div className="filter__option">
               <div className="filter__input">
                  <label htmlFor="date">DateOfBirth</label>
                  <input
                     type="date"
                     id="date"
                     placeholder={filter.dateOfBirth}
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              dateOfBirth: new Date(
                                 e.target.value
                              ).toLocaleDateString('en-GB'),
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              dateOfBirth: '',
                           });
                        }
                     }}
                  />
               </div>
               <div className="filter__input">
                  <span>Role</span>
                  <select
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              role: Role[e.target.value],
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              role: '',
                           });
                        }
                     }}
                  >
                     <option value="">Role</option>
                     <option value="Member">Member</option>
                     <option value="Admin">Admin</option>
                     <option value="PM">PM</option>
                  </select>
               </div>
               <div className="filter__input">
                  <input
                     defaultChecked={filter.active}
                     onChange={() => {
                        handleFilter({
                           ...filter,
                           active: !filter.active,
                        });
                     }}
                     id="check"
                     type="checkbox"
                  />{' '}
                  <label htmlFor="check">Active</label>
               </div>
               {/* clear filter */}
               <button
                  type="button"
                  onClick={() => {
                     handleFilter({
                        ...filter,
                        dateOfBirth: '',
                        role: '',
                        active: false,
                        search: '',
                     });
                  }}
               >
                  Clear filter
               </button>
            </div>
         )}
      </>
   );
}
export default Filter;

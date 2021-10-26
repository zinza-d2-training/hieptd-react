import React, { useState, useRef } from 'react';
import { getUser } from 'utils/auth';
import { Link } from 'react-router-dom';
import { Role, UserStatus } from 'utils/types';
import { FilterType } from './types';
import './styles/Filter.scss';
import UserImportModal from 'components/UserImportModal';
import ExportUserModal from 'components/ExportUserModal';

interface FilterProps {
   filter: FilterType;
   handleFilter: (filter: FilterType) => void;
}

function Filter({ filter, handleFilter }: FilterProps) {
   const currentUser = getUser();
   const [showOption, setShowOption] = useState<boolean>(false);
   const [showImportModal, setShowImportModal] = useState<boolean>(false);
   const [showExportModal, setShowExportModal] = useState<boolean>(false);
   const selectRef = useRef<HTMLSelectElement>(null);
   //--------handle filter----------

   const handleClearFilter = () => {
      handleFilter({
         dob: '',
         role: '',
         status: undefined,
         keyword: '',
      });
      if (selectRef.current) {
         selectRef.current.selectedIndex = 0;
      }
   };

   return (
      <>
         {showImportModal && (
            <UserImportModal onClose={() => setShowImportModal(false)} />
         )}
         {showExportModal && (
            <ExportUserModal onClose={() => setShowExportModal(false)} />
         )}
         <div className="filter__header">
            <div className="filter__search">
               <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  value={filter.keyword}
                  onChange={(e) => {
                     handleFilter({ ...filter, keyword: e.target.value });
                  }}
               />
            </div>
            <div className="filter__button">
               <button onClick={() => setShowOption(!showOption)} type="button">
                  {showOption ? ' Hide filter' : ' Show Filter'}
               </button>

               {/* if role = admin show more options */}
               {currentUser?.role === Role.Admin && (
                  <div className="dropdown">
                     <button>
                        More actions
                        <i className="fa fa-caret-down"></i>
                     </button>
                     <div className="dropdown-content">
                        <Link to="/users/create">Create new user</Link>
                        <div onClick={() => setShowImportModal(true)}>
                           Import
                        </div>
                        <div onClick={() => setShowExportModal(true)}>
                           Export
                        </div>
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
                     value={filter.dob}
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              dob: e.target.value,
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              dob: '',
                           });
                        }
                     }}
                  />
               </div>
               <div className="filter__input">
                  <label>Role</label>
                  <select
                     ref={selectRef}
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
                  <label htmlFor="check">Status</label>
                  <select
                     ref={selectRef}
                     onChange={(e) =>
                        handleFilter({
                           ...filter,
                           status: UserStatus[e.target.value],
                        })
                     }
                  >
                     <option value="">Status</option>
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
               </div>
               {/* clear filter */}
               <button type="button" onClick={handleClearFilter}>
                  Clear filter
               </button>
            </div>
         )}
      </>
   );
}
export default Filter;

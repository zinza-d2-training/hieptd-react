import ExportUserModal from 'components/ExportUserModal';
import { DownLoadIcon } from 'components/icons/DownLoadIcon';
import { PlusIcon } from 'components/icons/PlusIcon';
import { UploadIcon } from 'components/icons/UploadIcon';
import UserImportModal from 'components/UserImportModal';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Role, UserStatus } from 'utils/types';
import './styles/Filter.scss';
import { FilterType } from './types';

interface FilterProps {
   filter: FilterType;
   handleFilter: (filter: FilterType) => void;
}

function Filter({ filter, handleFilter }: FilterProps) {
   const [showImportModal, setShowImportModal] = useState<boolean>(false);
   const [showExportModal, setShowExportModal] = useState<boolean>(false);
   const selectRef = useRef<HTMLSelectElement>(null);
   const selectRoleRef = useRef<HTMLSelectElement>(null);
   //--------handle filter----------

   const handleClearFilter = () => {
      handleFilter({
         dob: '',
         role: undefined,
         status: undefined,
         keyword: '',
      });
      if (selectRef.current) {
         selectRef.current.selectedIndex = 0;
      }
      if (selectRoleRef.current) {
         selectRoleRef.current.selectedIndex = 0;
      }
   };

   return (
      <>
         {showImportModal && (
            <UserImportModal
               onClose={() => setShowImportModal(false)}
               isOpen={showImportModal}
            />
         )}
         {showExportModal && (
            <ExportUserModal
               onClose={() => setShowExportModal(false)}
               isOpen={showExportModal}
            />
         )}
         <div className="filter__header">
            <div className="filter__header-left">
               <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  value={filter.keyword}
                  onChange={(e) => {
                     handleFilter({ ...filter, keyword: e.target.value });
                  }}
               />

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

               <select
                  ref={selectRoleRef}
                  onChange={(e) => {
                     handleFilter({
                        ...filter,
                        role: Role[e.target.value],
                     });
                  }}
               >
                  <option value="">Role</option>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="PM">PM</option>
               </select>

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

               <button type="button" onClick={handleClearFilter}>
                  Clear
               </button>
            </div>
            <div className="filter__header-right">
               <Link to="/users/create">
                  <PlusIcon />
                  Add
               </Link>
               <button type="button" onClick={() => setShowImportModal(true)}>
                  <UploadIcon />
                  Import
               </button>
               <button type="button" onClick={() => setShowExportModal(true)}>
                  <DownLoadIcon />
                  Export
               </button>
            </div>
         </div>
      </>
   );
}
export default Filter;

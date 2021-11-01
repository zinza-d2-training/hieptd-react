import ExportUserModal from 'components/ExportUserModal';
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
            <UserImportModal onClose={() => setShowImportModal(false)} />
         )}
         {showExportModal && (
            <ExportUserModal onClose={() => setShowExportModal(false)} />
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

               <div className="filter__header-options">
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
            </div>
            <div className="filter__header-right">
               <Link to="/users/create">
                  <svg
                     width="15"
                     height="15"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M12 5V19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M5 12H19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  Add
               </Link>
               <button type="button" onClick={() => setShowImportModal(true)}>
                  <svg
                     width="15"
                     height="15"
                     viewBox="0 0 23 22"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M13.2188 16.4992H9.78125C9.20977 16.4992 8.75 16.0394 8.75 15.4678V8.24799H4.98164C4.2168 8.24799 3.83437 7.32402 4.37578 6.78254L10.9113 0.241735C11.2336 -0.0805782 11.7621 -0.0805782 12.0844 0.241735L18.6242 6.78254C19.1656 7.32402 18.7832 8.24799 18.0184 8.24799H14.25V15.4678C14.25 16.0394 13.7902 16.4992 13.2188 16.4992ZM22.5 16.1554V20.9686C22.5 21.5402 22.0402 22 21.4688 22H1.53125C0.959766 22 0.5 21.5402 0.5 20.9686V16.1554C0.5 15.5838 0.959766 15.124 1.53125 15.124H7.375V15.4678C7.375 16.7957 8.45352 17.8744 9.78125 17.8744H13.2188C14.5465 17.8744 15.625 16.7957 15.625 15.4678V15.124H21.4688C22.0402 15.124 22.5 15.5838 22.5 16.1554ZM17.1719 19.9372C17.1719 19.4645 16.7852 19.0777 16.3125 19.0777C15.8398 19.0777 15.4531 19.4645 15.4531 19.9372C15.4531 20.4099 15.8398 20.7967 16.3125 20.7967C16.7852 20.7967 17.1719 20.4099 17.1719 19.9372ZM19.9219 19.9372C19.9219 19.4645 19.5352 19.0777 19.0625 19.0777C18.5898 19.0777 18.2031 19.4645 18.2031 19.9372C18.2031 20.4099 18.5898 20.7967 19.0625 20.7967C19.5352 20.7967 19.9219 20.4099 19.9219 19.9372Z"
                        fill="white"
                     />
                  </svg>
                  Import
               </button>
               <button type="button" onClick={() => setShowExportModal(true)}>
                  <svg
                     width="15"
                     height="15"
                     viewBox="0 0 22 22"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M9.28125 0H12.7188C13.2902 0 13.75 0.459766 13.75 1.03125V8.25H17.5184C18.2832 8.25 18.6656 9.17383 18.1242 9.71523L11.5887 16.2551C11.2664 16.5773 10.7379 16.5773 10.4156 16.2551L3.87148 9.71523C3.33008 9.17383 3.7125 8.25 4.47734 8.25H8.25V1.03125C8.25 0.459766 8.70977 0 9.28125 0ZM22 16.1562V20.9688C22 21.5402 21.5402 22 20.9688 22H1.03125C0.459766 22 0 21.5402 0 20.9688V16.1562C0 15.5848 0.459766 15.125 1.03125 15.125H7.33477L9.44023 17.2305C10.3039 18.0941 11.6961 18.0941 12.5598 17.2305L14.6652 15.125H20.9688C21.5402 15.125 22 15.5848 22 16.1562ZM16.6719 19.9375C16.6719 19.4648 16.2852 19.0781 15.8125 19.0781C15.3398 19.0781 14.9531 19.4648 14.9531 19.9375C14.9531 20.4102 15.3398 20.7969 15.8125 20.7969C16.2852 20.7969 16.6719 20.4102 16.6719 19.9375ZM19.4219 19.9375C19.4219 19.4648 19.0352 19.0781 18.5625 19.0781C18.0898 19.0781 17.7031 19.4648 17.7031 19.9375C17.7031 20.4102 18.0898 20.7969 18.5625 20.7969C19.0352 20.7969 19.4219 20.4102 19.4219 19.9375Z"
                        fill="white"
                     />
                  </svg>
                  Export
               </button>
            </div>
         </div>
      </>
   );
}
export default Filter;

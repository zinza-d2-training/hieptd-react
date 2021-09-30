import React, { useState, useRef } from 'react';
import { getUser } from 'utils/auth';
import { ProjectStatus, Role } from 'utils/types';
import './Filter.scss';
import { ProjectFilter } from './useGetListProject';

interface ProjectFilterProps {
   filter: ProjectFilter;
   handleFilter: (filter: ProjectFilter) => void;
}

function Filter({ filter, handleFilter }: ProjectFilterProps) {
   const currentUser = getUser();
   const [showFilter, setShowFilter] = useState(false);
   const selectRef = useRef<HTMLSelectElement>(null);
   // clear filter
   const handleClearFilter = () => {
      handleFilter({
         status: '',
         search: '',
         endDate: '',
      });
      if (selectRef.current) {
         selectRef.current.selectedIndex = 0;
      }
   };
   return (
      <div className="projectFilter">
         <div className="projectFilter__header">
            <input
               type="text"
               placeholder="Search"
               value={filter.search}
               onChange={(e) => {
                  handleFilter({ ...filter, search: e.target.value });
               }}
            />

            <div className="projectFilter__btn">
               <button type="button" onClick={() => setShowFilter(!showFilter)}>
                  {showFilter ? 'Hide Filter' : 'Show Filter'}
               </button>
               {currentUser?.role === Role.PM && (
                  <button type="button">Create new project</button>
               )}
            </div>
         </div>
         {showFilter && (
            <div className="projectFilter__container">
               <div className="projectFilter__item">
                  <label>EndDate</label>
                  <input
                     type="date"
                     value={filter.endDate}
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              endDate: e.target.value,
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              endDate: '',
                           });
                        }
                     }}
                  />
               </div>
               <div className="projectFilter__item">
                  <label>Status</label>
                  <select
                     ref={selectRef}
                     onChange={(e) => {
                        if (e.target.value) {
                           handleFilter({
                              ...filter,
                              status: ProjectStatus[e.target.value],
                           });
                        } else {
                           handleFilter({
                              ...filter,
                              status: '',
                           });
                        }
                     }}
                  >
                     <option value="">Status</option>
                     <option value={ProjectStatus.Completed}>
                        {ProjectStatus[ProjectStatus.Completed]}
                     </option>
                     <option value={ProjectStatus.Cancelled}>
                        {ProjectStatus[ProjectStatus.Cancelled]}
                     </option>
                     <option value={ProjectStatus.Completed}>
                        {ProjectStatus[ProjectStatus.Completed]}
                     </option>
                     <option value={ProjectStatus.InProgress}>
                        {ProjectStatus[ProjectStatus.InProgress]}
                     </option>
                  </select>
               </div>
               <div className="projectFilter__item">
                  <button type="button" onClick={() => handleClearFilter()}>
                     Clear
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
export default Filter;

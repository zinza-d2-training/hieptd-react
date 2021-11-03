import MultipleSelect from 'components/MultipleSelect';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import { Priority, Role, TaskStatus } from 'utils/types';
import { TasksFilter } from '../ProjectTasks';
import '../index.scss';
import { categories } from '../TaskListBoard/index';
import { textFromTaskStatus } from './functions';
import CreateTaskForm from 'components/CreateTaskForm';
import { PlusIcon } from 'components/icons/PlusIcon';

interface TaskFilterProps {
   filter: TasksFilter;
   handleFilter: (filter: TasksFilter) => void;
   projectId: number;
}
export type TaskStatusOption = {
   text: string;
   value: TaskStatus;
};

function TaskFilter({ filter, handleFilter, projectId }: TaskFilterProps) {
   const currentUser = getUser();
   const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

   const options = React.useMemo<TaskStatusOption[]>(() => {
      return categories.map((status) => ({
         text: textFromTaskStatus(status),
         value: status,
      }));
   }, []);

   const handleMultipleStatus = (listSelected: TaskStatus[]) => {
      handleFilter({ ...filter, statuses: listSelected });
   };
   return (
      <>
         {' '}
         {showTaskForm && (
            <CreateTaskForm
               projectId={projectId}
               onClose={() => setShowTaskForm(false)}
            />
         )}{' '}
         <div className="taskFilter">
            <div className="taskFilter__item">
               <label htmlFor="taskFilter-search"></label>
               <input
                  id="taskFilter-search"
                  type="text"
                  placeholder="Search"
                  value={filter.search}
                  onChange={(e) =>
                     handleFilter({ ...filter, search: e.target.value })
                  }
               />
            </div>
            <div className="taskFilter__item">
               <input
                  id="taskFilter-checkbox"
                  type="checkbox"
                  checked={filter.assignTo}
                  onChange={(e) =>
                     handleFilter({ ...filter, assignTo: e.target.checked })
                  }
               />
               <label htmlFor="taskFilter-checkbox">Assign to me</label>
            </div>
            <div className="taskFilter__item">
               <input
                  id="taskFilter-checkbox-2"
                  type="checkbox"
                  checked={filter.createBy}
                  onChange={(e) => {
                     handleFilter({ ...filter, createBy: e.target.checked });
                  }}
               />
               <label htmlFor="taskFilter-checkbox-2">Create by me</label>
            </div>{' '}
            <div className="taskFilter__item">
               <MultipleSelect
                  title={'Statues'}
                  value={filter.statuses}
                  options={options}
                  onChange={handleMultipleStatus}
               />
            </div>
            <div className="taskFilter__item">
               <select
                  onChange={(e) => {
                     if (e.target.value) {
                        handleFilter({
                           ...filter,
                           priority: e.target.value as Priority,
                        });
                     } else {
                        handleFilter({
                           ...filter,
                           priority: null,
                        });
                     }
                  }}
               >
                  <option value="">Priority</option>
                  <option value={Priority.High}>High</option>
                  <option value={Priority.Medium}>Medium</option>
               </select>
            </div>
            <div className="taskFilter__item">
               {currentUser?.role === Role.PM && (
                  <button type="button" onClick={() => setShowTaskForm(true)}>
                     <PlusIcon />
                     Add a Task
                  </button>
               )}
               {currentUser?.role === Role.Member && (
                  <button type="button" onClick={() => setShowTaskForm(true)}>
                     <PlusIcon />
                     Request a Task
                  </button>
               )}
            </div>
         </div>
      </>
   );
}

export default TaskFilter;

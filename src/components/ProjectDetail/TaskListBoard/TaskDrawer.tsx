import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getUser } from 'utils/auth';
import { Role, Task, TaskStatus, User } from 'utils/types';
import { USERS } from 'fakeData/users';
import { categories } from './index';
import { useTaskDrawerForm } from './useTaskDrawerForm';

interface TaskDrawerProp {
   task: Task;
   onClose: (arg: boolean) => void;
}

type FormValue = {
   title?: string;
   notes?: string;
   assign?: User;
   status?: TaskStatus;
   dueDate?: string;
};
function TaskDrawer({ task, onClose }: TaskDrawerProp) {
   const currentUser = getUser();
   const [showTitleInput, setShowTitleInput] = useState<boolean>(false);
   const titleInputRef = useRef<HTMLInputElement>(null);
   const [showTextArea, setShowTextArea] = useState<boolean>(false);
   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   const roleCheck = useMemo<boolean | undefined>(
      () =>
         currentUser &&
         (task.assign?.id === currentUser.id ||
            task.requestByUser.id === currentUser.id),
      [task, currentUser]
   );

   const [formData, setFormData] = useState<FormValue>({
      title: task.title,
      notes: task.notes,
      dueDate: task.dueDate,
   });

   //handle update
   const handleUpdateTask = () => {
      roleCheck && alert(JSON.stringify(formData));
   };
   const { values, errors, handleChange, handleSubmit, setValues } =
      useTaskDrawerForm(handleUpdateTask);

   // handle when click outside input
   const handleClickOutside = (event) => {
      if (
         (titleInputRef.current &&
            !titleInputRef.current.contains(event.target)) ||
         (textAreaRef.current && !textAreaRef.current.contains(event.target))
      ) {
         setShowTitleInput(false);
         setShowTextArea(false);
      }
   };
   useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
         document.removeEventListener('click', handleClickOutside, true);
      };
   });
   // focus input
   useEffect(() => {
      if (showTitleInput) {
         titleInputRef.current?.focus();
      }
      if (showTextArea) {
         textAreaRef.current?.focus();
      }
   }, [showTitleInput, showTextArea]);

   // fill current task
   useEffect(() => {
      setValues({
         ...values,
         title: formData?.title!,
         notes: formData?.notes!,
      });

      // eslint-disable-next-line
   }, []);

   // onChange fields
   useEffect(() => {
      setFormData({
         ...formData,
         title: values.title,
         notes: values.notes,
      });

      // eslint-disable-next-line
   }, [values]);
   console.log(errors.length);

   return (
      <div className="taskDrawer">
         <form onSubmit={handleSubmit}>
            <div className="taskDrawer__title">
               {showTitleInput ? (
                  <input
                     name="title"
                     ref={titleInputRef}
                     value={values.title || ''}
                     onChange={handleChange}
                  />
               ) : (
                  <div className="taskDrawer__title-text">{formData.title}</div>
               )}
               <i
                  className={`fas fa-edit ${!roleCheck ? 'disabled' : ''}`}
                  onClick={() => {
                     roleCheck && setShowTitleInput(true);
                  }}
               ></i>
               <i onClick={() => onClose(false)} className="fas fa-times"></i>
            </div>
            <div className="taskDrawer__err">{errors.title}</div>

            <p>
               <strong>#{task.id} </strong>
            </p>

            <div className="taskDrawer__note">
               {showTextArea ? (
                  <textarea
                     name="notes"
                     ref={textAreaRef}
                     value={values.notes || ''}
                     onChange={handleChange}
                  />
               ) : (
                  <div className="taskDrawer__note-text">
                     <strong> Notes:</strong> <br /> {formData.notes}
                  </div>
               )}
               <i
                  className={`fas fa-edit ${!roleCheck ? 'disabled' : ''}`}
                  onClick={() => {
                     roleCheck && setShowTextArea(true);
                  }}
               ></i>
            </div>
            <div className="taskDrawer__err">{errors.notes}</div>
            <div className="taskDrawer__option">
               <div className="taskDrawer__option-item">
                  <label>Assignee</label>
                  <select
                     disabled={!roleCheck}
                     onChange={(e) => {
                        if (e.target.value) {
                           setFormData({
                              ...formData,
                              assign: USERS.find(
                                 (user) => user.id === Number(e.target.value)
                              ),
                           });
                        }
                     }}
                  >
                     {currentUser?.role === Role.Member &&
                        USERS.filter((user) => user.role === Role.Member).map(
                           (user) => (
                              <option
                                 key={user.id}
                                 value={user.id}
                              >{`${user.lastName} ${user.email}`}</option>
                           )
                        )}
                     {currentUser?.role === Role.PM &&
                        USERS.filter((user) => user.role === Role.PM).map(
                           (user) => (
                              <option
                                 key={user.id}
                                 value={user.id}
                              >{`${user.lastName} ${user.email}`}</option>
                           )
                        )}
                  </select>
               </div>
               <div className="taskDrawer__option-item">
                  <label>Due date</label>
                  <input
                     disabled={!roleCheck}
                     value={formData.dueDate}
                     onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                     }
                     type="date"
                  />
               </div>
               <div className="taskDrawer__option-item">
                  <label>Status</label>
                  <select
                     disabled={
                        task.status === TaskStatus.Requesting || !roleCheck
                     }
                     onChange={(e) => {
                        if (e.target.value) {
                           setFormData({
                              ...formData,
                              status: Number(e.target.value) as TaskStatus,
                           });
                        }
                     }}
                  >
                     {categories.map((category) => (
                        <option value={category}>{TaskStatus[category]}</option>
                     ))}
                  </select>
               </div>
               {roleCheck && (
                  <div className="taskDrawer__option-btn">
                     <button type="submit">Update</button>
                     <button type="button" onClick={() => onClose(false)}>
                        Cancel
                     </button>
                  </div>
               )}
            </div>
         </form>
         {task.status === TaskStatus.Requesting &&
            currentUser?.role === Role.PM && (
               <div className="taskDrawer__option-btn">
                  <button type="button" onClick={() => alert('Approve task')}>
                     Approve
                  </button>
                  <button
                     className="taskDrawer__btn-reject"
                     onClick={() => alert('Reject task')}
                  >
                     Reject
                  </button>
               </div>
            )}
      </div>
   );
}

export default TaskDrawer;

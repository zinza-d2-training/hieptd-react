import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getUser } from 'utils/auth';
import { Role, Task, TaskStatus, User } from 'utils/types';
import { USERS } from 'fakeData/users';
import { categories } from './index';
import { useTaskDrawerForm } from './useTaskDrawerForm';
import { textFromTaskStatus } from '../TaskFilter/functions';
import { Link } from 'react-router-dom';

interface TaskDrawerProps {
   task: Task;
   onClose: () => void;
}

type FormValue = {
   title?: string;
   notes?: string;
   assign?: User;
   status?: TaskStatus;
   dueDate?: string;
};
function TaskDrawer({ task, onClose }: TaskDrawerProps) {
   const currentUser = getUser();
   const [showTitleInput, setShowTitleInput] = useState<boolean>(false);
   const titleInputRef = useRef<HTMLInputElement>(null);
   const [showTextArea, setShowTextArea] = useState<boolean>(false);
   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   const canEdit = useMemo<boolean | undefined>(
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
      canEdit && alert(JSON.stringify(formData));
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
               {canEdit && !showTitleInput && (
                  <i
                     className="fas fa-edit"
                     onClick={() => {
                        setShowTitleInput(true);
                     }}
                  ></i>
               )}
               <i onClick={() => onClose()} className="fas fa-times"></i>
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
               {canEdit && !showTextArea && (
                  <i
                     className="fas fa-edit"
                     onClick={() => {
                        setShowTextArea(true);
                     }}
                  ></i>
               )}
            </div>
            <div className="taskDrawer__err">{errors.notes}</div>
            <div className="taskDrawer__option">
               {canEdit ? (
                  <>
                     {' '}
                     <div className="taskDrawer__option-item">
                        <label>Assignee</label>
                        <select
                           disabled={currentUser?.role === Role.Member}
                           onChange={(e) => {
                              if (e.target.value) {
                                 setFormData({
                                    ...formData,
                                    assign: USERS.find(
                                       (user) =>
                                          user.id === Number(e.target.value)
                                    ),
                                 });
                              }
                           }}
                        >
                           {currentUser?.role === Role.Member &&
                              USERS.filter(
                                 (user) => user.role === Role.Member
                              ).map((user) => (
                                 <option
                                    key={user.id}
                                    value={user.id}
                                 >{`${user.lastName} ${user.email}`}</option>
                              ))}
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
                           value={formData.dueDate}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 dueDate: e.target.value,
                              })
                           }
                           type="date"
                        />
                     </div>
                     <div className="taskDrawer__option-item">
                        <label>Status</label>
                        <select
                           disabled={
                              task.status === TaskStatus.Requesting || !canEdit
                           }
                           onChange={(e) => {
                              if (e.target.value) {
                                 setFormData({
                                    ...formData,
                                    status: Number(
                                       e.target.value
                                    ) as TaskStatus,
                                 });
                              }
                           }}
                        >
                           {categories.map((category) => (
                              <option value={category}>
                                 {textFromTaskStatus(category)}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div className="taskDrawer__option-btn">
                        <button
                           disabled={Object.keys(formData).every(
                              (key) => task[key] === formData[key]
                           )}
                           type="submit"
                        >
                           Update
                        </button>
                        <button type="button" onClick={() => onClose()}>
                           Cancel
                        </button>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="taskDrawer__option-item-info">
                        <strong>Assign to</strong>

                        <Link
                           to={`/users/${task.assign?.id}/details`}
                        >{` ${task.assign?.firstName} ${task.assign?.lastName}`}</Link>
                     </div>
                     <div className="taskDrawer__option-item-info">
                        <strong>Due Date</strong>

                        <span>{task.dueDate}</span>
                     </div>
                     <div className="taskDrawer__option-item-info">
                        <strong>Status</strong>

                        <span>{textFromTaskStatus(task.status)}</span>
                     </div>
                  </>
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

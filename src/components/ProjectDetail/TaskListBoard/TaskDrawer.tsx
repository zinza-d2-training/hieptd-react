import CircleLoading from 'components/Loading/CircleLoading';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Role, Task, TaskPriority, TaskStatus, User } from 'utils/types';
import { useApiTask } from '../useApi/useApiTasksInProject';
import { useGetProjectDetail } from '../useGetData/useGetProjectDetail';
import { useTaskDrawerForm } from './useTaskDrawerForm';

interface TaskDrawerProps {
   task: Task;
   onClose: () => void;
   reFetch: () => void;
}
const taskPriority = [TaskPriority.High, TaskPriority.Medium];
export type FormValue = {
   title?: string;
   notes?: string;
   assignTo?: User;
   assignToId?: number;
   status?: TaskStatus;
   dueDate?: string;
   priority?: TaskPriority;
};
function TaskDrawer({ task, onClose, reFetch }: TaskDrawerProps) {
   const { user: currentUser } = useCurrentUser();
   const [showTitleInput, setShowTitleInput] = useState<boolean>(false);
   const titleInputRef = useRef<HTMLInputElement>(null);
   const [showTextArea, setShowTextArea] = useState<boolean>(false);
   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   const { currentProject, getProject } = useGetProjectDetail(task.projectId);
   const { loading, updateTask } = useApiTask();

   useEffect(() => {
      if (task.projectId) {
         getProject();
      }
      // eslint-disable-next-line
   }, [task]);

   const [formData, setFormData] = useState<FormValue>({
      title: task.title,
      notes: task.notes,
      dueDate: task.dueDate,
   });

   //handle update
   const handleUpdateTask = async () => {
      try {
         const { data } = await updateTask(task.id, formData);
         if (data) {
            toast.success('Task updated successfully');
            onClose();
            reFetch();
         }
      } catch (error) {
         toast.error(error as string);
      }
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

   if (loading) return <CircleLoading />;
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
                  className="fas fa-edit"
                  onClick={() => {
                     setShowTitleInput(true);
                  }}
               ></i>

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

               <i
                  className="fas fa-edit"
                  onClick={() => {
                     setShowTextArea(true);
                  }}
               ></i>
            </div>
            <div className="taskDrawer__err">{errors.notes}</div>
            <div className="taskDrawer__option">
               <>
                  {' '}
                  <div className="taskDrawer__option-item">
                     <label>Assign To</label>
                     <select
                        disabled={currentUser?.role === Role.Member}
                        onChange={(e) => {
                           if (e.target.value) {
                              setFormData({
                                 ...formData,
                                 assignToId: Number(e.target.value),
                              });
                           }
                        }}
                     >
                        {currentProject &&
                           currentProject?.members?.map((user) => (
                              <option
                                 key={user.id}
                                 value={user.id}
                              >{`${user.lastName} ${user.email}`}</option>
                           ))}
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
                     <label>Priority</label>
                     <select
                        onChange={(e) => {
                           if (e.target.value) {
                              setFormData({
                                 ...formData,
                                 priority: Number(
                                    e.target.value
                                 ) as TaskPriority,
                              });
                           }
                        }}
                     >
                        <option value={task.priority}>
                           {TaskPriority[task.priority]}
                        </option>

                        {taskPriority
                           .filter((item) => item !== task.priority)
                           .map((priority) => (
                              <option value={priority}>
                                 {TaskPriority[priority]}
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
            </div>
         </form>
      </div>
   );
}

export default TaskDrawer;

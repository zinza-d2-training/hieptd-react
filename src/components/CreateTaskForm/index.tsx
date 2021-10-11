import { PROJECTS } from 'fakeData/projects';
import { USERS } from 'fakeData/users';
import React, { useEffect, useMemo, useState } from 'react';
import { getUser } from 'utils/auth';
import { Project, Role, User } from 'utils/types';
import './index.scss';
import { useCreateTaskForm } from './useCreateTaskForm';

interface CreateTaskFormProps {
   onClose: () => void;
   projectId: number;
}
type FormData = {
   title: string;
   notes?: string;
   assign?: User;
   requestByUser?: User;
   dueDate?: string;
};

function CreateTaskForm({ onClose, projectId }: CreateTaskFormProps) {
   const currentUser = getUser();

   const currentProject = useMemo<Project>(
      () => PROJECTS.find((project) => project.id === projectId)!,
      [projectId]
   );

   let data = useMemo<FormData>(() => {
      if (currentUser?.role === Role.Member) {
         return {
            title: '',
            assign: currentProject.pm,
            requestByUser: currentUser,
         };
      } else {
         return {
            title: '',
            requestByUser: currentUser,
         };
      }
   }, [currentUser, currentProject.pm]);

   const [formData, setFormData] = useState<FormData>(data);

   // handle submit
   const handleSubmitTask = () => {
      if (formData.title) {
         alert(JSON.stringify(formData));
      }
   };

   const { values, errors, handleChange, handleSubmit } =
      useCreateTaskForm(handleSubmitTask);

   useEffect(() => {
      setFormData({ ...formData, title: values.title, notes: values.notes });
      // eslint-disable-next-line
   }, [values]);

   return (
      <div className="createTaskForm">
         <div className="createTaskForm__overlay"></div>
         <div className="createTaskForm__container">
            <div className="createTaskForm__header">Create Task</div>
            <form onSubmit={handleSubmit}>
               <div className="createTaskForm__item">
                  <label className="required">Task title</label>
                  <div className="createTaskForm__wrap">
                     <input
                        name="title"
                        type="text"
                        value={values.title || ''}
                        onChange={handleChange}
                     />
                     <div className="createTaskForm__err">{errors.title}</div>
                  </div>
               </div>
               <div className="createTaskForm__item">
                  <label>Note</label>
                  <div className="createTaskForm__wrap">
                     <textarea
                        rows={4}
                        cols={25}
                        name="notes"
                        value={values.notes || ''}
                        onChange={handleChange}
                     />
                     <div className="createTaskForm__err">{errors.notes}</div>
                  </div>
               </div>
               {currentUser?.role === Role.PM && (
                  <div className="createTaskForm__item">
                     <label>Assignee</label>
                     <select
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
                        {currentProject?.members?.map((member) => (
                           <option
                              value={member.id}
                           >{`${member.lastName} ${member.email}`}</option>
                        ))}
                     </select>
                  </div>
               )}
               {currentUser?.role === Role.Member && (
                  <div className="createTaskForm__item">
                     <label> Assignee</label>{' '}
                     {`${currentProject.pm?.firstName} ${currentProject.pm?.lastName}-${currentProject.pm?.email}`}
                  </div>
               )}
               <div className="createTaskForm__item">
                  <label>Due date</label>
                  <input
                     type="date"
                     name="dueDate"
                     onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                     }
                  />
               </div>
               <div className="createTaskForm__btn">
                  <button disabled={formData.title === undefined} type="submit">
                     Create
                  </button>
                  <button type="button" onClick={() => onClose()}>
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateTaskForm;

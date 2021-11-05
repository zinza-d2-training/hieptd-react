import CircleLoading from 'components/Loading/CircleLoading';
import { useCurrentUser } from 'hooks/useCurrentUser';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CreateTask as FormData, Project, Role } from 'utils/types';
import './index.scss';
import { useApiCreateTask } from './useApiCreateTask';
import { useCreateTaskForm } from './useCreateTaskForm';

interface CreateTaskFormProps {
   onClose: () => void;
   currentProject: Project;
   reFetchTaskList: () => void;
}

function CreateTaskForm({
   onClose,
   currentProject,
   reFetchTaskList,
}: CreateTaskFormProps) {
   const { user: currentUser } = useCurrentUser();

   const { loading, createTask } = useApiCreateTask();
   let data = useMemo<FormData>(() => {
      return {
         requestById: currentUser && +currentUser?.id!,
         projectId: +currentProject.id!,
      };
   }, [currentUser, currentProject]);

   const [formData, setFormData] = useState<FormData>(data);
   useEffect(() => {
      setFormData(data);
   }, [data]);

   // handle submit
   const handleSubmitTask = async () => {
      if (formData.title && formData.assignToId && formData.dueDate) {
         try {
            const { data, message } = await createTask(formData);
            if (data) {
               toast.success(message);
               onClose();
               reFetchTaskList();
            }
         } catch (error) {
            toast.error(error as string);
         }
      }
   };

   const { values, errors, handleChange, handleSubmit } =
      useCreateTaskForm(handleSubmitTask);

   useEffect(() => {
      setFormData({ ...formData, title: values.title, notes: values.notes });
      // eslint-disable-next-line
   }, [values]);

   if (loading) return <CircleLoading />;
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
                     <span className="createTaskForm__err">{errors.title}</span>
                  </div>
               </div>
               <div className="createTaskForm__item">
                  <label>Note</label>
                  <div className="createTaskForm__wrap">
                     <textarea
                        rows={4}
                        cols={31}
                        name="notes"
                        value={values.notes || ''}
                        onChange={handleChange}
                     />
                     <span className="createTaskForm__err">{errors.notes}</span>
                  </div>
               </div>
               {currentUser?.role === Role.PM && (
                  <div className="createTaskForm__item">
                     <label className="required">Assignee</label>
                     <div className="createTaskForm__wrap">
                        <select
                           onChange={(e) => {
                              if (e.target.value) {
                                 setFormData({
                                    ...formData,
                                    assignToId: Number(e.target.value),
                                 });
                              }
                           }}
                        >
                           <option value="">Select member in project</option>
                           {currentProject?.members?.map((member) => (
                              <option
                                 key={member.id}
                                 value={member.id}
                              >{`${member.lastName} ${member.email}`}</option>
                           ))}
                        </select>
                     </div>
                  </div>
               )}
               {currentUser?.role === Role.Member && (
                  <div className="createTaskForm__item">
                     <label className="required"> Assignee</label>{' '}
                     <div className="createTaskForm__wrap">{`${currentProject?.pm?.firstName} ${currentProject?.pm?.lastName}-${currentProject?.pm?.email}`}</div>
                  </div>
               )}
               <div className="createTaskForm__item">
                  <label className="required">Due date</label>
                  <div className="createTaskForm__wrap">
                     <input
                        type="date"
                        name="dueDate"
                        onChange={(e) =>
                           setFormData({ ...formData, dueDate: e.target.value })
                        }
                     />
                  </div>
               </div>
               <div className="createTaskForm__btn">
                  <button
                     disabled={
                        !formData.title ||
                        !formData.dueDate ||
                        !formData.assignToId
                     }
                     type="submit"
                  >
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

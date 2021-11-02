import Breadcrumb from 'components/Breadcrumb';
import { useApiUser } from 'hooks/useApiUser';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
   CreateProject as FormDataType,
   ProjectStatus,
   Role,
   User,
} from 'utils/types';
import './index.scss';
import ProjectMembersField from './ProjectMembersField';
import { useApiCreateProject } from './useApiCreateProject';
import { useCreateProjectForm } from './useCreateProjectForm';

function CreateProject() {
   const history = useHistory();
   const { createProject } = useApiCreateProject();
   const { getAllUsers } = useApiUser();
   const [users, setUsers] = useState<User[]>([]);

   useEffect(() => {
      const fetchUsers = async () => {
         const { data } = await getAllUsers();
         setUsers(data || []);
      };
      fetchUsers();
   }, [getAllUsers]);

   const [formData, setFormData] = useState<FormDataType>({
      name: '',
      client: '',
      status: 1,
      pmId: undefined,
   });

   //------------ handleSubmit --------------
   const handleSubmitNewProject = async () => {
      const { name, client } = values;
      if (name && client && formData.pmId !== 0) {
         try {
            const { data, message } = await createProject(formData);
            if (data) {
               toast.success(message);
               history.push('/projects');
            }
         } catch (error) {
            toast.error(error as string);
         }
      }
   };

   const { values, errors, handleChange, handleSubmit } = useCreateProjectForm(
      handleSubmitNewProject
   );

   const handleSelectPm = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = Number(e.target.value);
      setFormData({ ...formData, pmId: id! });
   };

   // onChange fields
   useEffect(() => {
      setFormData({
         ...formData,
         name: values.name,
         description: values.description,
         client: values.client,
      });

      // eslint-disable-next-line
   }, [values]);
   return (
      <div className="createproject">
         <Breadcrumb
            listLink={[
               { name: 'Home', link: '/' },
               { name: 'Projects', link: '/projects' },
               { name: 'Create', link: '/projects/create' },
            ]}
         />
         <h1>Create Project</h1>
         <form onSubmit={handleSubmit}>
            <div className="createproject__item">
               <label className="required">Name</label>
               <div className="createproject__item-wrap">
                  <input
                     type="text"
                     name="name"
                     placeholder="Name"
                     value={values.name || ''}
                     onChange={handleChange}
                  />
                  <div className="createproject__errr">{errors.name}</div>
               </div>
            </div>

            <div className="createproject__item">
               <label className="required">Client</label>
               <div className="createproject__item-wrap">
                  <input
                     type="text"
                     name="client"
                     placeholder="Client"
                     value={values.client || ''}
                     onChange={handleChange}
                  />
                  <div className="createproject__errr">{errors.client}</div>
               </div>
            </div>

            <div className="createproject__item">
               <label>StartDate</label>
               <input
                  type="date"
                  name="startDate"
                  value={values.startDate || formData.startDate}
                  onChange={(e) =>
                     setFormData({ ...formData, startDate: e.target.value })
                  }
               />
            </div>
            <div className="createproject__item">
               <label>EndDate</label>
               <input
                  type="date"
                  name="endDate"
                  value={values.endDate || formData.endDate}
                  onChange={(e) =>
                     setFormData({ ...formData, endDate: e.target.value })
                  }
               />
            </div>

            <div className="createproject__item">
               <label className="required">PM</label>
               <select onChange={(e) => handleSelectPm(e)}>
                  <option>Select PM</option>
                  {users.map(
                     (user) =>
                        user.role === Role.PM && (
                           <option
                              key={user.id}
                              value={user.id}
                           >{`${user.lastName} <${user.email}>`}</option>
                        )
                  )}
               </select>
            </div>
            <div className="createproject__item">
               <label className="required">Status</label>
               <select
                  onChange={(e) =>
                     setFormData({
                        ...formData,
                        status: e.target.value as unknown as ProjectStatus,
                     })
                  }
               >
                  <option value={ProjectStatus.Pending}>Pending</option>
                  <option value={ProjectStatus.InProgress}>InProgress</option>
                  <option value={ProjectStatus.Completed}>Completed</option>
                  <option value={ProjectStatus.Cancelled}>Cancelled</option>
               </select>
            </div>
            <div className="createproject__item">
               <label>Description</label>
               <div className="createproject__item-wrap">
                  <textarea
                     name="description"
                     rows={5}
                     cols={40}
                     value={values.description || ''}
                     onChange={handleChange}
                  />
                  <div className="createproject__errr">
                     {errors.description}
                  </div>
               </div>
            </div>
            <div className="createproject__members">
               <h3>Select member</h3>
               <ProjectMembersField
                  allUsers={users.filter((user) => user.role === Role.Member)}
                  value={users.filter((user) =>
                     formData.memberIds?.includes(user.id!)
                  )}
                  onChange={(members: User[]) => {
                     setFormData({
                        ...formData,
                        memberIds: members.map((user) => user.id!),
                     });
                  }}
               />
            </div>
            <div className="createproject__btn">
               <button type="button" onClick={() => history.goBack()}>
                  Cancel
               </button>
               <button
                  disabled={
                     !values.name ||
                     !values.client ||
                     !formData.status ||
                     !formData.pmId
                  }
                  type="submit"
               >
                  Create
               </button>
            </div>
         </form>
      </div>
   );
}

export default CreateProject;

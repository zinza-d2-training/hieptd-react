import React, { useEffect, useState } from 'react';
import Breadcrumb from 'components/Breadcrumb';
import { Project, ProjectStatus, Role, User } from 'utils/types';
import { USERS } from 'fakeData/users';
import './index.scss';
import { useCreateProjectForm } from './useCreateProjectForm';
import { useHistory } from 'react-router-dom';
import AddMember from './AddMember';

function CreateProject() {
   const history = useHistory();
   const [listUsers, setListUsers] = useState<User[]>([...USERS]);
   const [listUsersInProject, setListUsersInProject] = useState<User[]>([]);

   const [formData, setFormData] = useState<Project>({
      id: 1,
      name: '',
      description: '',
      client: '',
      status: ProjectStatus.Pending,
   });

   //------------ handleSubmit --------------
   const handleSubmitNewProject = () => {
      const { name, description, client } = values;
      if (name && description && client) {
         alert(JSON.stringify(formData));
         resetForm();
      } else alert('All fields required!');
   };

   const { values, errors, handleChange, handleSubmit, resetForm } =
      useCreateProjectForm(handleSubmitNewProject);

   const handleSelectPm = (e) => {
      const id = Number(e.target.value);
      const user = USERS.find((user) => user.id === id);
      setFormData({ ...formData, pm: user });
   };
   // onChange fields
   useEffect(() => {
      if (listUsersInProject.length !== 0) {
         setFormData({
            ...formData,
            name: values.name,
            description: values.description,
            client: values.client,
            members: [...listUsersInProject],
         });
      } else
         setFormData({
            ...formData,
            name: values.name,
            description: values.description,
            client: values.client,
         });

      // eslint-disable-next-line
   }, [values, listUsersInProject]);
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
               <label>Name*</label>
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
               <label>Status</label>
               <select
                  onChange={(e) =>
                     setFormData({
                        ...formData,
                        status: Number(e.target.value),
                     })
                  }
               >
                  <option value="">Status</option>
                  <option value={ProjectStatus.Pending}>
                     {ProjectStatus[ProjectStatus.Pending]}
                  </option>
                  <option value={ProjectStatus.InProgress}>
                     {ProjectStatus[ProjectStatus.InProgress]}
                  </option>
               </select>
            </div>
            <div className="createproject__item">
               <label>Client*</label>
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
               <label>Description*</label>
               <div className="createproject__item-wrap">
                  <textarea
                     name="description"
                     rows={5}
                     cols={50}
                     value={values.description || ''}
                     onChange={handleChange}
                  />
                  <div className="createproject__errr">
                     {errors.description}
                  </div>
               </div>
            </div>
            <div className="createproject__item-date ">
               <div className="createproject__item">
                  <label>StartDate*</label>
                  <input
                     type="date"
                     name="startDate"
                     value={values.startDate || ''}
                     onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                     }
                  />
               </div>
               <div className="createproject__item">
                  <label>EndDate*</label>
                  <input
                     type="date"
                     name="endDate"
                     value={values.endDate || ''}
                     onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                     }
                  />
               </div>
            </div>
            <div className="createproject__item">
               <label>PM</label>
               <select onChange={(e) => handleSelectPm(e)}>
                  <option value="">PM</option>
                  {USERS.map(
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
            <div className="createproject__item ">
               <label>Member</label>
               <AddMember
                  listUsers={listUsers}
                  setListUsers={setListUsers}
                  listUsersInProject={listUsersInProject}
                  setListUsersInProject={setListUsersInProject}
               />
            </div>
            <div className="createproject__btn">
               <button type="button" onClick={() => history.goBack()}>
                  Cancel
               </button>
               <button type="submit">Create</button>
            </div>
         </form>
      </div>
   );
}

export default CreateProject;

import Breadcrumb from 'components/Breadcrumb';
import { USERS } from 'fakeData/users';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectStatus, Role, User } from 'utils/types';
import './index.scss';
import ProjectMemberSwitcher from './ProjectMemberSwitcher';
import { useCreateProjectForm } from './useCreateProjectForm';

type ProjectFormData = {
   id: number;
   name: string;
   description?: string;
   client: string;
   status: ProjectStatus.Pending;
   members?: User[];
   pm?: User;
   startDate?: string;
   endDate?: string;
};

function CreateProject() {
   const history = useHistory();
   const allMemberUsers = useMemo(() => {
      return USERS.filter((user) => user.role === Role.Member);
   }, []);

   const [formData, setFormData] = useState<ProjectFormData>({
      id: 1,
      name: '',
      description: '',
      client: '',
      status: ProjectStatus.Pending,
   });

   //------------ handleSubmit --------------
   const handleSubmitNewProject = () => {
      const { name, client } = values;
      if (name && client) {
         alert(JSON.stringify(formData));
         resetForm();
      }
   };

   const { values, errors, handleChange, handleSubmit, resetForm } =
      useCreateProjectForm(handleSubmitNewProject);

   const handleSelectPm = (e) => {
      const id = Number(e.target.value);
      const user = USERS.find((user) => user.id === id);
      setFormData({ ...formData, pm: user! });
   };

   //handle update members in project
   const handleUpdateMembersInProject = (listMember) => {
      setFormData({ ...formData, members: listMember });
      console.log(listMember);
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
               <label>Description</label>
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
               <ProjectMemberSwitcher
                  allUsers={allMemberUsers}
                  onChange={handleUpdateMembersInProject}
               />
            </div>
            <div className="createproject__btn">
               <button type="button" onClick={() => history.goBack()}>
                  Cancel
               </button>
               <button disabled={!values.name || !values.client} type="submit">
                  Create
               </button>
            </div>
         </form>
      </div>
   );
}

export default CreateProject;

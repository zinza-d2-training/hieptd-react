import Dialog from 'components/Dialog';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import projectService from 'services/project';
import { Project, ProjectStatus } from 'utils/types';
import './index.scss';
import { useEditProjectModalForm } from './useEditProjectModalForm';

interface EditProjectModalProps {
   isOpen: boolean;
   project: Project;
   onClose: () => void;
   refetch: () => void;
}
const projectStatusList: ProjectStatus[] = [
   ProjectStatus.Pending,
   ProjectStatus.InProgress,
   ProjectStatus.Completed,
   ProjectStatus.Cancelled,
];

const EditProjectModal = ({
   isOpen,
   project,
   onClose,
   refetch,
}: EditProjectModalProps) => {
   const [formData, setFormData] = useState<Partial<Project>>({});
   const handleSubmitEdit = async () => {
      try {
         const { data } = await projectService.editProject(
            project.id,
            formData
         );
         if (data) {
            toast.success('Project edited successfully');
            onClose();
            refetch();
         }
      } catch (error: any) {
         toast.error(error.response.data.message as string);
      }
   };

   const { values, errors, handleChange, handleSubmit, setValues } =
      useEditProjectModalForm(handleSubmitEdit);

   // fill project
   useLayoutEffect(() => {
      if (project) {
         setValues({
            name: project.name!,
            description: project.description!,
         });
         setFormData(project);
      }
   }, [project, setValues]);

   //set formData
   useEffect(() => {
      setFormData({
         ...formData,
         name: values.name,
         description: values.description,
      });
      // eslint-disable-next-line
   }, [values]);

   const checkDisabledSubmitButton =
      !formData.name ||
      !Object.keys(formData).some((key) => formData[key] !== project[key]);

   if (isOpen) {
      return (
         <Dialog
            title={`Edit project ${project?.id!}`}
            isOpen={isOpen}
            onClose={() => {
               setFormData({});
               onClose();
            }}
         >
            <div className="editProjectModal">
               <form onSubmit={handleSubmit}>
                  <div className="editProjectModal__item">
                     <label>Name</label>
                     <input
                        type="text"
                        name="name"
                        value={values.name || ''}
                        onChange={handleChange}
                     />
                     <div className="editProjectModal__item-err">
                        {errors.name}
                     </div>
                  </div>
                  <div className="editProjectModal__item">
                     <label>Description</label>
                     <textarea
                        name="description"
                        value={values.description || ''}
                        onChange={handleChange}
                     />
                     <div className="editProjectModal__item-err">
                        {errors.description}
                     </div>
                  </div>
                  <div className="editProjectModal__item">
                     <label>End date</label>
                     <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              endDate: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div className="editProjectModal__item">
                     <label>Status</label>
                     <select
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              status: e.target
                                 .value as unknown as ProjectStatus,
                           })
                        }
                     >
                        <option value={project.status}>
                           {ProjectStatus[project.status]}
                        </option>
                        {projectStatusList
                           .filter((status) => status !== project.status)
                           .map((status, index) => (
                              <option key={index} value={status}>
                                 {ProjectStatus[status]}
                              </option>
                           ))}
                     </select>
                  </div>
                  <div className="editProjectModal__btn">
                     <button
                        className="btn__cancel"
                        onClick={() => {
                           setFormData({});
                           onClose();
                        }}
                     >
                        Cancel
                     </button>
                     <button disabled={checkDisabledSubmitButton} type="submit">
                        Update
                     </button>
                  </div>
               </form>
            </div>
         </Dialog>
      );
   } else {
      return null;
   }
};
export default EditProjectModal;

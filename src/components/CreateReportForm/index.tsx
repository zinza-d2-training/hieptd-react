import React, { useEffect, useState } from 'react';
import { getUser } from 'utils/auth';
import { User } from 'utils/types';
import { useReportForm } from './useReportForm';
import './index.scss';

interface ReportFormData {
   title: string;
   note?: string;
   date: string;
   user: User | undefined;
   projectId: number;
   file?: null;
}
interface CreateReportProp {
   projectId: number;
   show: boolean;
   setShow: (boolean) => void;
}

function CreateReportForm({ projectId, setShow, show }: CreateReportProp) {
   const currentUser = getUser();
   const [formData, setFormData] = useState<ReportFormData>({
      title: '',
      date: new Date().toLocaleDateString(),
      projectId: projectId,
      user: currentUser,
   });

   const handleUploadFile = (e) => {
      if (e.target.files[0]) {
         //handle upload file
      }
   };

   const handleSubmitForm = () => {
      if (formData.title && formData.user) {
         alert(JSON.stringify(formData));
         resetForm();
      }
   };

   const { values, errors, handleChange, resetForm, handleSubmit } =
      useReportForm(handleSubmitForm);

   useEffect(() => {
      setFormData({ ...formData, title: values.title, note: values.note });
      // eslint-disable-next-line
   }, [values]);
   return (
      <>
         {show && (
            <div className="createreport">
               <div className="createreport__overlay"></div>
               <form onSubmit={handleSubmit}>
                  <div className="createreport__item">
                     <div className="createreport__item-wrap">
                        <label className="required">Title</label>
                        <input
                           onChange={handleChange}
                           type="text"
                           name="title"
                           value={values.title || ''}
                        />
                     </div>
                     <div className="createreport__item-err">
                        {errors.title}
                     </div>
                  </div>
                  <div className="createreport__item">
                     <div className="createreport__item-wrap">
                        <label>Note</label>
                        <input
                           onChange={handleChange}
                           type="text"
                           name="note"
                           value={values.note || ''}
                        />
                     </div>
                     <div className="createreport__item-err">{errors.note}</div>
                  </div>
                  <div className="createreport__item">
                     <input
                        type="file"
                        id="docpicker"
                        accept=".doc,.docx,.pdf,.excel"
                        onChange={handleUploadFile}
                     />
                  </div>
                  <div className="createreport__btn">
                     <button type="button" onClick={() => setShow(false)}>
                        Cancel
                     </button>
                     <button
                        disabled={values.title === undefined}
                        type="submit"
                     >
                        Upload
                     </button>
                  </div>
               </form>
            </div>
         )}
      </>
   );
}

export default CreateReportForm;

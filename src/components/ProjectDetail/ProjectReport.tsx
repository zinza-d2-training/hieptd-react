import React, { useState } from 'react';
import ReportTable from 'components/ReportTable';
import './styles/Reports.scss';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';
import CreateReportForm from 'components/CreateReportForm';

interface ReportProps {
   projectId: number;
}

function ProjectReport({ projectId }: ReportProps) {
   const currentUser = getUser();
   const [showCreateReportForm, setShowCreateReportForm] =
      useState<boolean>(false);

   return (
      <>
         <CreateReportForm
            projectId={projectId}
            show={showCreateReportForm}
            setShow={setShowCreateReportForm}
         />
         <div className="projectdetail__report">
            {currentUser?.role === Role.Member && (
               <button
                  type="button"
                  onClick={() => setShowCreateReportForm(true)}
               >
                  Upload
               </button>
            )}
            <ReportTable projectId={projectId} />
         </div>
      </>
   );
}

export default ProjectReport;

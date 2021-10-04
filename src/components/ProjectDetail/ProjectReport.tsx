import React from 'react';
import ReportTable from 'components/ReportTable';
import './styles/Reports.scss';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';

interface ReportProps {
   projectId: number;
}

function ProjectReport({ projectId }: ReportProps) {
   const currentUser = getUser();
   return (
      <div className="projectdetail__report">
         {currentUser?.role === Role.Member && <button>Upload</button>}
         <ReportTable projectId={projectId} />
      </div>
   );
}

export default ProjectReport;

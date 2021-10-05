import React, { useMemo, useState } from 'react';
import ReportTable from 'components/ReportTable';
import './styles/Reports.scss';
import { getUser } from 'utils/auth';
import { Role } from 'utils/types';
import CreateReportForm from 'components/CreateReportForm';
import { Report } from 'utils/types';
import { REPORTS } from 'fakeData/reports';
import Pagination from 'components/Pagination';

interface ReportProps {
   projectId: number;
}

function ProjectReports({ projectId }: ReportProps) {
   const currentUser = getUser();
   const [showCreateReportForm, setShowCreateReportForm] =
      useState<boolean>(false);

   // list reports
   let reports = REPORTS.filter((report) => report.projectId === projectId);

   const [pagination, setPagination] = useState({
      total: reports.length,
      page: 1,
      limit: 10,
   });

   // pagination
   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   reports = useMemo<Report[]>(() => {
      const { page, limit } = pagination;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      return reports.slice(startIndex, endIndex);
   }, [pagination, reports]);

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
            <ReportTable reports={reports} />
            <Pagination info={pagination} onChange={handlePagination} />
         </div>
      </>
   );
}

export default ProjectReports;

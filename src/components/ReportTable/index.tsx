import Pagination from 'components/Pagination';
import { REPORTS } from 'fakeData/reports';
import React, { useMemo, useState } from 'react';
import { getUser } from 'utils/auth';
import { Report } from 'utils/types';
import './index.scss';
import ModalConfirm from 'components/ModalConfirm';
import { Link } from 'react-router-dom';

interface ReportTableProps {
   projectId: number;
   recordLimit?: boolean;
}
function ReportTable({ projectId, recordLimit }: ReportTableProps) {
   const currentUser = getUser();
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

   let listReports: Report[] = REPORTS.filter(
      (report) => report.projectId === projectId
   );

   const [pagination, setPagination] = useState({
      total: listReports.length,
      page: 1,
      limit: 10,
   });
   const handlePagination = (newPage: number) =>
      setPagination({ ...pagination, page: newPage });

   listReports = useMemo<Report[]>(() => {
      const { page, limit } = pagination;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      return listReports.slice(startIndex, endIndex);
   }, [pagination, listReports]);

   const handleConfirmDelete = () => {};

   return (
      <>
         <ModalConfirm
            show={showModalDelete}
            setShow={setShowModalDelete}
            handleConfirm={handleConfirmDelete}
            title="Confirm Delete"
            content="Are you sure you want to delete?"
         />
         {listReports.length !== 0 && (
            <div className="reporttable">
               <h2>Report</h2>
               {recordLimit ? (
                  <>
                     {' '}
                     <table>
                        <thead>
                           <tr>
                              <th>Title</th>
                              <th>Note</th>
                              <th>Date</th>
                              <th>Member</th>
                              <th>Options</th>
                           </tr>
                        </thead>
                        <tbody>
                           {listReports.slice(0, 10).map((report) => (
                              <tr key={report.id}>
                                 <td>{report.title}</td>
                                 <td>{report.note}</td>
                                 <td>{report.date}</td>
                                 <td>{`${report.user.firstName} ${report.user.lastName}`}</td>
                                 <td className="reporttable__options">
                                    <button>View</button>
                                    <button>Download</button>
                                    {currentUser?.id === report.user.id && (
                                       <button
                                          type="button"
                                          onClick={() =>
                                             setShowModalDelete(true)
                                          }
                                       >
                                          Delete
                                       </button>
                                    )}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     <div className="showmore">
                        <Link to={`/projects/${projectId}/reports`}>
                           Show more...
                        </Link>
                     </div>
                  </>
               ) : (
                  <>
                     {' '}
                     <table>
                        <thead>
                           <tr>
                              <th>Title</th>
                              <th>Note</th>
                              <th>Date</th>
                              <th>Member</th>
                              <th>Options</th>
                           </tr>
                        </thead>
                        <tbody>
                           {listReports.map((report) => (
                              <tr key={report.id}>
                                 <td>{report.title}</td>
                                 <td>{report.note}</td>
                                 <td>{report.date}</td>
                                 <td>{`${report.user.firstName} ${report.user.lastName}`}</td>
                                 <td className="reporttable__options">
                                    <button>View</button>
                                    <button>Download</button>
                                    {currentUser?.id === report.user.id && (
                                       <button
                                          type="button"
                                          onClick={() =>
                                             setShowModalDelete(true)
                                          }
                                       >
                                          Delete
                                       </button>
                                    )}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     <Pagination
                        info={pagination}
                        onChange={handlePagination}
                     />
                  </>
               )}
            </div>
         )}
      </>
   );
}

export default ReportTable;

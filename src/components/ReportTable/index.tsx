import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import { Report } from 'utils/types';

interface ReportTableProps {
   reports: Report[];
}
function ReportTable({ reports }: ReportTableProps) {
   const currentUser = getUser();
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

   const handleConfirmDelete = () => {};

   return (
      <>
         <ModalConfirm
            show={showModalDelete}
            onClose={() => setShowModalDelete(false)}
            handleConfirm={handleConfirmDelete}
            title="Confirm Delete"
            content="Are you sure you want to delete?"
         />
         {reports.length !== 0 && (
            <div className="table">
               <div className="reporttable__header">
                  {' '}
                  <h2>Report</h2>
               </div>
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
                     {reports.map((report) => (
                        <tr key={report.id}>
                           <td>{report.title}</td>
                           <td>{report.note}</td>
                           <td>{report.date}</td>
                           <td>{`${report.user.firstName} ${report.user.lastName}`}</td>
                           <td className="reporttable__options">
                              <div className="reporttable__btn ">View</div>
                              <div
                                 className={`reporttable__btn ${
                                    currentUser?.id === report.user.id
                                       ? ''
                                       : 'reporttable__btn-last'
                                 }`}
                              >
                                 Download
                              </div>
                              {currentUser?.id === report.user.id && (
                                 <div
                                    className="reporttable__btn reporttable__btn-last"
                                    onClick={() => setShowModalDelete(true)}
                                 >
                                    Delete
                                 </div>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
}

export default ReportTable;

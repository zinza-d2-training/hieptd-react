import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { getUser } from 'utils/auth';
import { Report } from 'utils/types';
import './index.scss';

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
            setShow={setShowModalDelete}
            handleConfirm={handleConfirmDelete}
            title="Confirm Delete"
            content="Are you sure you want to delete?"
         />
         {reports.length !== 0 && (
            <div className="reporttable">
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
                              <button>View</button>
                              <button>Download</button>
                              {currentUser?.id === report.user.id && (
                                 <button
                                    type="button"
                                    onClick={() => setShowModalDelete(true)}
                                 >
                                    Delete
                                 </button>
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

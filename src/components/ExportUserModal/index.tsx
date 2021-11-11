import CircleLoading from 'components/Loading/CircleLoading';
import React, { useMemo, useEffect, useState } from 'react';
import { useApiExportUser } from './useApiExportUser';
import './index.scss';
import papa from 'papaparse';
import { UserExport } from 'utils/types';
import Dialog from 'components/Dialog';
import { DownLoadIcon } from 'components/icons/DownLoadIcon';

interface UserExportModalProps {
   onClose: () => void;
   isOpen: boolean;
}
export default function ExportUserModal({
   onClose,
   isOpen,
}: UserExportModalProps) {
   const { loading, getUsers } = useApiExportUser();
   const [users, setUsers] = useState<UserExport[]>();

   const fetchData = async () => {
      try {
         const { data } = await getUsers();
         setUsers(data);
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const listUsers = useMemo(() => {
      if (users) {
         const res = users?.map((user) => {
            delete user.avatar;
            user.createdAt = user.createdAt.split('T')[0];
            user.updatedAt = user.updatedAt.split('T')[0];

            return user;
         });
         return res;
      }
   }, [users]);

   // handle export user
   const handleExportUser = () => {
      if (listUsers) {
         const csv = papa.unparse(listUsers);
         const blob = new Blob([csv], { type: 'csv' });
         const a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = 'UserExport.csv';
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
      }
   };

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <Dialog onClose={onClose} isOpen={isOpen} title="Export Users">
         <div className="exportUser">
            <div className="userExport__overlay"></div>
            <div className="exportUser__container">
               <div className="exportUser__table">
                  <table>
                     <thead>
                        <tr>
                           {listUsers &&
                              Object.keys(listUsers[0]).map((item, index) => (
                                 <th key={index}>{item}</th>
                              ))}
                        </tr>
                     </thead>
                     <tbody>
                        {listUsers &&
                           listUsers.map((user) => (
                              <tr key={user.id}>
                                 {Object.keys(user).map((item, index) =>
                                    item === 'status' ? (
                                       user[item] ? (
                                          <td key={index}>active</td>
                                       ) : (
                                          <td key={index}>inactive</td>
                                       )
                                    ) : (
                                       <td key={index}>{user[item]}</td>
                                    )
                                 )}
                              </tr>
                           ))}
                     </tbody>
                  </table>
                  <div className="exportUser__info">
                     Total records : {listUsers?.length}
                  </div>
               </div>
               <div className="exportUser__btn">
                  <button onClick={handleExportUser}>
                     <DownLoadIcon /> Export
                  </button>
                  <button onClick={() => onClose()}>Cancel</button>
               </div>
            </div>
         </div>
      </Dialog>
   );
}

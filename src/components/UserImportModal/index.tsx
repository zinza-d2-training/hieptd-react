import CircleLoading from 'components/Loading/CircleLoading';
import format from 'date-fns/format';
import Papa from 'papaparse';
import React, { useEffect, useRef, useState } from 'react';
import { handleValidateRow, UserImport } from './functions';
import './index.scss';
import { useApiImportUser } from './useApiImportUser';
import { toast } from 'react-toastify';
import { DownLoadIcon } from 'components/icons/DownLoadIcon';
import { UploadIcon } from 'components/icons/UploadIcon';
import Dialog from 'components/Dialog';

interface UserImportModalProps {
   onClose: () => void;
   isOpen: boolean;
}

function renderIconWarning(data: UserImport, key: string) {
   if (Object.keys(handleValidateRow(data).dataErr).includes(key)) {
      return (
         <i className="fas fa-exclamation-circle tooltip">
            <span className="tooltipText">
               {handleValidateRow(data).dataErr[key]}
            </span>
         </i>
      );
   }
   return null;
}

function UserImportModal({ onClose, isOpen }: UserImportModalProps) {
   const { importUser, loading } = useApiImportUser();

   const inputRef = useRef<HTMLInputElement>(null);
   const [dataFile, setDataFile] = useState<File>();
   const [listUsers, setListUsers] = useState<UserImport[]>();

   const handleChange = (e) => {
      setDataFile(e.target.files[0]);
   };
   const handleDownLoadTemplate = () => {
      var csv = Papa.unparse({
         fields: [
            'username',
            'email',
            'firstName',
            'lastName',
            'role',
            'dateOfBirth',
         ],
         data: [],
      });

      const blob = new Blob([csv]);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'template.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
   };

   useEffect(() => {
      if (dataFile) {
         Papa.parse(dataFile, {
            complete: updateData,
            header: true,
         });
      }
   }, [dataFile]);

   const updateData = (result) => {
      setListUsers(result.data.splice(0, result.data.length - 1));
   };

   //handle import
   const handleImport = async () => {
      if (listUsers) {
         //convert to yyyy-mm-dd
         listUsers.forEach(
            (user) =>
               (user.dateOfBirth = format(
                  new Date(user.dateOfBirth!),
                  'yyyy-MM-dd'
               ))
         );
         try {
            const { message } = await importUser(listUsers);

            toast.success(message);
         } catch (e) {
            toast.error(e as string);
         }
      }
   };

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <Dialog title="Import Users" onClose={onClose} isOpen={isOpen}>
         <div className="userImport">
            <div className="userImport__container">
               <div className="userImport__options">
                  <input
                     type="file"
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                     ref={inputRef}
                     name="file"
                     onChange={handleChange}
                  />

                  <button onClick={handleDownLoadTemplate}>
                     <DownLoadIcon /> Template
                  </button>
                  {!listUsers && (
                     <button onClick={() => onClose()}>Cancel</button>
                  )}
               </div>

               {listUsers && (
                  <div className="userImport__table">
                     <table>
                        <thead>
                           <tr>
                              {Object.keys(listUsers[0]).map(
                                 (item) =>
                                    item !== 'password' && <th>{item}</th>
                              )}
                           </tr>
                        </thead>
                        <tbody>
                           {listUsers.map((data, index) => {
                              const listKeys = Object.keys(data);
                              return (
                                 <tr
                                    key={index}
                                    className={`${
                                       handleValidateRow(data).isError
                                          ? 'err'
                                          : ''
                                    }`}
                                 >
                                    {listKeys.map(
                                       (key) =>
                                          key !== 'password' && (
                                             <td>
                                                {data[key]}
                                                {renderIconWarning(data, key)}
                                             </td>
                                          )
                                    )}
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               )}
               <div className="userImport__btn">
                  {listUsers && (
                     <>
                        <button
                           disabled={listUsers.some(
                              (user) => handleValidateRow(user).isError
                           )}
                           onClick={() => handleImport()}
                        >
                           <UploadIcon /> Import
                        </button>
                        <button onClick={() => onClose()}>Cancel</button>
                     </>
                  )}
               </div>
            </div>
         </div>
      </Dialog>
   );
}

export default UserImportModal;

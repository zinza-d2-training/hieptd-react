import CircleLoading from 'components/Loading/CircleLoading';
import Papa from 'papaparse';
import React, { useEffect, useRef, useState } from 'react';
import { handleValidateRow, UserImport } from './functions';
import './index.scss';
import { useApiImportUser } from './useApiImportUser';
interface UserImportModalProps {
   onClose: () => void;
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

function UserImportModal({ onClose }: UserImportModalProps) {
   const { importUser, loading } = useApiImportUser();

   const inputRef = useRef<HTMLInputElement>(null);
   const [dataFile, setDataFile] = useState<File>();
   const [listUsers, setListUsers] = useState<UserImport[]>();
   console.log({ listUsers });

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
      setListUsers(result.data.splice(0, result.data.length - 2));
   };

   //handle import
   const handleImport = async () => {
      if (listUsers) {
         importUser(listUsers);
      } else {
         alert('All data is invalid');
      }
   };

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <div className="userImport">
         <div className="userImport__overlay" onClick={() => onClose()}></div>
         <div className="userImport__container">
            <h1>Import users</h1>
            <div className="userImport__options">
               <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  ref={inputRef}
                  name="file"
                  onChange={handleChange}
               />

               <button onClick={handleDownLoadTemplate}>
                  Download Template
               </button>
               {!listUsers && <button onClick={() => onClose()}>Cancel</button>}
            </div>

            {listUsers && (
               <div className="userImport__table">
                  <table>
                     <thead>
                        <tr>
                           {Object.keys(listUsers[0]).map(
                              (item) => item !== 'password' && <th>{item}</th>
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
                                    handleValidateRow(data).isError ? 'err' : ''
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
                        Import
                     </button>
                     <button onClick={() => onClose()}>Cancel</button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default UserImportModal;

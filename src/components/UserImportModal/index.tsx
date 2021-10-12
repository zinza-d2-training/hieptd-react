import Papa from 'papaparse';
import React, { useRef, useState, useEffect } from 'react';
import { nonAccentVietnameses, textFromRole } from 'utils/convert';
import { Role, User } from 'utils/types';
import './index.scss';

interface UserImportModalProps {
   onClose: () => void;
}

function UserImportModal({ onClose }: UserImportModalProps) {
   const inputRef = useRef<HTMLInputElement>(null);
   const [dataFile, setDataFile] = useState<File>();
   const [listUsers, setListUsers] = useState<User[]>();

   const handleChange = (e) => {
      setDataFile(e.target.files[0]);
   };
   const handleDownLoadTemplate = () => {
      if (listUsers) {
         const list = Object.keys(listUsers[0]);
         let csvContent = 'data:text/csv;charset=utf-8,';
         csvContent += list + '\r\n';
         const encodedUri = encodeURI(csvContent);
         const link = document.createElement('a');
         link.setAttribute('href', encodedUri);
         link.setAttribute('download', 'userTemplate.csv');
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
   };

   useEffect(() => {
      if (dataFile) {
         Papa.parse(dataFile, {
            complete: updateData,
            header: true,
            encoding: 'utf-8',
         });
      }
   }, [dataFile]);

   const updateData = (result) => {
      setListUsers(result.data.splice(0, result.data.length - 1));
   };

   const handleValidateRow = (user: User) => {
      let errKeys: string[] = [];
      const isError = Object.keys(user).some((key) => {
         switch (key) {
            case 'username':
               const checkUsername: boolean = !/^(?=[a-zA-Z0-9._]{5,20}$)/.test(
                  user[key]
               );
               if (checkUsername) {
                  errKeys.push(key);
               }

               return checkUsername;
            case 'email':
               const checkEmail: boolean =
                  !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                     user[key]
                  );
               if (checkEmail) {
                  errKeys.push(key);
               }
               return checkEmail;
            case 'password':
               const checkPass: boolean = user[key].length < 6;
               if (checkPass) {
                  errKeys.push(key);
               }
               return checkPass;
            case 'firstName' || 'lastName':
               const checkName: boolean =
                  !/^(?=[a-zA-Z0-9\u00C0-\u017F._]{2,20}$)/.test(
                     nonAccentVietnameses(user[key])
                  );
               if (checkName) {
                  errKeys.push(key);
               }
               return checkName;

            case 'role':
               const checkRole: boolean = ![
                  textFromRole(Role.PM),
                  textFromRole(Role.Member),
                  textFromRole(Role.Admin),
               ].includes(user[key]);
               if (checkRole) {
                  errKeys.push(key);
               }
               return checkRole;
            case 'dateOfBirth':
               if (user[key].length < 0) {
                  errKeys.push(key);
               }
               return user[key].length < 0;
            default:
               return false;
         }
      });
      return { isError, errKeys };
   };

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
               {dataFile && (
                  <button onClick={handleDownLoadTemplate}>
                     Download Template
                  </button>
               )}
            </div>
            {listUsers && (
               <div className="userImport__table">
                  <table>
                     <thead>
                        <tr>
                           <th>Username</th>
                           <th>Email</th>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>DOB</th>
                           <th>Role</th>
                        </tr>
                     </thead>
                     <tbody>
                        {listUsers.map((data, index) => (
                           <tr
                              key={index}
                              className={`${
                                 handleValidateRow(data).isError ? 'err' : ''
                              }`}
                           >
                              <td>
                                 {data.username}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'username'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                              <td>
                                 {data.email}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'email'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                              <td>
                                 {data.firstName}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'firstName'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                              <td>
                                 {data.lastName}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'lastName'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                              <td>
                                 {data.dateOfBirth}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'dateOfBirth'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                              <td>
                                 {data.role}{' '}
                                 {handleValidateRow(data).errKeys.includes(
                                    'role'
                                 ) && (
                                    <i className="fas fa-exclamation-circle"></i>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
            <div className="userImport__btn">
               {listUsers && (
                  <button onClick={() => alert('Imported')}>Import</button>
               )}{' '}
               <button onClick={() => onClose()}>Cancel</button>
            </div>
         </div>
      </div>
   );
}

export default UserImportModal;

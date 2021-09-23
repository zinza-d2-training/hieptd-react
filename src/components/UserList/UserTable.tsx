import React, { useState } from 'react';
import { User } from 'utils/types';
import './UserTable.scss';

interface TableUserProps {
   data: User[];
   handleConfirmDelete: Function;
}

function UserTable({ data, handleConfirmDelete }: TableUserProps) {
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
   return (
      <>
         {showModalDelete && (
            <div className="user__modal">
               <div className="user__modal-overlay"></div>
               <div className="user__modal-body">
                  <h2>Confirm Delete</h2>
                  <p>Are you sure you want to delete this record?</p>
                  <div className="user__modal-btn">
                     <button
                        type="button"
                        onClick={() => setShowModalDelete(false)}
                     >
                        No
                     </button>
                     <button
                        onClick={() => {
                           handleConfirmDelete();
                           setShowModalDelete(false);
                        }}
                        type="button"
                     >
                        Yes
                     </button>
                  </div>
               </div>
            </div>
         )}
         <div className="user__table">
            <table>
               <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>DateOfBirth</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
               {data?.map((user, index) => (
                  <tr key={index}>
                     <td>{`${user.firstName} ${user.lastName}`}</td>
                     <td>{user.email}</td>
                     <td>{user.dateOfBirth}</td>
                     <td>{user.role}</td>
                     <td>{user.active ? 'Active' : 'Inactive'}</td>
                     <td className="user__edit">
                        <span className="user__edit-edit">
                           <i className="fas fa-edit"></i>
                        </span>{' '}
                        <span
                           onClick={() => setShowModalDelete(true)}
                           className="user__edit-delete"
                        >
                           <i className="fas fa-trash-alt"></i>
                        </span>
                     </td>
                  </tr>
               ))}
            </table>
         </div>
      </>
   );
}

export default UserTable;

import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'utils/types';
import './styles/Users.scss';
interface TableUserProps {
   data: User[];
   handleConfirmDelete: Function;
}

function UserTable({ data, handleConfirmDelete }: TableUserProps) {
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
   const [showModalChangeActive, setShowModalChangeActive] =
      useState<boolean>(false);

   const handleChangeActive = (e, status: boolean) => {
      const value = e?.target.value;
      const check = value === 'active';
      if (check === !status) {
         setShowModalChangeActive(true);
      } else return;
   };

   return (
      <>
         <ModalConfirm
            show={showModalDelete}
            setShow={setShowModalDelete}
            handleConfirm={handleConfirmDelete}
            title="Confirm Delete"
            content="Are you sure you want to delete?"
         />
         <ModalConfirm
            show={showModalChangeActive}
            setShow={setShowModalChangeActive}
            handleConfirm={handleChangeActive}
            title="Confirm Change"
            content="Are you sure you want to change?"
         />
         <div className="user__table">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>DateOfBirth</th>
                     <th>Role</th>
                     <th>Status</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {data.length > 0 ? (
                     data.map((user, index) => (
                        <tr key={index}>
                           <td>{`${user.firstName} ${user.lastName}`}</td>
                           <td>{user.email}</td>
                           <td>{user.dateOfBirth}</td>
                           <td>{user.role}</td>

                           <td className="td-active">
                              <select
                                 onChange={(e) =>
                                    handleChangeActive(e, user.active)
                                 }
                              >
                                 {user.active ? (
                                    <>
                                       <option value="active">Active</option>
                                       <option value="inactive">
                                          Inactive
                                       </option>
                                    </>
                                 ) : (
                                    <>
                                       <option value="inactive">
                                          Inactive
                                       </option>
                                       <option value="active">Active</option>
                                    </>
                                 )}
                              </select>
                           </td>
                           <td className="user__edit">
                              <span className="user__edit-edit">
                                 <Link to={`/users/update/${user.id}`}>
                                    <i className="fas fa-edit"></i>
                                 </Link>
                              </span>{' '}
                              <span
                                 onClick={() => setShowModalDelete(true)}
                                 className="user__edit-delete"
                              >
                                 <i className="fas fa-trash-alt"></i>
                              </span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <h1>No result</h1>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
}

export default UserTable;

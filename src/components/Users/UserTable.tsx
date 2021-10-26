import CircleLoading from 'components/Loading/CircleLoading';
import ModalConfirm from 'components/ModalConfirm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserStatus } from 'utils/types';
import './styles/Users.scss';
import { useApiUser } from './useApiUser';

interface TableUserProps {
   data: User[];
}

function UserTable({ data }: TableUserProps) {
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
   const [showModalChangeActive, setShowModalChangeActive] =
      useState<boolean>(false);

   const [editData, setEditData] = useState<Partial<User>>();

   const { loading, editUser, deleteUser, response } = useApiUser();

   // show modal
   const handleChangeActive = (e, status: UserStatus, id: number) => {
      const value = e?.target.value;

      if (+value !== status) {
         setShowModalChangeActive(true);
         setEditData({ status: value, id: id });
      } else return;
   };
   // confirm change
   const handleConfirmEditUser = async () => {
      if (editData && editData.id) {
         await editUser(editData.id, editData);
         if (response) {
            alert('Updated');
         }
      }
   };

   const handleConfirmDelete = async () => {
      if (editData && editData.id) {
         await deleteUser(editData.id);
         if (response) {
            alert('Updated');
         }
      }
   };

   if (loading) {
      return <CircleLoading />;
   }

   return (
      <>
         <ModalConfirm
            show={showModalChangeActive}
            setShow={setShowModalChangeActive}
            handleConfirm={() => handleConfirmEditUser()}
            title="Confirm Change"
            content={`Are you sure you want to change ?`}
         />
         <ModalConfirm
            show={showModalDelete}
            setShow={setShowModalDelete}
            handleConfirm={() => handleConfirmDelete()}
            title="Confirm Delete"
            content={`Are you sure you want to delete ?`}
         />
         <div className="table">
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
                     data.map((user) => (
                        <tr key={user.id}>
                           <td>
                              <Link
                                 to={`/users/${user.id}/details`}
                              >{`${user.firstName} ${user.lastName}`}</Link>
                           </td>
                           <td>{user.email}</td>
                           <td>{user.dateOfBirth}</td>
                           <td>{user.role}</td>

                           <td className="td-active">
                              <select
                                 onChange={(e) =>
                                    handleChangeActive(e, user.status, user.id)
                                 }
                                 value={user.status}
                              >
                                 {user.status ? (
                                    <>
                                       <option value={UserStatus.active}>
                                          Active
                                       </option>
                                       <option value={UserStatus.inactive}>
                                          Inactive
                                       </option>
                                    </>
                                 ) : (
                                    <>
                                       <option value={UserStatus.inactive}>
                                          Inactive
                                       </option>
                                       <option value={UserStatus.active}>
                                          Active
                                       </option>
                                    </>
                                 )}
                              </select>
                           </td>

                           <td className="user__edit">
                              <span className="user__edit-edit">
                                 <Link to={`/users/${user.id}/update`}>
                                    <i className="fas fa-edit"></i>
                                 </Link>
                              </span>{' '}
                              <span
                                 onClick={() => {
                                    setShowModalDelete(true);
                                    setEditData({ id: user.id });
                                 }}
                                 className="user__edit-delete"
                              >
                                 <i className="fas fa-trash-alt"></i>
                              </span>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <div className="table__notfound">
                        There are no user found!
                     </div>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
}

export default UserTable;

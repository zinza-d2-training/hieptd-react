import React from 'react';
import './ModalConfirm.scss';

interface ModalConfirmProps {
   show: boolean;
   setShow: Function;
   title: string;
   content: string;
   handleConfirm: Function;
}

function ModalConfirm({
   show,
   setShow,
   title,
   content,
   handleConfirm,
}: ModalConfirmProps) {
   return (
      <>
         {show && (
            <div className="user__modal">
               <div className="user__modal-overlay"></div>
               <div className="user__modal-body">
                  <h2>{title}</h2>
                  <p>{content}</p>
                  <div className="user__modal-btn">
                     <button type="button" onClick={() => setShow(false)}>
                        No
                     </button>
                     <button
                        onClick={() => {
                           handleConfirm();
                           setShow(false);
                        }}
                        type="button"
                     >
                        Yes
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
export default ModalConfirm;

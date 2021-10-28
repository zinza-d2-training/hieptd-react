import React from 'react';
import { CallbackFunc, PromiseFunc } from 'utils/types';
import './ModalConfirm.scss';

interface ModalConfirmProps {
   show: boolean;
   onClose: () => void;
   title: string;
   content: string;
   handleConfirm: CallbackFunc | PromiseFunc;
}

function ModalConfirm({
   show,
   onClose,
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
                     <button type="button" onClick={() => onClose()}>
                        No
                     </button>
                     <button
                        onClick={() => {
                           handleConfirm();
                           onClose();
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

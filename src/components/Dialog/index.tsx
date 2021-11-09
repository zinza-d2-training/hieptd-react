import React from 'react';
import './index.scss';

interface DialogProps {
   title: string;
   children: React.ReactNode;
   isOpen: boolean;
   onClose: () => void;
}

const Dialog = ({ title, children, isOpen, onClose }: DialogProps) => {
   if (isOpen) {
      return (
         <div className="dialog">
            <div className="dialog__overlay"></div>
            <div className="dialog__content">
               <div className="dialog__header">
                  <span>{title}</span>
                  <i className="fas fa-times" onClick={onClose}></i>
               </div>
               <div className="dialog__body">{children}</div>
            </div>
         </div>
      );
   } else return null;
};
export default Dialog;

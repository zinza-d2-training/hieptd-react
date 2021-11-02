import React from 'react';
import './Pagination.scss';
import { PaginationProps } from './types';

function Pagination({ info, onChange }: PaginationProps) {
   const { page, lastPage, total, limit } = info;

   const handleChange = (newPage: number) => {
      if (onChange) {
         onChange(newPage);
      }
   };

   return (
      <>
         {!!total && total > limit && (
            <div className="pagination">
               <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => handleChange(page - 1)}
               >
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M19 12H5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M12 19L5 12L12 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
               {page > 1 && (
                  <span onClick={() => handleChange(page - 1)}>{page - 1}</span>
               )}
               <span className="active">{page}</span>
               {page + 1 <= lastPage! && (
                  <span onClick={() => handleChange(page + 1)}>{page + 1}</span>
               )}
               <button
                  type="button"
                  disabled={page >= lastPage!}
                  onClick={() => handleChange(page + 1)}
               >
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M5 12H19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M12 5L19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            </div>
         )}
      </>
   );
}

export default Pagination;

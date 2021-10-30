import React from 'react';
import './Pagination.scss';
import { PaginationProps } from './types';

function Pagination({ info, onChange }: PaginationProps) {
   const { page, lastPage, total, limit } = info;
   console.log({ info });

   const handleChange = (newPage: number) => {
      if (onChange) {
         onChange(newPage);
      }
   };

   return (
      <>
         {total && total > limit && (
            <div className="pagination">
               <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => handleChange(page - 1)}
               >
                  Prev
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
                  Next
               </button>
            </div>
         )}
      </>
   );
}

export default Pagination;

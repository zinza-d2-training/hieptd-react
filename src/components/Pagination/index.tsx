import React from 'react';
import './Pagination.scss';
import { PaginationProps } from './types';

function Pagination({ info, onChange }: PaginationProps) {
   const { total, page, limit } = info;
   const totalPages: number = Math.ceil(total / limit);
   console.log(total);
   const handleChange = (newPage: number) => {
      if (onChange) {
         onChange(newPage);
      }
   };

   return (
      <>
         {total > 10 && (
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
               {page <= totalPages - 2 && (
                  <span onClick={() => handleChange(page + 1)}>{page + 1}</span>
               )}
               <button
                  type="button"
                  disabled={page >= totalPages - 1}
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

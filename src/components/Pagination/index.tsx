import React from 'react';
import './Pagination.scss';
import { PaginationProps } from './types';
import { PrevIcon } from 'components/icons/PrevIcon';
import { NextIcon } from 'components/icons/NextIcon';

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
                  <PrevIcon />
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
                  <NextIcon />
               </button>
            </div>
         )}
      </>
   );
}

export default Pagination;

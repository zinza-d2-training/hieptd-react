import React, { useState } from 'react';
import './index.scss';
interface MultipleSelectProps<T> {
   options: {
      text: string;
      value: T;
   }[];
   value: T[];
   onChange: (item: T[]) => void;
   title: string;
}
function MultipleSelect<T>({
   options,
   value,
   onChange,
   title,
}: MultipleSelectProps<T>) {
   const [show, setShow] = useState<boolean>(false);
   const selectedOptions = React.useMemo<
      {
         text: string;
         value: T;
      }[]
   >(() => {
      return options.filter((option) => value?.includes(option.value));
   }, [options, value]);

   const handleSelectItem = (item: { text: string; value: T }) => {
      if (selectedOptions.includes(item)) {
         onChange(value.filter((_value) => _value !== item.value));
      } else {
         onChange([...value, item.value]);
      }
   };

   return (
      <div className="multipleSelect">
         <div className="multipleSelect__header">
            <label>{title}</label>
            <div
               className={`multipleSelected__btn ${
                  selectedOptions.length > 0 ? 'selected' : ''
               }`}
               onClick={() => setShow(!show)}
            >
               <div className="multipleSelect__selected">
                  {`${
                     selectedOptions.length > 0
                        ? `${selectedOptions.length} selected`
                        : 'Select'
                  }`}
               </div>
               <div className="multipleSelect__icon">
                  {show ? (
                     <i className="fas fa-chevron-up"></i>
                  ) : (
                     <i className="fas fa-chevron-down"></i>
                  )}
               </div>
            </div>
         </div>
         {show && (
            <div className="multipleSelect__list">
               {options.map((item, index) => (
                  <div
                     key={index}
                     className={`multipleSelect__item ${
                        value?.includes(item.value) ? 'selected' : ''
                     }`}
                     onClick={() => handleSelectItem(item)}
                  >
                     {item.text}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default MultipleSelect;

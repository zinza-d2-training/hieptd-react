import { useState, useEffect, useRef } from 'react';
export const useVisible = (initialIsVisible: boolean) => {
   const [isVisible, setIsVisible] = useState(initialIsVisible);
   const ref = useRef<HTMLHeadingElement>(null);

   const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
         setIsVisible(false);
      }
   };

   useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
         document.removeEventListener('click', handleClickOutside, true);
      };
   });

   return { ref, isVisible, setIsVisible };
};

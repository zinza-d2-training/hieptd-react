import { useEffect } from 'react';

export const useTitle = (title: string) => {
   useEffect(() => {
      document.title = `ZinZA - ${title}`;
      // eslint-disable-next-line
   }, [window.location.pathname]);

   return null;
};

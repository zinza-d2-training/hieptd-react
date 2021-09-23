export type PaginationProps = {
   info: {
      total: number;
      page: number;
      limit: number;
   };
   onChange?: Function;
};

export type PaginationProps = {
   info: {
      total?: number;
      page: number;
      lastPage?: number;
      limit: number;
   };
   onChange?: (page: number) => void;
};

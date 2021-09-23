export type filterType = {
   role: any;
   dateOfBirth: string;
   firstName?: string;
   lastName?: string;
   active: boolean;
   search: string;
};

export type PaginationProps = {
   info: {
      total: number;
      page: number;
      limit: number;
   };
   onChange?: Function;
};

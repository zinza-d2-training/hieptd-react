import { UserStatus } from 'utils/types';

export type FilterType = {
   role?: string;
   dob?: string;
   keyword?: string;
   lastName?: string;
   status?: UserStatus;
   endDate?: string;
};

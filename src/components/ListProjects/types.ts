import { ProjectStatus } from 'utils/types';

export type FilterType = {
   keyword?: string;
   endDate?: string;
   status?: ProjectStatus;
};

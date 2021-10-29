import { FilterType } from 'components/ListProjects/types';
import axiosClient from 'utils/axios';
import { Project } from 'utils/types';
import { Response } from 'utils/types';

const projectService = {
   getProjects: async (
      page: number,
      limit: number,
      filterData: FilterType
   ): Promise<Response<Project[]>> => {
      let queries = `page=${page}&limit=${limit}&`;
      if (filterData) {
         Object.keys(filterData).forEach(
            (key) =>
               filterData[key] !== '' &&
               (queries += `${key}=${filterData[key]}&`)
         );
      }

      return await axiosClient.get(`/projects?${queries}`);
   },
};
export default projectService;

import { APIResponseData } from '../../types/api';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v3',
});

export const apiV3 = {
  get: function get<APIData = unknown>(path: string) {
    return axiosInstance.get<APIResponseData<APIData>>(path).then((res) => res.data);
  },
};

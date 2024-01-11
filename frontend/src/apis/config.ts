import axios from 'axios';

const axiosInstance = axios.create({});

export const http = {
  get: function get<Response = unknown>(path: string) {
    return axiosInstance.get<Response>(path).then((res) => res.data);
  },
};

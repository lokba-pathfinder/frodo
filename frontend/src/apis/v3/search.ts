import { SearchResultAPI } from '../../types/api';
import { apiV3 } from './axios';

export const fetchSearchResult = async (query: string, pageParam: number) => {
  const responseData = await apiV3.get<SearchResultAPI>(
    `/search?query=${query}&pageParam=${pageParam}`,
  );
  const { data } = responseData;

  return data;
};

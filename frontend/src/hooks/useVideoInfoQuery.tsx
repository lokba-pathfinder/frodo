import { fetchVideoInfo } from '../apis/v3/common';
import { useQuery } from '@tanstack/react-query';

const useVideoInfoQuery = (videoId: string) => {
  const queryResults = useQuery({
    queryKey: ['videoInfo', videoId],
    queryFn: () => fetchVideoInfo(videoId),
    suspense: true,
  });

  return queryResults;
};

export default useVideoInfoQuery;

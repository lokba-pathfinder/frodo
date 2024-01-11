import { fetchFullScripts } from '../../../apis/detail';
import { useQuery } from '@tanstack/react-query';

const useFullScriptsQuery = (videoId: string) => {
  const queryResults = useQuery({
    queryKey: ['fullScripts', videoId],
    queryFn: () => fetchFullScripts(videoId),
    suspense: true,
  });

  return queryResults;
};

export default useFullScriptsQuery;

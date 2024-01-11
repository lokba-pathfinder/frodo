import { fetchSummaryScripts } from '../../../apis/detail';
import { useQuery } from '@tanstack/react-query';

const useSummaryScriptsQuery = (videoId: string) => {
  const queryResults = useQuery({
    queryKey: ['summaryScripts', videoId],
    queryFn: () => fetchSummaryScripts(videoId),
    suspense: true,
  });

  return queryResults;
};

export default useSummaryScriptsQuery;

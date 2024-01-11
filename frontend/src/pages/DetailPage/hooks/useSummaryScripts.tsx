import { useEffect } from 'react';

import useSummaryScriptsQuery from './useSummaryScriptsQuery';

interface UseSummaryScriptsProps {
  videoId: string;
  onFetched: () => void;
}

const useSummaryScripts = ({ videoId, onFetched }: UseSummaryScriptsProps) => {
  const { data: queryData } = useSummaryScriptsQuery(videoId);
  const summaryScripts = queryData?.data ?? [];

  useEffect(() => {
    onFetched();
  }, [summaryScripts]);

  return summaryScripts;
};

export default useSummaryScripts;

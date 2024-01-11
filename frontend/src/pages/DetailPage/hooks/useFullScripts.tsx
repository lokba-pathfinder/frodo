import { useEffect } from 'react';

import useFullScriptsQuery from './useFullScriptsQuery';

interface UseFullScriptsProps {
  videoId: string;
  onFetched: () => void;
}

const useFullScripts = ({ videoId, onFetched }: UseFullScriptsProps) => {
  const { data } = useFullScriptsQuery(videoId);
  const fullScripts = data?.data ?? [];

  useEffect(() => {
    onFetched();
  }, [fullScripts]);

  return fullScripts;
};

export default useFullScripts;

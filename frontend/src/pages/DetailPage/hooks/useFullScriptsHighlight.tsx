import { useEffect } from 'react';

import { FullScript } from '../../../types/detail';
import { findLast } from '../../../utils/array';
import useHighlightStore from '../store/useHighlightStore';
import usePlayTimeStore from '../store/usePlayTimeStore';

const useFullScriptsHighlight = (fullScripts: FullScript[]) => {
  const [fullScriptIds, setFullScriptIds, setHighlightState] = useHighlightStore((state) => [
    state.fullScriptIds,
    state.setFullScriptIds,
    state.setHighlightState,
  ]);
  const playTime = usePlayTimeStore((state) => state.playTime);

  const updateHighlight = (fullScriptId: string, summaryScriptId: string, startTime: number) => {
    setHighlightState({ fullScriptIds: [fullScriptId], summaryScriptId, startTime });
  };

  useEffect(() => {
    const matchedFullScript = findLast(
      fullScripts ?? [],
      (fullScript) => fullScript.startTime <= playTime,
    );

    if (matchedFullScript === undefined || fullScriptIds.includes(matchedFullScript.id)) {
      return;
    }

    setFullScriptIds([matchedFullScript.id]);
  }, [fullScripts, playTime, setFullScriptIds]);

  return { highlightedIds: fullScriptIds, updateHighlight };
};

export default useFullScriptsHighlight;

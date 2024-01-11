import { useEffect } from 'react';

import { SummaryScript } from '../../../types/detail';
import { findLast } from '../../../utils/array';
import useHighlightStore from '../store/useHighlightStore';
import usePlayTimeStore from '../store/usePlayTimeStore';

const useSummaryScriptsHighlight = (summaryScripts: SummaryScript[]) => {
  const [summaryScriptId, setSummaryScriptId, setHighlightState] = useHighlightStore((state) => [
    state.summaryScriptId,
    state.setSummaryScriptId,
    state.setHighlightState,
  ]);
  const playTime = usePlayTimeStore((state) => state.playTime);

  const updateHighlight = (
    _fullScriptIds: string[],
    _summaryScriptId: string,
    _startTime: number,
  ) => {
    setHighlightState({
      fullScriptIds: [..._fullScriptIds],
      summaryScriptId: _summaryScriptId,
      startTime: _startTime,
    });
  };

  // 유튜브 재생 시간(playtime) 변화에 맞춰 요약 스크립트 하이라이트 업데이트
  useEffect(() => {
    const matchedSummaryScript = findLast(
      summaryScripts ?? [],
      (summaryScript) => summaryScript.startTime <= playTime,
    );

    if (matchedSummaryScript === undefined) {
      return;
    }

    setSummaryScriptId(matchedSummaryScript.id);
  }, [summaryScripts, playTime, setSummaryScriptId]);

  return { highlightedId: summaryScriptId, updateHighlight };
};

export default useSummaryScriptsHighlight;

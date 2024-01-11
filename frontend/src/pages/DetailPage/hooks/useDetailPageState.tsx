import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useLocationState from '../../../hooks/useLocationState';
import { DetailPageLocationState, HighlightState } from '../../../types/detail';
import { isObjectType } from '../../../types/utils';
import useHighlightStore from '../store/useHighlightStore';
import usePlayTimeStore from '../store/usePlayTimeStore';

interface DetailPageState {
  videoId: string;
  fullScriptIds: string[];
  summaryScriptId: string;
  startTime: number;
}

const isDetailPageLocationStateType = (value: unknown): value is DetailPageLocationState => {
  if (!isObjectType(value)) return false;

  return (
    typeof value.startTime === 'number' &&
    typeof value.fullScriptId === 'string' &&
    typeof value.summaryScriptId === 'string'
  );
};

const formatToHighlightState = (
  detailpageLocationState: DetailPageLocationState,
): HighlightState => ({
  fullScriptIds: [detailpageLocationState.fullScriptId],
  summaryScriptId: detailpageLocationState.summaryScriptId,
  startTime: detailpageLocationState.startTime,
});

const useDetailPageState = (): DetailPageState => {
  const videoId = useParams().videoId ?? '';
  const detailPageLocationState = useLocationState<DetailPageLocationState>(
    isDetailPageLocationStateType,
  );

  const [initialStartTime, setInitialStartTime] = useState(0);
  const [fullScriptIds, summaryScriptId, setHighlightState, resetHighlightState] =
    useHighlightStore((state) => [
      state.fullScriptIds,
      state.summaryScriptId,
      state.setHighlightState,
      state.resetHighlightState,
    ]);
  const resetPlayTime = usePlayTimeStore((state) => state.resetPlayTime);

  useEffect(() => {
    resetHighlightState();
    resetPlayTime();
  }, []);

  useEffect(() => {
    if (detailPageLocationState === undefined) {
      return;
    }

    const highlightState: HighlightState = formatToHighlightState(detailPageLocationState);
    setHighlightState(highlightState);
    setInitialStartTime(highlightState.startTime);
  }, [detailPageLocationState, videoId]);

  return { videoId, fullScriptIds, summaryScriptId, startTime: initialStartTime };
};

export default useDetailPageState;

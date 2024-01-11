import { ComponentType } from 'react';

import { VideoInfoProps } from '../components/modules/VideoInfo';
import useVideoInfoQuery from '../hooks/useVideoInfoQuery';
import { PropsWithClassName } from '../types/utils';

interface WithVideoInfoProps extends PropsWithClassName {
  videoId: string;
}

const withVideoInfo =
  (Component: ComponentType<VideoInfoProps>) =>
  ({ videoId, className, ...props }: WithVideoInfoProps) => {
    const { data, isError } = useVideoInfoQuery(videoId);
    const videoInfo = data?.videoInfo;

    if (videoInfo === undefined || isError) {
      return null;
    }

    return <Component videoInfo={videoInfo} className={className} {...props} />;
  };

export default withVideoInfo;

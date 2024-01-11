import { APIResponseData, VideoInfoAPI } from '../../types/api';
import { videoInfos } from '../data/common';
import { isValidVideoId } from '../utils';
import { rest } from 'msw';

const commonHandler = [
  rest.get(`/api/v3/videos/:videoId`, (req, res, ctx) => {
    const { videoId } = req.params;

    if (!isValidVideoId(videoId)) {
      return res(
        ctx.delay(3000),
        ctx.status(400),
        ctx.json({ errorMessage: 'videoId가 유효하지 않습니다.' }),
      );
    }

    return res(
      ctx.delay(3000),
      ctx.status(200),
      ctx.json<APIResponseData<VideoInfoAPI>>({
        data: {
          videoInfo: videoInfos.find((videoInfo) => videoId === videoInfo.videoId) ?? videoInfos[0],
        },
        message: '요청이 성공적으로 처리되었습니다.',
        code: 's000000',
      }),
    );
  }),
];

export default commonHandler;

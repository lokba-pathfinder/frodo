import { fullScripts, summaryScripts } from '../data/detail';
import { isValidVideoId } from '../utils';
import { rest } from 'msw';

const detailHandler = [
  rest.get(`/api/full-scripts/:videoId`, (req, res, ctx) => {
    const { videoId } = req.params;

    if (!isValidVideoId(videoId)) {
      return res(
        ctx.delay(1500),
        ctx.status(400),
        ctx.json({ errorMessage: 'videoId가 유효하지 않습니다.' }),
      );
    }

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({ data: fullScripts, message: '요청이 성공적으로 처리되었습니다.' }),
    );
  }),
  rest.get(`/api/summary-scripts/:videoId`, (req, res, ctx) => {
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
      ctx.json({ data: summaryScripts, message: '요청이 성공적으로 처리되었습니다.' }),
    );
  }),
];

export default detailHandler;

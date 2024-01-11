import { APIResponseData, SearchResultAPI } from '../../types/api';
import { searchDataList } from '../data/search';
import { rest } from 'msw';

const searchHandler = [
  rest.get('/api/v3/search', (req, res, ctx) => {
    const PAGE_SIZE = 10;

    const query = req.url.searchParams.get('query');
    const pageParam = req.url.searchParams.get('pageParam');

    if (query === null || query === '' || pageParam === null || Number(pageParam) < 0) {
      return res(ctx.status(400), ctx.json({ errorMessage: 'query가 제공되지 않았습니다.' }));
    }

    const page = Number(pageParam);

    const startIndex = page * PAGE_SIZE;
    const endIndex = Math.min(searchDataList.length, startIndex + PAGE_SIZE);
    const data = searchDataList.slice(startIndex, endIndex);

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json<APIResponseData<SearchResultAPI>>({
        code: 's001000',
        message: '요청이 성공적으로 처리되었습니다.',
        data: {
          pageParam: page,
          hasNext: endIndex < searchDataList.length,
          total: searchDataList.length,
          searchDataList: data,
        },
      }),
    );
  }),
];

export default searchHandler;

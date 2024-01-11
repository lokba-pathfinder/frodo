import commonHandler from './handlers/commonHandler';
import detailHandler from './handlers/detailHandler';
import searchHandler from './handlers/searchHandler';
import { setupWorker } from 'msw';

export const worker = setupWorker(...detailHandler, ...searchHandler, ...commonHandler);

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/detail/:videoId',
    element: <DetailPage />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;

import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Result = Loadable(lazy(() => import('pages/result/result-page')));
const Test = Loadable(lazy(() => import('pages/component-overview/color')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: '/test/:id',
          element: <Test />
        },
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'support',
          element: <SamplePage />
        },
        {
          path: '/test/create',
          element: <Shadow />
        },
        {
          path: 'tests',
          element: <Typography />
        },
        {
          path: '/result/:id',
          element: <Result />
        }
      ]
    }
  ]
};

export default MainRoutes;

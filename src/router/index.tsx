import DashboardSkeleton from '@/pages/dashboard/components/skeleton.tsx';
import { lazy, Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const Layout = lazy(() => import('@/pages/layout'));
// eslint-disable-next-line react-refresh/only-export-components
const Dashboard = lazy(() => import('@/pages/dashboard'));
// eslint-disable-next-line react-refresh/only-export-components
const User = lazy(() => import('@/pages/sys/user'));
// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('@/pages/sys/menu'));
// eslint-disable-next-line react-refresh/only-export-components
const Role = lazy(() => import('@/pages/sys/role'));
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import('@/pages/login'));
// eslint-disable-next-line react-refresh/only-export-components
const Log = lazy(() => import('@/pages/sys/log/log'));
// eslint-disable-next-line react-refresh/only-export-components
const NotFound = lazy(() => import('@/components/not-found'));

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<DashboardSkeleton />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: 'sys/user',
                element: <User />,
            },
            {
                path: 'sys/role',
                element: <Role />,
            },
            {
                path: 'sys/menu',
                element: <Menu />,
            },
            {
                path: 'sys/log',
                element: <Log />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;

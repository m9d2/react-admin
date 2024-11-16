import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loading from '@/components/loading/loading.tsx';
import DashboardSkeleton from '@/pages/dashboard/components/skeleton.tsx';

const MainLayout = React.lazy(() => import('@/layout'));
const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const User = React.lazy(() => import('@/pages/sys/user'));
const Role = React.lazy(() => import('@/pages/sys/role'));
const Menu = React.lazy(() => import('@/pages/sys/menu'));
const Log = React.lazy(() => import('@/pages/sys/log'));
const Monitor = React.lazy(() => import('@/pages/sys/monitor'));
const NotFound = React.lazy(() => import('@/layout/components/not-found.tsx'));
const Login = React.lazy(() => import('@/pages/login'));
const Serve = React.lazy(() => import('@/pages/business/serve'));

const SuspenseWrapper = ({
  fallback,
  children,
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) => <Suspense fallback={fallback}>{children}</Suspense>;

const routes = [
  {
    path: '/dashboard',
    component: <Dashboard />,
    fallback: <DashboardSkeleton />,
  },
  { path: 'sys/user', component: <User />, fallback: <Loading /> },
  { path: 'sys/role', component: <Role />, fallback: <Loading /> },
  { path: 'sys/menu', component: <Menu />, fallback: <Loading /> },
  { path: 'sys/log', component: <Log />, fallback: <Loading /> },
  { path: 'sys/monitor', component: <Monitor />, fallback: <Loading /> },
  { path: 'business/serve', component: <Serve />, fallback: <Loading /> },
  { path: '*', component: <NotFound />, fallback: <Loading /> },
];

const Root = (
  <Route>
    <Route path="/" element={<MainLayout />}>
      {routes.map(({ path, component, fallback }) => (
        <Route
          key={path}
          path={path}
          element={
            <SuspenseWrapper fallback={fallback}>{component}</SuspenseWrapper>
          }
        />
      ))}
    </Route>
    <Route
      path="/login"
      element={
        <SuspenseWrapper fallback={<Loading />}>
          <Login />
        </SuspenseWrapper>
      }
    />
  </Route>
);

export default Root;

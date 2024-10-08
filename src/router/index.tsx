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
const NotFound = React.lazy(() => import('@/layout/components/not-found.tsx'));
const Login = React.lazy(() => import('@/pages/login'));

const Root = (
  <Route>
    <Route path="/" element={<MainLayout />}>
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="sys/user"
        element={
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        }
      />
      <Route
        path="sys/role"
        element={
          <Suspense fallback={<Loading />}>
            <Role />
          </Suspense>
        }
      />
      <Route
        path="sys/menu"
        element={
          <Suspense fallback={<Loading />}>
            <Menu />
          </Suspense>
        }
      />
      <Route
        path="sys/log"
        element={
          <Suspense fallback={<Loading />}>
            <Log />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/login"
      element={
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      }
    />
  </Route>
);

export default Root;

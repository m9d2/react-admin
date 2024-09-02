import { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loading from '@/components/loading/loading.tsx';
import DashboardSkeleton from '@/pages/dashboard/components/skeleton.tsx';
import Layout from '@/pages/layout';
import Dashboard from '@/pages/dashboard';
import User from '@/pages/sys/user';
import Role from '@/pages/sys/role';
import Menu from '@/pages/sys/menu';
import Log from '@/pages/sys/log';
import NotFound from '@/pages/layout/components/not-found.tsx';
import Login from '@/pages/login';

const Root = (
  <Route>
    <Route path="/" element={<Layout />}>
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

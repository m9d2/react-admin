import {createHashRouter,} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loading from "@/components/loading.tsx";
import DashboardSkeleton from "@/pages/dashboard/components/skeleton.tsx"

const Layout = lazy(() => import('@/pages/layout'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const User = lazy(() => import('@/pages/sys/user'));
const Menu = lazy(() => import('@/pages/sys/menu'));
const Role = lazy(() => import('@/pages/sys/role'));
const Login = lazy(() => import('@/pages/login'));
const Log = lazy(() => import('@/pages/sys/log/log'));

const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "dashboard",
                element: <Suspense fallback={<DashboardSkeleton/>}><Dashboard/></Suspense>
            },
            {
                path: "sys/user",
                element: <Suspense fallback={<Loading/>}><User/></Suspense>
            },
            {
                path: "sys/role",
                element: <Suspense fallback={<Loading/>}><Role/></Suspense>
            },
            {
                path: "sys/menu",
                element: <Suspense fallback={<Loading/>}><Menu/></Suspense>
            },
            {
                path: "sys/log",
                element: <Suspense fallback={<Loading/>}><Log/></Suspense>
            }
        ]
    },
    {
        path: "/login",
        element: <Suspense fallback={<Loading/>}><Login/></Suspense>,
    },
]);

export default router;
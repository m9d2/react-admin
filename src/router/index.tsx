import {createHashRouter,} from "react-router-dom";
import {Suspense} from "react";
import Loading from "@/components/loading.tsx";
import DashboardSkeleton from "@/pages/dashboard/components/skeleton.tsx"
import Layout from "@/pages/layout";
import Dashboard from "@/pages/dashboard";
import User from "@/pages/sys/user";
import Role from "@/pages/sys/role";
import Menu from "@/pages/sys/menu";
import Login from "@/pages/login";
import Log from "@/pages/sys/log/log.tsx";

// const Layout = lazy(() => import('@/pages/layout'));
// const Dashboard = lazy(() => import('@/pages/dashboard'));
// const User = lazy(() => import('@/pages/sys/user'));
// const Menu = lazy(() => import('@/pages/sys/menu'));
// const Role = lazy(() => import('@/pages/sys/role'));
// const Login = lazy(() => import('@/pages/login'));
// const Log = lazy(() => import('@/pages/sys/log/log'));


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
                element: <User/>
            },
            {
                path: "sys/role",
                element: <Role/>
            },
            {
                path: "sys/menu",
                element: <Menu/>
            },
            {
                path: "sys/log",
                element: <Log/>
            }
        ]
    },
    {
        path: "/login",
        element: <Suspense fallback={<Loading/>}><Login/></Suspense>,
    },
]);

export default router;
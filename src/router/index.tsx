import Login from "../pages/login";
import {createHashRouter,} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loading from "@/components/loading.tsx";

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

const router = createHashRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "dashboard",
                element: <Suspense fallback={<Loading/>}><Dashboard/></Suspense>
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
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);

export default router;
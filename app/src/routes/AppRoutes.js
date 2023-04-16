import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Branch = Loadable(lazy(() => import('pages/branch')));
const Warehouse = Loadable(lazy(() => import('pages/warehouse')));
const User = Loadable(lazy(() => import('pages/user')));
const Employee = Loadable(lazy(() => import('pages/employee')));
const Category = Loadable(lazy(() => import('pages/category')));
const Unit = Loadable(lazy(() => import('pages/unit')));
const Material = Loadable(lazy(() => import('pages/material')));
const Customer = Loadable(lazy(() => import('pages/customer')));
const Supplier = Loadable(lazy(() => import('pages/supplier')));

const AppRoutes = (isLoggedIn = false) => [
    {
        path: '/auth/*',
        element: !isLoggedIn ? <MinimalLayout /> : <Navigate to="/" replace />,
        children: [
            {
                path: 'login',
                element: <AuthLogin />
            },
            // {
            //     path: 'register',
            //     element: <AuthRegister />
            // },
            {
                path: '*',
                element: <Navigate to="/auth/login" replace />
            }
        ]
    },
    {
        path: '/',
        element: isLoggedIn ? <MainLayout /> : <Navigate to={'/auth/login'} replace />,
        children: [
            {
                path: '/',
                element: <DashboardDefault />
            },
            {
                path: 'branch',
                element: <Branch />
            },
            {
                path: 'warehouse',
                element: <Warehouse />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'employee',
                element: <Employee />
            },
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'unit',
                element: <Unit />
            },
            {
                path: 'material',
                element: <Material />
            },
            {
                path: 'customer',
                element: <Customer />
            },
            {
                path: 'supplier',
                element: <Supplier />
            },
            {
                path: 'color',
                element: <Color />
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: 'default',
                        element: <DashboardDefault />
                    }
                ]
            },
            {
                path: 'sample-page',
                element: <SamplePage />
            },
            {
                path: 'shadow',
                element: <Shadow />
            },
            {
                path: 'typography',
                element: <Typography />
            },
            {
                path: 'icons/ant',
                element: <AntIcons />
            },
            {
                path: '*',
                element: <Navigate to="/" replace />
            }
        ]
    }
];

export default AppRoutes;

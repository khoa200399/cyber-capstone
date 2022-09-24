import { lazy } from 'react';

export const auth = [
    {
        path: '/auth',
        name: 'Login Page',
        Component: lazy(() => import('../modules/Authentication/index')),
    }
];
const protectedRoutes = [...auth];

export default protectedRoutes;

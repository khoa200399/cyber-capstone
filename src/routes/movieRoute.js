import { lazy } from 'react';

export const movie = [
    {
        path: '/homepage',
        name: 'Movie Page',
        Component: lazy(() => import('../modules/Movie/features/Homepage/index')),
    },
    {
        path: '/homepage/detail/:id',
        name: 'Detail Page',
        Component: lazy(() => import('../modules/Movie/features/Detail/index')),
    }
];
const protectedRoutes = [...movie];

export default protectedRoutes;

import { lazy } from 'react';

export const booking = [
    {
        path: 'booking/:id',
        name: 'Booking Page',
        Component: lazy(() => import('../modules/Movie/features/Booking/index')),
    }, {
        path: '/profile',
        name: 'Profile Page',
        Component: lazy(() => import('../modules/Movie/features/Profile/index')),
    }
];
const protectedRoutes = [...booking];

export default protectedRoutes;

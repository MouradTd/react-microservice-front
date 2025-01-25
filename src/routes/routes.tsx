import { Error404, LoginPage ,PatientList} from '@/pages';
import type { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '*',
        element: <Error404 />
    },
    {
        path: '/patient',
        element: <PatientList />
    },
];

export const Route = () => useRoutes(routes);

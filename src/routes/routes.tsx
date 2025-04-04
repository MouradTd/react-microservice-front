import { AppointementsList, Error404, LoginPage ,PatientList, SallesList , ProductList, ProductConsumption, ProfilePatient} from '@/pages';
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
    {
        path: '/appointements',
        element: <AppointementsList />
    },
    {
        path: '/salle',
        element: <SallesList />
    },
    {
        path: '/products',
        element: <ProductList />
    },
    {
        path: '/product-consumption',
        element: <ProductConsumption />
    },
    {
        path: '/patient/:id',
        element: <ProfilePatient />
    },
];

export const Route = () => useRoutes(routes);

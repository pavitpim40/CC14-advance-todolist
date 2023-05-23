import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';

function Routes({user = null}) {

    let appRoutes = user ? privateRoutes : publicRoutes
    const router = createBrowserRouter(appRoutes);

    return <RouterProvider router={router} />;
}

export default Routes;

// Ex : Array of Router Object 
// const mockedRotes = [
//     {
//         path: '/',
//         element: <h1>Home</h1>,
//     },
//     {
//         path: 'profile',
//         element: <h1>profile</h1>,
//     },
//     {
//         path: 'profile/:id',
//         element: <h1>profile-friend</h1>,
//     },
//     {
//         path: 'about',
//         element: <h1>about</h1>,
//     },
//     {
//         path: '*',
//         element: <Navigate to='/' />,
//     },
// ];

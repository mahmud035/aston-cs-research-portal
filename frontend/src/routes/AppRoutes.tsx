import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import DepartmentPage from '../pages/DepartmentPage';
import ErrorPage from '../pages/ErrorPage';
import FacultyPage from '../pages/FacultyPage';
import Home from '../pages/Home';

const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/departments/:slug',
        element: <DepartmentPage />,
      },
      {
        path: '/faculties/:id',
        element: <FacultyPage />,
      },
    ],
  },
]);

export default appRoutes;

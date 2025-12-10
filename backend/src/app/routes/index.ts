import express from 'express';
import { departmentRoutes } from '../modules/department/department.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
// import { searchRoutes } from '../modules/search/search.route'; // later

const router = express.Router();

const moduleRoutes = [
  {
    path: '/departments',
    route: departmentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

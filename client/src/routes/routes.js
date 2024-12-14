import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import { AdminLayout } from '~/layouts';
import { TeacherLayout } from '~/layouts';


// Pages
//pubnlic pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';

//admin pages
import GetTeacher from '~/pages/AdminPage/GetTeacher';
import CreateTeacher from '~/pages/AdminPage/CreateTeacher';
import GetAttendance from '~/pages/AdminPage/GetAttendance';
import CreateAttendance from '~/pages/AdminPage/CreateAttendance';
import CreateDeduction from '~/pages/AdminPage/CreateDeduction';
import GetSalaryReport from '~/pages/AdminPage/GetSalaryReport';

//teacher pages
import GetMySalaryReport from '~/pages/GetMySalaryReport';
import GetBasicSalary from '~/pages/GetBasicSalary';
import GetMyInfo from '~/pages/GetMyInfo';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.login, layout: HeaderOnly, component: Login },
    { path: config.routes.getMySalaryReport, component: GetMySalaryReport, layout: TeacherLayout},
    { path: config.routes.getMyBasicSalary, component: GetBasicSalary, layout: TeacherLayout, role: 'ROLE_TEACHER'},
];

const privateRoutes = [
    //Admin routes
    { path: config.routes.admin, component: Home, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.getTeacher, component: GetTeacher, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.createTeacher, component: CreateTeacher, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.getAttendance, component: GetAttendance, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.createAttendance, component: CreateAttendance, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.createDeduction, component: CreateDeduction, layout: AdminLayout, role: 'ROLE_ADMIN' },
    { path: config.routes.getSalaryReport, component: GetSalaryReport, layout: AdminLayout, role: 'ROLE_ADMIN' },
    
    //Teacher routes
    { path: config.routes.teacher, component: Home, layout: TeacherLayout, role: 'ROLE_TEACHER'},
    { path: config.routes.getMyInfo, component: GetMyInfo, layout: TeacherLayout, role: 'ROLE_TEACHER'},

    //Manager routes

];

export { publicRoutes, privateRoutes };

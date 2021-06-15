import Cover from './main/Cover';
import Attedance from './attendance/Attendance';
import Request from './request/Request';
// attendance
// request
// main
const routes = [
  {
    path: '/',
    name: 'cover',
    component: Cover
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: Attedance
  },
  {
    path: '/request',
    name: 'request',
    component: Request
  }
]

export default routes;

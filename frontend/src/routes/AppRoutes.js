import HomePage from '../components/HomePage/HomePage';
import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login/Login';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/login',
    component: Login,
  },
];

export default routes;

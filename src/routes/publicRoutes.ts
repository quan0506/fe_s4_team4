import Login from '../Page/auth/login/Login'
import RegisterPage from '../Page/auth/RegisterPage'
const PublicRoutes = {
  login: {
    path: '/login',
    component: Login,
  },
  register: {
    path: '/register',
    component: RegisterPage,
  },

}
export default PublicRoutes;

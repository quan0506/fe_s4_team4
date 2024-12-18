import Login from '../Page/auth/login/Login'
import RegisterPage from '../Page/auth/RegisterPage'
import ForgotPassword from  '../Page/auth/ForgotPassword'
const PublicRoutes = {
  login: {
    path: '/login',
    component: Login,
  },
  register: {
    path: '/register',
    component: RegisterPage,
  },
  ForgotPassword:{
    path: '/forgot-password',
    component :ForgotPassword,
  }

}
export default PublicRoutes;

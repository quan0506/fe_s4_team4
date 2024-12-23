import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';
import PublicRoutes from "../routes/publicRoutes.ts";
import PrivateRoutes from "../routes/privateRoutes.ts";
import PrivateLayoutAdmin from "./PrivateLayoutAdmin.tsx";
import {access_Token} from "../constants/index.js";
import {useMemo} from "react";

function AppLayout() {
  const location = useLocation();
  const {pathname} = location;
  const authed = useMemo(
    () => !!window.localStorage.getItem(access_Token),
    [pathname]
  );
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        {Object.values(PublicRoutes).map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component/>}
          />
        ))}
      </Route>
      {/* Private Routes */}
      {Object.values(PrivateRoutes).map(({ path, component: Component , requiredLogin }) => {
        const isAdminRoute = path.startsWith('/admin');
        return (
          <Route
            key={path}
            path={path}
            element={isAdminRoute ? <PrivateLayoutAdmin /> : <PrivateLayout />}
          >
            <Route index
                   element={requiredLogin || authed ? <Component/> : <Navigate to="/login" />}
            />
          </Route>
        );
      })}
    </Routes>
  );
}

export default AppLayout;

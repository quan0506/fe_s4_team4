import { Route, Routes } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';
import PublicRoutes from "../routes/publicRoutes.ts";
import PrivateRoutes from "../routes/privateRoutes.ts";
import PrivateLayoutAdmin from "./PrivateLayoutAdmin.tsx";

function AppLayout() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        {Object.values(PublicRoutes).map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>

      {/* Private Routes */}
      {Object.values(PrivateRoutes).map(({ path, component: Component }) => {
        const isAdminRoute = path.startsWith('/admin');
        return (
          <Route
            key={path}
            path={path}
            element={isAdminRoute ? <PrivateLayoutAdmin /> : <PrivateLayout />}
          >
            <Route index element={<Component />} />
          </Route>
        );
      })}
    </Routes>
  );
}

export default AppLayout;

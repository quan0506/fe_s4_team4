import {  Route, Routes } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';
import PublicRoutes from "../routes/publicRoutes.ts";
import PrivateRoutes from "../routes/privateRoutes.ts";

function AppLayout() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {Object.values(PublicRoutes).map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {Object.values(PrivateRoutes).map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default AppLayout;

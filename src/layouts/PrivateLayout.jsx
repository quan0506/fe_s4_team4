import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../component/Navbar.jsx";
const PrivateLayout = () => {
  const location = useLocation();

  const shouldHideHeader = location.pathname === '/' || location.pathname.startsWith('/bookinginformation/');
  return (
    <div>
      {!shouldHideHeader && <Header />}
      <div className={!shouldHideHeader ? 'mt-[5.5%]' : ''}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;

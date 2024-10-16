import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../component/Footer";
import Header from "../component/Navbar";

const PrivateLayout = () => {
  const location = useLocation();
  const shouldHideHeader = location.pathname === '/';

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default PrivateLayout;

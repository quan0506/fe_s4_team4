import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../component/Navbar.jsx";
import { Modal } from "antd"; // Import Ant Design Modal component
const PrivateLayout = () => {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (location.pathname === "/" && !modalShown) {
      setIsModalVisible(true);
    }
  }, [location.pathname]);
  const handleModalClose = () => {
    setIsModalVisible(false);
    localStorage.setItem("modalShown", "true");
  };
  const shouldHideHeader = location.pathname === '/' || location.pathname.startsWith('/bookinginformation/');
  return (
    <div>
      {!shouldHideHeader && <Header />}
      <div className={!shouldHideHeader ? 'mt-[5.5%]' : ''}>
        <Outlet />
      </div>
      <Modal
        title="Modal Title"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={false}
      >
        <p>ddd</p>
      </Modal>
    </div>
  );
};

export default PrivateLayout;

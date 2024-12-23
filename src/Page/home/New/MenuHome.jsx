import { useState, useEffect } from 'react';
import {Avatar, Button, Drawer, Dropdown , } from "antd";
import { User, Menu, X, Gift ,ArrowRightFromLine } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import upstashService from "../../../services/upstashService.js";
import {UserOutlined} from "@ant-design/icons";
import { Bed } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import UserStore from "../../../constants/states/user.js";
const HeaderHome = () => {
  const {user}=UserStore()
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("accessToken");
      navigate("/login");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/booking', label: 'Đặt phòng' },
    { to: '/fasterdetails', label: 'Chi nhanh' },
  ];

  const renderMenuItems = () => (
    <ul className={isMobile ? "flex flex-col space-y-4" : "flex space-x-6 text-base font-medium text-white"}>
      {menuItems.map((item, index) => (
        <li key={index} className={isMobile ? "text-lg" : "hover:text-gray-300 cursor-pointer"}>
          <NavLink to={item.to} onClick={() => isMobile && toggleDrawer()}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
  const items = [
    {
      key: '1',
      label: `${user.lastName}`,
      icon: <User />,
    },
    {
      key: '3',
      label:<Link to='/bookinghistory/room'>Lịch sử hoạt động</Link>,
      icon: <CalendarClock  />,
    },
    ...(token ? [
      {
        key: '2',
        label: <div onClick={handleLogout}>Đăng xuất</div>,
        icon: <ArrowRightFromLine size={20} />,
      },

    ] : []),
  ];


  return (
    <div id='menuhome'>
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 sm:px-8 py-4 bg-transparent">
        <div className="text-xl sm:text-2xl font-bold text-white">Logo</div>
        {!isMobile && (
          <nav className="hidden md:block">
            {renderMenuItems()}
          </nav>
        )}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to='/discountcode' className="hidden sm:flex">
            <span className='text-white flex items-center hover:text-amber-400 cursor-pointer text-sm sm:text-base'>
              <Gift className="w-4 h-4 mr-1"/>
              <span className="hidden sm:inline">Special offers</span>
            </span>
          </Link>
          {!isMobile && (
            <>
            {token && (
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items,
                  }}
                >
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
                </Dropdown>
              )}
              {!token && (
                <Link to='/login'>
                  <Button size='middle' className="bg-transparent text-white border-white px-2 sm:px-4">
                    <User className="h-4 w-4 mr-1"/>
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
              )}

            </>
          )}
          {isMobile && (
            <Button
              icon={drawerVisible ? <X /> : <Menu />}
              onClick={toggleDrawer}
              className="text-white bg-transparent border-none shadow-none p-1"
            />
          )}
        </div>
      </header>
      {/*mobiy*/}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        width="80%"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col space-y-6 p-4">
          {renderMenuItems()}
          <Link to='/discountcode' onClick={toggleDrawer}>
            <Button size='large' className="w-full bg-amber-500 text-white border-none">
              <Gift className="h-4 w-4 mr-2"/>
              <span>Special offers</span>
            </Button>
          </Link>
          <Link to='/login' onClick={toggleDrawer}>
            <Button size='large' className="w-full bg-blue-500 text-white border-none">
              <User className="h-4 w-4 mr-2"/>
              <span>Login</span>
            </Button>
          </Link>

          <Button size='large' className="w-full bg-red-500 text-white border-none" onClick={() => { handleLogout(); toggleDrawer(); }}>
            <span>Logout</span>
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
export default HeaderHome;


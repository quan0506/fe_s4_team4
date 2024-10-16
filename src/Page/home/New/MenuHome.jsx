import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Space, Drawer } from "antd";
import { Search, User, Menu, X } from 'lucide-react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";

const HeaderHome = () => {
  const isAuthenticated = upstashService.isAuthenticated();
  const isAdmin = upstashService.isAdmin();
  const isUser = upstashService.isUser();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    {
      key: '1',
      label: 'English',
      countryCode: 'gb'
    },
    {
      key: '2',
      label: 'Deutsch',
      countryCode: 'de'
    },
    {
      key: '3',
      label: 'Français',
      countryCode: 'fr'
    },
    {
      key: '4',
      label: 'TIẾNG VIỆT',
      countryCode: 'vn'
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(items[3]);

  const handleMenuClick = (e) => {
    const selectedItem = items.find(item => item.key === e.key);
    if (selectedItem) {
      setSelectedLanguage(selectedItem);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout this user?');
    if (isLogout) {
      upstashService.logout();
      navigate('/home');
    }
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/find-booking', label: 'Find my Booking' },
    ...(isUser ? [{ to: '/profile', label: 'Profile' }] : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
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

  return (
    <div id='menuhome'>
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 sm:px-8 py-4 bg-transparent">
        <div className="text-2xl font-bold text-white">Logo</div>
        {!isMobile && (
          <nav>
            {renderMenuItems()}
          </nav>
        )}
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <Dropdown
              menu={menuProps}
              trigger={['hover']}
              className='custom-dropdown'
            >
              <a className="text-zinc-50 bg-transparent hover:text-white cursor-pointer" onClick={(e) => e.preventDefault()}>
                <Space>
                  <img
                    src={`https://flagcdn.com/24x18/${selectedLanguage.countryCode}.png`}
                    alt={selectedLanguage.label}
                    className="w-5 h-4 mr-2"
                  />
                  {selectedLanguage.label}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
          {!isMobile && !isAuthenticated && (
            <>
              <Link to='/login'>
                <Button size='large' className="bg-transparent text-white border-white">
                  <User className="h-4 w-4"/>
                  <span> Login</span>
                </Button>
              </Link>
              <Link to='/register'>
                <Button size='large' className="bg-transparent text-white border-white">
                  <span>Register</span>
                </Button>
              </Link>
            </>
          )}
          {!isMobile && isAuthenticated && (
            <Button size='large' className="bg-transparent text-white border-white" onClick={handleLogout}>
              <span>Logout</span>
            </Button>
          )}
          {isMobile && (
            <Button
              icon={drawerVisible ? <X /> : <Menu />}
              onClick={toggleDrawer}
              className="text-white bg-transparent border-none shadow-none"
            />
          )}
        </div>
      </header>
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        width={300}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col space-y-6 p-4">
          {renderMenuItems()}
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button type="text" className="text-left py-2 px-0 hover:bg-transparent">
              <Space>
                <img
                  src={`https://flagcdn.com/24x18/${selectedLanguage.countryCode}.png`}
                  alt={selectedLanguage.label}
                  className="w-5 h-4 mr-2"
                />
                {selectedLanguage.label}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          {!isAuthenticated ? (
            <>
              <Link to='/login' onClick={toggleDrawer}>
                <Button size='large' className="w-full bg-blue-500 text-white border-none">
                  <User className="h-4 w-4 mr-2"/>
                  <span>Login</span>
                </Button>
              </Link>
              <Link to='/register' onClick={toggleDrawer}>
                <Button size='large' className="w-full bg-green-500 text-white border-none">
                  <span>Register</span>
                </Button>
              </Link>
            </>
          ) : (
            <Button size='large' className="w-full bg-red-500 text-white border-none" onClick={() => { handleLogout(); toggleDrawer(); }}>
              <span>Logout</span>
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderHome;

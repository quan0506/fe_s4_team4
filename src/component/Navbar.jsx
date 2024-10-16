import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Space, Menu, Drawer } from 'antd';
import { UserOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const ApiService = {
  isAuthenticated: () => false,
  isAdmin: () => false,
  isUser: () => false,
  logout: () => {},
};

const Header = () => {
  const items = [
    { key: '1', label: 'English', countryCode: 'gb' },
    { key: '2', label: 'Deutsch', countryCode: 'de' },
    { key: '3', label: 'Français', countryCode: 'fr' },
    { key: '4', label: 'TIẾNG VIỆT', countryCode: 'vn' },
  ];

  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(items[3]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    // Call handleResize once to set initial state
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout this user?');
    if (isLogout) {
      ApiService.logout();
      navigate('/home');
    }
  };

  const handleLanguageChange = ({ key }) => {
    const selected = items.find(item => item.key === key);
    setSelectedLanguage(selected);
  };

  const languageMenu = (
    <Menu onClick={handleLanguageChange}>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          <Space>
            <img
              src={`https://flagcdn.com/24x18/${item.countryCode}.png`}
              alt={item.label}
              style={{ width: 20, height: 15 }}
            />
            {item.label}
          </Space>
        </Menu.Item>
      ))}
    </Menu>
  );

  const NavItems = () => (
    <Menu mode="horizontal" style={{ border: 'none', background: 'transparent' }}>
      <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
      <Menu.Item key="rooms"><Link to="/rooms">Rooms</Link></Menu.Item>
      <Menu.Item key="find-booking"><Link to="/find-booking">Find my Booking</Link></Menu.Item>
      {isUser && <Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>}
      {isAdmin && <Menu.Item key="admin"><Link to="/admin">Admin</Link></Menu.Item>}
    </Menu>
  );

  return (
    <div id='menuhome'>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#003366' }}>logo</div>

        {isDesktop ? (
          <nav>
            <NavItems />
          </nav>
        ) : null}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Dropdown overlay={languageMenu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <img
                  src={`https://flagcdn.com/24x18/${selectedLanguage.countryCode}.png`}
                  alt={selectedLanguage.label}
                  style={{ width: 20, height: 15 }}
                />
                <span className="hidden md:inline">{selectedLanguage.label}</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <div className={`flex items-center gap-4 ${isDesktop ? 'md:flex' : 'hidden'}`}>
            {!isAuthenticated && (
              <>
                <Link to='/login'>
                  <Button icon={<UserOutlined />}>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button icon={<UserOutlined />}>Register</Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </div>

          {!isDesktop && (
            <Button
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
            />
          )}

          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setIsMobileMenuOpen(false)}
            visible={isMobileMenuOpen}
          >
            <Menu mode="vertical" style={{ border: 'none' }}>
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="rooms"><Link to="/rooms">Rooms</Link></Menu.Item>
              <Menu.Item key="find-booking"><Link to="/find-booking">Find my Booking</Link></Menu.Item>
              {isUser && <Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>}
              {isAdmin && <Menu.Item key="admin"><Link to="/admin">Admin</Link></Menu.Item>}
              {!isAuthenticated && (
                <>
                  <Menu.Item key="login"><Link to='/login'>Login</Link></Menu.Item>
                  <Menu.Item key="register"><Link to='/register'>Register</Link></Menu.Item>
                </>
              )}
              {isAuthenticated && (
                <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
              )}
            </Menu>
          </Drawer>
        </div>
      </header>
    </div>
  );
};

export default Header;

import {
  ShoppingCart,
  Home,
  Hotel,
  BookOpen,
  Menu,
  X,
  Heart,
  User,
  ArrowRightFromLine, CalendarClock
} from "lucide-react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Button, Dropdown} from "antd";
import {UserOutlined} from "@ant-design/icons";
import UserStore from "../constants/states/user.js";
export const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user}=UserStore()
  const menuItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: Hotel , label: "Đặt phòng", path: "/booking" },
    { icon: BookOpen, label: "Chi nhánh", path: "/fasterdetails" },
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  const items = [
    {
      key: '1',
      label: `${user?.lastName}`,
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
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-3">
              <img src='./logo-Photoroom.png' alt='logo' width={200}/>
          </Link>
        </div>
        {/* Center Section: Menu */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform"/>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* Right Section: Actions */}
        <div className="flex items-center gap-6">
          <Link
            to='/discountcode'
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors"
          >
            <Heart className="w-6 h-6 text-gray-700"/>
            <span className="hidden md:inline font-medium text-gray-700">Special offers</span>
          </Link>
          <button
            onClick={() => setShowCart(!showCart)}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary/80 transition-colors relative"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700"/>
            <span className="hidden md:inline font-medium text-gray-700">Cart</span>
          </button>
          {token ? (
            <Dropdown
              trigger={['click']}
              menu={{
                items,
              }}
            >
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
            </Dropdown>
          ) : (
            <Button>
              <span className="hidden md:inline font-medium text-gray-700">Login</span>
            </Button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary/80 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700"/>
            ) : (
              <Menu className="w-6 h-6 text-gray-700"/>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-4 px-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary"/>
                <span className="font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>

  );
};

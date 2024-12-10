import { useEffect, useMemo, useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import '../Page/Admin/index.css';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

import {
    House,
    LayoutDashboard,
    TicketPercent,
    Settings,
    MessageSquareText,
    HeartPulse,
    Utensils,
    CarTaxiFront,
    ListTodo,
    ChartBar,
    Lectern, Heater, CalendarClock
} from 'lucide-react';
const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const itemRoute = {
    '1': '/admin/IndexDashboard',
    '2': '/admin/branches',
    '3': '/admin/rooms',
    '4': '/admin/reviews',
    '5': '',
    '6': '/admin/spas',
    '7': '/admin/restaurants',
    '8': '/admin/shuttles',
    // '8.1': '/admin/shuttles/schedule',
    '9': '',
    '10': '',

};
const PrivateLayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState(["1"]);
    const [openKey, setOpenKey] = useState<any[] | undefined>(undefined);
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname;
    const { width } = useWindowSize();

    const isTablet = useMemo(() => width && width < 992, [width]);

    useEffect(() => {
        if (isTablet) {
            setDesktopCollapsed(false);
        }
    }, [isTablet]);

    const items: MenuItem[] = [
        getItem("Trang chủ", "1", <LayoutDashboard />),
        getItem("Chi nhanh", "2", <House />),
        getItem("Loại phòng", "3",<Lectern /> ),
        getItem("Đánh giá", "4", <MessageSquareText />),
        getItem("Tiện nghi", "5", <Heater />),
        getItem("Spa", "6",<HeartPulse /> ),
        getItem("Nhà hàng", "7", <Utensils /> ),
        getItem("Đặt xe", "8",<CarTaxiFront /> ),
        // getItem("Đặt xe", "8", <CarTaxiFront />, [
        //     getItem("Lịch đặt xe", "8.1", <CalendarClock />),
        // ]),
        getItem("Khuyến mãi - Giảm Giá", "9", <TicketPercent /> ),
        getItem("Cài đặt", "10", <Settings />),

    ];

    useEffect(() => {
        let currentKey: string;
        currentKey = Object.keys(itemRoute)?.find(key => itemRoute[key as keyof typeof itemRoute] === currentRoute);
        if (currentKey) {
            if (currentKey.includes(".")) {
                const parentKey = currentKey.split(".")[0];
                setOpenKey([parentKey]);
            }
            setActiveKey([currentKey]);
        } else {
            setActiveKey(["0"]);
        }
    }, [currentRoute]);

    return (
        <>
            <Layout hasSider className='app-layout'>
                <Sider
                    breakpoint='lg'
                    collapsedWidth={isTablet ? "0" : "80"}
                    width={230}
                    collapsed={isTablet ? collapsed : desktopCollapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                    trigger={null}
                    style={{
                        transition: "0.3s",
                        height: "100vh",
                        position: "fixed",
                        zIndex: 900,
                        margin: isTablet ? '10px 0px' : '10px 60px',
                        paddingBottom: '10px'
                    }}
                >
                    <div className="logo-vertical "
                         style={{ justifyContent: desktopCollapsed ? "center" : "space-between", padding: "1rem" }}>
                        {desktopCollapsed ? (
                            <button
                                className='toggle-menu-btn'
                                onClick={() => {
                                    if (isTablet) {
                                        setCollapsed(!collapsed);
                                    } else {
                                        setDesktopCollapsed(!desktopCollapsed);
                                    }
                                }}
                            >
                                {desktopCollapsed ? <MdSkipNext /> : <MdSkipPrevious />}
                            </button>
                        ) : (
                            <img
                                onClick={() => {
                                    navigate("/");
                                }}
                                src='./Logo.svg'
                                alt="logo"
                                style={{
                                    width: '150px'
                                }}
                            />
                        )}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={activeKey}
                        selectedKeys={activeKey}
                        openKeys={openKey}
                        items={items}
                        onSelect={(item) => {
                            setActiveKey([item.key as string]);
                            navigate(itemRoute[item.key as string as keyof typeof itemRoute]);
                        }}
                        onOpenChange={(keys) => {
                            setOpenKey(keys as any);
                        }}
                        className="menu h-[100vh] "
                    />
                </Sider>
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: isTablet ? 0 : (desktopCollapsed ? 80 : 200),
                        transition: "margin-left 0.3s",
                        minHeight: "100vh",
                        padding: isTablet ? '0' : '10px 105px'
                    }}
                    onClick={() => {
                        if (!collapsed && width && width < 992) {
                            setCollapsed(true);
                        }
                    }}
                >
                    <Content style={{ paddingTop: 16 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default PrivateLayoutAdmin;

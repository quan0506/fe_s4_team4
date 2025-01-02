import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input, Tooltip, Typography} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBookingSpa from "./ModalBookingSpa";
import '../index.css'
const { Title, Paragraph } = Typography;

export default function IndexBookingSpa() {
    const [listBookingSpa, setListBookingSpa] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBookingSpa, setCurrentBookingSpa] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [searchPhone, setSearchPhone] = useState("");

    const [spas, setSpas] = useState([]);
    const [users, setUsers] = useState(null);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedSpaServiceName, setSelectedSpaServiceName] = useState(null);


    const fetchBookingSpas = async () => {
        try {
            const response = await upstashService.getAllBookingSpa();
            const bookingSpasData = response.data;
            console.log(bookingSpasData);

            const bookingSpas = Object.values(bookingSpasData).flat();

            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const spasResponse = await upstashService.getAllSpas();
            const spas = spasResponse.data;
            setSpas(spas);

            const UserResponse = await upstashService.getAllUsers();
            const users = UserResponse.data;
            setUsers(users);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const userMap = users.reduce((map, user) => {
                map[user.id] = user.userName;
                return map;
            }, {});

            const normalizedData = bookingSpas.map((bookingSpa) => {
                const spa = bookingSpa.spa || {};
                console.log(spa);

                const branchId = spa.branchId;
                const branchName = branchMap[branchId] || "Unknown1";

                const userId = bookingSpa.user?.id;
                const userName = userMap[userId] || "Unknown";

                return {
                    ...bookingSpa,
                    branchName,
                    userName,
                    spaServiceName: spa.spaServiceName || "Unknown2",
                    spaServicePrice: spa.spaServicePrice || 0,
                };
            });

            setListBookingSpa(normalizedData);

        } catch (error) {
            console.error("Failed to fetch Spa:", error);
        }
    };


    const handleAdd = () => {
        setModalType("add");
        setCurrentBookingSpa(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id, branchId) => {
        console.log("Deleting booking spa:", id, branchId);
        Modal.confirm({
            title: "Có chắc chắn muốn xóa lịch đặt spa này?",
            onOk: async () => {
                try {
                    if (!branchId) {
                        message.error("Branch ID is missing!");
                        return;
                    }
                    await upstashService.deleteBookingSpa(branchId, id);
                    message.success("Booking spa deleted successfully!");
                    fetchBookingSpas();
                } catch (error) {
                    console.error("Failed to delete booking spa:", error);
                    message.error("Failed to delete booking spa!");
                }
            },
        });
    };

    const handleSave = async ({ data, branchId, spaId, userId }) => {
        try {
            await upstashService.postBookingSpa(branchId, spaId, userId, data);
            message.success("Thêm lịch đặt spa thành công!");
            fetchBookingSpas();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error during saving:", error?.response?.data || error.message);
            message.error(error?.response?.data?.message || "Failed to save booking!");
        }
    };


    useEffect(() => {
        fetchBookingSpas();
    }, []);

    const filteredBookingSpas = listBookingSpa.filter((bookingSpa) => {
        const matchesBranch = selectedBranch === null || bookingSpa.branchName === selectedBranch;
        const matchesSpaServiceName = selectedSpaServiceName === null || bookingSpa.spaServiceName === selectedSpaServiceName;
        // const matchesSearch = searchId ? bookingSpa.bookingConfirmationCode.includes(searchId) : true;
        const matchesPhone = searchPhone ? bookingSpa.phone?.includes(searchPhone) : true;
        return matchesBranch && matchesSpaServiceName && matchesPhone;
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Chi Nhánh",
            dataIndex: "branchName",
            key: "branchName",
        },
        {
            title: "Tên Spa",
            dataIndex: "spaServiceName",
            key: "spaServiceName",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                        {text}
                    </Paragraph>
                </Tooltip>
            )
        },
        {
            title: "Thời gian phục vụ",
            dataIndex: "spaServiceTime",
            key: "spaServiceTime",
        },
        {
            title: "Thời gian đặt spa",
            dataIndex: "appointmentTime",
            key: "appointmentTime",
            render: (appointmentTime) => {
                const [year, month, day, hour, minute] = appointmentTime;
                return `${day}/${month}/${year} ${hour}:${minute} `;
            },
        },
        {
            title: "Số Lượng",
            dataIndex: "numberOfPeople",
            key: "numberOfPeople",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, bookingSpa) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(bookingSpa.id, bookingSpa.spa?.branchId)}
                        danger
                    />
                </Space>
            ),
        }
    ];

    const branchMenuItems = [
        { key: "all", label: "Tất cả chi nhánh" },
        ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
    ];

    const spaServiceNameItems = [
        { key: "all", label: "Tất cả Spa" },
        ...spas.map((spa) => ({ key: spa.spaServiceName, label: spa.spaServiceName })),
    ];

    return (
        <div className="branch-management">
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>

                <Input
                    placeholder="Tìm kiếm theo số điện thoại"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    style={{ width: 200, marginRight: 8 }}
                />

                <Dropdown
                    menu={{
                        items: branchMenuItems,
                        onClick: ({key}) => setSelectedBranch(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedBranch || "Lọc theo chi nhánh"}</Button>
                </Dropdown>

                <Dropdown
                    menu={{
                        items: spaServiceNameItems,
                        onClick: ({key}) =>
                            setSelectedSpaServiceName(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedSpaServiceName || "Lọc theo spa"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm lịch đặt Spa mới
                </Button>
            </div>

            <Table
                className="branch-table"
                scroll={{x: 1200}}
                columns={columns} dataSource={filteredBookingSpas} rowKey="id"
            />
            <ModalBookingSpa
                type={modalType}
                data={currentBookingSpa}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
                spas={spas}
                users={users}
            />
        </div>
    );
}

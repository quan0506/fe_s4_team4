import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input} from "antd";
import {DeleteOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBookingShuttle from "./ModalBookingShuttle";
import '../index.css'

export default function IndexBookingShuttle() {
    const [listBookingShuttle, setListBookingShuttle] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBookingShuttle, setCurrentBookingShuttle] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [shuttles, setShuttles] = useState([]);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedCarType, setSelectedCarType] = useState(null);

    const fetchBookingShuttles = async () => {
        try {
            const response = await upstashService.getAllBookingShuttle();
            const bookingShuttlesData = response.data;
            console.log(bookingShuttlesData);

            const bookingShuttles = Object.values(bookingShuttlesData).flat();

            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const shuttlesResponse = await upstashService.getAllShuttles();
            const shuttles = shuttlesResponse.data;
            setShuttles(shuttles);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = bookingShuttles.map((bookingShuttle) => ({
                ...bookingShuttle,
                branchName: branchMap[bookingShuttle.branchId] || "Unknown",
            }));
            setListBookingShuttle(normalizedData);
        } catch (error) {
            console.error("Failed to fetch Shuttle:", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentBookingShuttle(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id, branchId) => {
        console.log("Deleting booking shuttle:", id, branchId);
        Modal.confirm({
            title: "Có chắc chắn muốn xóa lịch đặt xe?",
            onOk: async () => {
                try {
                    await upstashService.deleteBookingShuttle(id, branchId);
                    message.success("Xóa lịch đặt xe thành công!");
                    fetchBookingShuttles();
                } catch (error) {
                    message.error("Failed to delete delete bookingshuttle:!");
                }
            },
        });
    };

    const handleSave = async ({ data, branchId, shuttleId }) => {
        try {
            const userId = 1;
            await upstashService.postBookingShuttle(branchId, shuttleId, userId, data);
            message.success("Đặt xe thành công");
            fetchBookingShuttles();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error during saving:", error);
            message.error("Failed to save booking shuttle!");
        }
    };

    const handleSearch = async () => {
        if (!searchId) {
            message.error("Enter a bookingCode to search!");
            return;
        }
        if (!selectedBranch) {
            message.error("Select a branchId to search!");
            return;
        }

        try {
            const response = await upstashService.getBookingShuttleByCode(selectedBranch, searchId);
            const bookingShuttle = response.data;

            if (bookingShuttle) {
                setListBookingShuttle([bookingShuttle]);
            } else {
                message.error("Booking shuttle not found!");
            }
        } catch (error) {
            message.error("Error occurred while searching!");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookingShuttles();
    }, []);

    const filteredBookingShuttles = listBookingShuttle.filter((bookingShuttle) => {
        const matchesBranch = selectedBranch === null || bookingShuttle.branchName === selectedBranch;
        const matchesCarType = selectedCarType === null || bookingShuttle.carType === selectedCarType;
        const matchesSearch = searchId ? bookingShuttle.bookingConfirmationCode.includes(searchId) : true;  // Sử dụng bookingConfirmationCode
        return matchesBranch && matchesSearch && matchesCarType;
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
            title: "Loại Xe",
            dataIndex: "carType",
            key: "carType",
        },
        {
            title: "Giá Xe",
            dataIndex: "carPrice",
            key: "carPrice",
        },
        {
            title: "Ngày Đặt Xe",
            dataIndex: "shuttleCheckInDate",
            key: "shuttleCheckInDate",
            render: (shuttleCheckInDate) => {
                const [year, month, day] = shuttleCheckInDate;
                return `${day}/${month}/${year} `;
            },
        },
        {
            title: "Ngày Hủy",
            dataIndex: "shuttleCheckOutDate",
            key: "shuttleCheckOutDate",
            render: (shuttleCheckOutDate) => {
                const [year, month, day] = shuttleCheckOutDate;
                return `${day}/${month}/${year} `;
            },
        },
        {
            title: "Tổng Tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Email",
            dataIndex: "userEmail",
            key: "userEmail",
        },
        {
            title: "Mã Xác nhận",
            dataIndex: "bookingConfirmationCode",
            key: "bookingConfirmationCode",
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, bookingShuttle) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(bookingShuttle.id, bookingShuttle.branchId)}
                        danger
                        shape="circle"

                    />
                </Space>
            ),
        },
    ];

    const branchMenuItems = [
        { key: "all", label: "Tất cả chi nhánh" },
        ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
    ];

    const shuttleMenuItems = [
        { key: "all", label: "Tất cả loại xe" },
        ...shuttles.map((shuttle) => ({ key: shuttle.carType, label: shuttle.carType })),
    ];

    return (
        <div className="branch-management">
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <Input
                    placeholder="tìm kiếm"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{width: "30%"}}
                    suffix={<SearchOutlined onClick={handleSearch}/>}
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
                        items: shuttleMenuItems,
                        onClick: ({key}) =>
                            setSelectedCarType(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedCarType || "Lọc theo loại xe"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm lịch đặt xe
                </Button>
            </div>

            <Table
                className="branch-table"
                scroll={{x: 1200}}
                columns={columns} dataSource={filteredBookingShuttles} rowKey="id"/>

            <ModalBookingShuttle
                type={modalType}
                data={currentBookingShuttle}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
                shuttles={shuttles}
            />
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, CarOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalUser from "./ModalUser";

export default function IndexUser() {
    const [listUser, setListUser] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

    const fetchUsers = async () => {
        try {
            const userResponse = await upstashService.getAllUsers();
            console.log("Userresponse:", userResponse);
            setListUser(userResponse.data.map((user) => ({ ...user, key: user.id })));
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const fetchBookingHistory = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return;
        }

        try {
            console.log(`Fetching booking history for user ID: ${userId}`);
            const response = await upstashService.gethistoryshuttle(userId);
            console.log("Booking history response:", response);
            setBookingHistory(response.data.data);
            setIsHistoryModalVisible(true);
        } catch (error) {
            console.error("Failed to fetch booking history:", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentUser(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        console.log(`Attempting to delete user with ID: ${id}`);
        Modal.confirm({
            title: "Bạn có chắc chắn xóa khách hàng này?",
            onOk: async () => {
                try {
                    await upstashService.deleteBranch(id);
                    message.success("Xóa khách hàng thành công");
                    fetchUsers();
                } catch (error) {
                    console.error("Failed to delete user:", error);
                    message.error("Failed to delete user");
                }
            },
        });
    };

    const handleSave = async (param) => {
        try {
            console.log("Saving user data:", param);
            if (modalType === "add") {
                await upstashService.registerUser(param);
                message.success("Thêm khách hàng thành công");
            }
            fetchUsers();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Failed to save user:", error);
            message.error("Failed to save user!");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "thisEmail",
            key: "thisEmail",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Thực hiện",
            key: "actions",
            width: 200,
            render: (_, user) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(user.id)}
                        danger
                        shape="circle"
                    />
                    <Button
                        icon={<CarOutlined />}
                        shape="circle"
                        onClick={() => fetchBookingHistory(user.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Thêm khách hàng
            </Button>
            <Table columns={columns} dataSource={listUser} rowKey="id" />
            <Modal
                title="Lịch sử đặt xe"
                visible={isHistoryModalVisible}
                footer={null}
                onCancel={() => setIsHistoryModalVisible(false)}
            >
                {Array.isArray(bookingHistory) && bookingHistory.length > 0 ? (
                    bookingHistory.map((booking) => (
                        <div key={booking.id} style={{ marginBottom: "16px" }}>
                            <p><strong>Branch:</strong> {booking.shuttle.branchName}</p>
                            <p><strong>Car Type:</strong> {booking.shuttle.carType}</p>
                            <p><strong>Car Price:</strong> {booking.shuttle.carPrice}</p>
                            <p><strong>Check-In:</strong> {booking.shuttleCheckInDate.join("-")}</p>
                            <p><strong>Check-Out:</strong> {booking.shuttleCheckOutDate.join("-")}</p>
                        </div>
                    ))
                ) : (
                    <p>No booking history available.</p>
                )}
            </Modal>

            <ModalUser
                type={modalType}
                data={currentUser}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
            />
        </div>
    );
}

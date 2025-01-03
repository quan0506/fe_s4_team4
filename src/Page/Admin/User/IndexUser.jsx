import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message, Alert } from "antd";
import { PlusOutlined, DeleteOutlined, CarOutlined ,} from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalUser from "./ModalUser";
import { HeartPulse, Utensils  } from "lucide-react";

export default function IndexUser() {
    const [listUser, setListUser] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [shuttleHistory, setShuttleHistory] = useState([]);
    const [spaHistory, setSpaHistory] = useState([]);
    const [restaurantHistory, setRestaurantHistory] = useState([]);
    // const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [isShuttleHistoryVisible, setIsShuttleHistoryVisible] = useState(false);
    const [isSpaHistoryVisible, setIsSpaHistoryVisible] = useState(false);
    const [isRestaurantHistoryVisible, setIsRestaurantHistoryVisible] = useState(false);

    const fetchUsers = async () => {
        try {
            const userResponse = await upstashService.getAllUsers();
            console.log("Userresponse:", userResponse);
            setListUser(userResponse.data.map((user) => ({ ...user, key: user.id })));
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const fetchShuttleHistory = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return;
        }

        try {
            console.log(`Fetching shuttle history for user ID: ${userId}`);
            const response = await upstashService.gethistoryshuttle(userId);
            const shuttleHistory = response.data;

            if (Array.isArray(shuttleHistory) && shuttleHistory.length > 0) {
                setShuttleHistory(shuttleHistory);
            } else {
                setShuttleHistory([]);
            }

            setIsShuttleHistoryVisible(true);
        } catch (error) {
            console.error("Failed to fetch booking history:", error);
            setShuttleHistory([]);
            setIsShuttleHistoryVisible(true);
        }
    };

    const fetchSpaHistory = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return;
        }

        try {
            console.log(`Fetching spa history for user ID: ${userId}`);
            const spaResponse = await upstashService.gethistoryspa(userId);
            const spaHistory = spaResponse.spaBookingList;

            if (Array.isArray(spaHistory) && spaHistory.length > 0) {
                setSpaHistory(spaHistory);
            } else {
                setSpaHistory([]);
            }

            setIsSpaHistoryVisible(true);
        } catch (error) {
            console.error("Failed to fetch booking history:", error);
            setSpaHistory([]);
            setIsSpaHistoryVisible(true);
        }
    };

    const fetchRestaurantHistory = async (userId) => {
        if (!userId) {
            console.error("Invalid user ID:", userId);
            return;
        }

        try {
            console.log(`Fetching restaurant history for user ID: ${userId}`);
            const restaurantResponse = await upstashService.gethistoryrestaurant(userId);
            const restaurantHistory = restaurantResponse.restaurantBookingList;

            if (Array.isArray(restaurantHistory) && restaurantHistory.length > 0) {
                setRestaurantHistory(restaurantHistory);
            } else {
                setRestaurantHistory([]);
            }

            setIsRestaurantHistoryVisible(true);
        } catch (error) {
            console.error("Failed to fetch booking history:", error);
            setRestaurantHistory([]);
            setIsRestaurantHistoryVisible(true);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentUser(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (thisEmail) => {
        console.log(`Attempting to delete user with thisEmail: ${thisEmail}`);
        Modal.confirm({
            title: "Bạn có chắc chắn xóa khách hàng này?",
            onOk: async () => {
                try {
                    await upstashService.deleteUser(thisEmail);
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
                        onClick={() => handleDelete(user.thisEmail)}
                        danger
                        shape="circle"
                    />
                    <Button
                        icon={<CarOutlined />}
                        shape="circle"
                        onClick={() => fetchShuttleHistory(user.id)}
                    />
                    <Button
                        icon={<HeartPulse />}
                        shape="circle"
                        onClick={() => fetchSpaHistory(user.id)}
                    />

                    <Button
                        icon={< Utensils/>}
                        shape="circle"
                        onClick={() => fetchRestaurantHistory(user.id)}
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
                title="Lịch sử dat xe"
                visible={isShuttleHistoryVisible}
                footer={null}
                onCancel={() => setIsShuttleHistoryVisible(false)}
            >
                {Array.isArray(shuttleHistory) && shuttleHistory.length > 0 ? (
                    shuttleHistory.map((bookingShuttle) => (
                        <div key={bookingShuttle.id} style={{ marginBottom: "16px" }}>
                            <p><strong>Branch:</strong> {bookingShuttle.shuttle.branchName}</p>
                            <p><strong>Car Type:</strong> {bookingShuttle.shuttle.carType}</p>
                            <p><strong>Car Price:</strong> {bookingShuttle.shuttle.carPrice.toLocaleString()} VND</p>
                            <p><strong>Check-In:</strong> {bookingShuttle.shuttleCheckInDate.join("-")}</p>
                            <p><strong>Check-Out:</strong> {bookingShuttle.shuttleCheckOutDate.join("-")}</p>
                            <p><strong>Total Price:</strong> {bookingShuttle.totalPrice.toLocaleString()} VND</p>
                            <p><strong>User:</strong> {bookingShuttle.user.firstName} {bookingShuttle.user.lastName}</p>
                        </div>
                    ))
                ) : (
                    <Alert
                        message="Không có lịch sử cho dịch vụ này"
                        type="info"
                        showIcon
                    />
                )}
            </Modal>

            <Modal
                title="Lịch sử dat spa"
                visible={isSpaHistoryVisible}
                footer={null}
                onCancel={() => setIsSpaHistoryVisible(false)}
            >
                {Array.isArray(spaHistory) && spaHistory.length > 0 ? (
                    spaHistory.map((booking) => (
                        <div key={booking.id} style={{marginBottom: "16px"}}>
                            <p><strong>Branch:</strong> {booking.spa.branchName}</p>
                            <p><strong>spaServiceName :</strong> {booking.spa.spaServiceName}</p>
                            <p><strong>spaServicePrice</strong> {booking.spa.spaServicePrice.toLocaleString()} VND</p>
                            <p><strong>appointmentTime</strong> {booking.appointmentTime.join("-")}</p>
                            <p><strong>spaServiceTime</strong> {booking.spaServiceTime}</p>
                            <p><strong>description</strong> {booking.description}</p>

                            <p><strong>numberofPeople</strong> {booking.numberOfPeople}</p>
                            <p><strong>phone</strong>{booking.user.phone}</p>
                            <p><strong>User:</strong> {booking.user.firstName} {booking.user.lastName}</p>
                        </div>
                    ))
                ) : (
                    <Alert
                        message="Không có lịch sử cho dịch vụ này"
                        type="info"
                        showIcon
                    />
                )}
            </Modal>

            <Modal
                title="Lịch sử nha hang"
                visible={isRestaurantHistoryVisible}
                footer={null}
                onCancel={() => setIsRestaurantHistoryVisible(false)}
            >
                {Array.isArray(restaurantHistory) && restaurantHistory.length > 0 ? (
                    restaurantHistory.map((booking) => (
                        <div key={booking.id} style={{marginBottom: "16px"}}>
                            <p><strong>Branch:</strong> {booking.restaurant.branchName}</p>
                            <p><strong>restaurantType</strong> {booking.restaurant.restaurantType}</p>
                            <p><strong>totalPrice</strong> {booking.totalPrice.toLocaleString()} VND</p>
                            <p><strong>dayCheckIn</strong> {booking.dayCheckIn.join("-")}</p>
                            <p><strong>numOfAdults</strong> {booking.numOfAdults}</p>
                            <p><strong>time</strong> {booking.restaurant.time}</p>
                            <p><strong>numOfChildren</strong> {booking.numOfChildren}</p>
                            <p><strong>phone</strong>{booking.user.phone}</p>
                            <p><strong>User:</strong> {booking.user.firstName} {booking.user.lastName}</p>
                        </div>
                    ))
                ) : (
                    <Alert
                        message="Không có lịch sử cho dịch vụ này"
                        type="info"
                        showIcon
                    />
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

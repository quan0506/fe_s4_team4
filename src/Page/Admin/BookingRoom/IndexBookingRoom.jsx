import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message, Dropdown } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBookingRoom from "./ModalBookingRoom";

export default function IndexBookingRoom() {
    const [listBookingRoom, setListBookingRoom] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBookingRoom, setCurrentBookingRoom] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const fetchBookingRooms = async () => {
        try {
            const bookingRoomResponse = await upstashService.getAllBookingRoom();
            console.log("Booking Room Response:", bookingRoomResponse);

            const roomsResponse = await upstashService.getAllRoom();
            console.log("Rooms Response:", roomsResponse);
            const rooms = Array.isArray(roomsResponse?.data) ? roomsResponse.data : [];
            setRooms(rooms);
            const bookingRoomsData = Array.isArray(bookingRoomResponse?.bookings) ? bookingRoomResponse.bookings : [];

            const normalizedData = bookingRoomsData.map((booking) => {
                const room = rooms.find((r) => r.roomType === booking.roomType);
                return {
                    ...booking,
                    roomPrice: room?.roomPrice || 0,
                    photos: room?.photos || [],
                    description: room?.description || "No description available",
                };
            });

            setListBookingRoom(normalizedData);
        } catch (error) {
            console.error("Failed to fetch Room:", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentBookingRoom(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        console.log("Deleting booking room:", id);
        Modal.confirm({
            title: "Are you sure you want to delete this booking room?",
            onOk: async () => {
                try {
                    await upstashService.deleteBookingRoom(id);
                    message.success("Booking room deleted success!");
                    fetchBookingRooms();
                } catch (error) {
                    message.error("Failed to delete bookingroom!");
                }
            },
        });
    };

    const handleSave = async ({ param }) => {
        try {
            await upstashService.postbookingsRoom(param);
            message.success("Booking room added success!");
            fetchBookingRooms();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error during saving:", error);
            message.error("Failed to save booking room!");
        }
    };

    useEffect(() => {
        fetchBookingRooms();
    }, []);

    const filteredBookingRooms = Array.isArray(listBookingRoom)
        ? listBookingRoom.filter((bookingRoom) => {
            const matchesRoomType = selectedRoomType === null || bookingRoom.roomType === selectedRoomType;
            return matchesRoomType;
        })
        : [];

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Người đặt",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Loại Phòng",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Số Người Lớn",
            dataIndex: "adults",
            key: "adults",
        },
        {
            title: "Số Trẻ em",
            dataIndex: "children",
            key: "children",
        },
        {
            title: "Ngày Đặt Phòng",
            dataIndex: "checkInDate",
            key: "checkInDate",
            render: (checkInDate) => {
                const [year, month, day] = checkInDate;
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Ngày Trả Phòng",
            dataIndex: "checkOutDate",
            key: "checkOutDate",
            render: (checkOutDate) => {
                const [year, month, day] = checkOutDate;
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Tổng Tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Mã Xác Nhận",
            dataIndex: "confirmBookingCode",
            key: "confirmBookingCode",
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, bookingRoom) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(bookingRoom.bookingId)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    const roomMenuItems = [
        { key: "all", label: "Tất cả loại phòng" },
        ...rooms.map((room) => ({ key: room.roomType, label: room.roomType })),
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Dropdown
                    menu={{
                        items: roomMenuItems,
                        onClick: ({ key }) => setSelectedRoomType(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedRoomType || "Lọc theo Loại phòng"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Thêm Lịch đặt phòng
                </Button>
            </div>

            <Table columns={columns} dataSource={filteredBookingRooms} rowKey="bookingId" />

            <ModalBookingRoom
                type={modalType}
                data={currentBookingRoom}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                rooms={rooms}
            />
        </div>
    );
}

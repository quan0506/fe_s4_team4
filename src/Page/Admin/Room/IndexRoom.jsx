import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalRoom from "./ModalRoom";

export default function IndexRoom() {
    const [listRoom, setListRoom] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");

    const fetchRooms = async () => {
        try {
            const rooms = await upstashService.getAllRoom();
            const normalizedData = rooms.map(room => ({
                ...room,
                photos: Array.isArray(room.photos)
                    ? room.photos.map(photo =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : (typeof room.photos === 'string' ? room.photos.split(", ") : []),
            }));
            setListRoom(normalizedData);
        } catch (error) {
            console.error("Failed to fetch roomes:", error);
        }
    };

    const handleSearch = async () => {
        // if (!searchId) {
        //     message.error("Please enter an ID to search!");
        //     return;
        // }
        //
        // try {
        //     const room = await upstashService.getroomesid(searchId);
        //     setListroom([room]);
        // } catch (error) {
        //     message.error("room not found!");
        // }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentRoom(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Are you delete this room?",
            onOk: async () => {
                try {
                    await upstashService.deleteRoom(id);
                    message.success("Room delete success");
                    fetchRooms();
                } catch (error) {
                    message.error("Failed to delete room!");
                }
            },
        });
    };

    const handleEdit = (room) => {
        setModalType("edit");
        const roomWithPhotos = {
            ...room,
            photos: Array.isArray(room.photos)
                ? room.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentRoom(roomWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (modalType === "add") {
                await upstashService.addRoom(data);
                message.success("room added successfully!");
            } else if (modalType === "edit") {
                // Ensure the `id` field is sent for updating
                await upstashService.updateRoom(currentRoom.id, data);
                message.success("room updated successfully!");
            }
            fetchRooms();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save room!");
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);
    //
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Room Type",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Room Price",
            dataIndex: "roomPrice",
            key: "roomPrice",
        },
        {
            title: "Photos",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <div style={{ gap: "8px" }}>
                    {photos.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Room Photo ${index + 1}`}
                            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "4px" }}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Brand Id",
            dataIndex: "roomId",
            key: "brandId",
        },
        {
            title: "Booking",
            dataIndex: "bookings",
            key: "bookings",
        },
        {
            title: "Booked",
            dataIndex: "booked",
            key: "booked",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, room) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(room)}
                        type="primary"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(room.id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Input
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ width: "30%" }}
                    suffix={<SearchOutlined onClick={handleSearch} />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add room
                </Button>
            </div>
            <Table columns={columns} dataSource={listRoom} rowKey="id" />
            <ModalRoom
                type={modalType}
                data={currentRoom}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
            />
        </div>
    );
}
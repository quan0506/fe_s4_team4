import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message, Dropdown, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalRoom from "./ModalRoom";

export default function IndexRoom() {
    const [listRoom, setListRoom] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchRooms = async () => {
        try {
            const rooms = await upstashService.getAllRoom();
            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = rooms.map((room) => ({
                ...room,
                branchName: branchMap[room.branchId] || "Unknown",
                photos: Array.isArray(room.photos)
                    ? room.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof room.photos === "string"
                        ? room.photos.split(", ")
                        : [],
            }));
            setListRoom(normalizedData);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentRoom(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this room?",
            onOk: async () => {
                try {
                    await upstashService.deleteRoom(id);
                    message.success("Room deleted successfully!");
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
            if (!data.branchId) {
                message.error("Branch ID is required.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addRoom(data);
                message.success("Room added successfully!");
            } else if (modalType === "edit") {
                await upstashService.updateRoom(currentRoom.id, data);
                message.success("Room updated successfully!");
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

    const filteredRooms = listRoom.filter((room) => {
        const matchesBranch = selectedBranch === null || room.branchName === selectedBranch;
        const matchesSearch = searchId ? room.id.includes(searchId) : true;
        return matchesBranch && matchesSearch;
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Branch Name",
            dataIndex: "branchName",
            key: "branchName",
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
            title: "Bookings",
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

    const branchMenuItems = [
        { key: "all", label: "All Branches" },
        ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Input
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ width: "30%" }}
                />
                <Dropdown
                    menu={{
                        items: branchMenuItems,
                        onClick: ({ key }) => setSelectedBranch(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedBranch || "Filter by Branch"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add Room
                </Button>
            </div>

            <Table columns={columns} dataSource={filteredRooms} rowKey="id" />

            <ModalRoom
                type={modalType}
                data={currentRoom}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
            />
        </div>
    );
}

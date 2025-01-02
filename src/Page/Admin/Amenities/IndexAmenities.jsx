import React, { useEffect, useState } from "react";
import {Table, Button, message, Space, Modal, Dropdown, Menu} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalAmenities from "./ModalAmenities.jsx";

export default function IndexAmenitie() {
    const [listAmenitie, setListAmenitie] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentAmenitie, setCurrentAmenitie] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [rooms, setRooms] = useState([]);

    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const fetchAmenities = async () => {
        try {
            const amentitiesResponse = await upstashService.getAllAmenities();
            const roomsResponse = await upstashService.getAllRoom();
            console.log("roomsRes", roomsResponse);

            const amentities = amentitiesResponse.data || [];
            const rooms = roomsResponse || [];

            const normalizedData = amentities.map((amentitie) => ({
                ...amentitie,
                photos: Array.isArray(amentitie.photos)
                    ? amentitie.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof amentitie.photos === "string"
                        ? amentitie.photos.split(", ")
                        : [],
            }));

            setListAmenitie(normalizedData);
            setRooms(rooms)
        } catch (error) {
            console.error("Fail fetch amenities:", error);
            message.error("Failed to load data.");
        }
    };

    useEffect(() => {
        fetchAmenities();
    }, [isModalVisible]);

    const handleAdd = () => {
        setModalType("add");
        setCurrentAmenitie(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Bạn có muốn xóa tiện nghi này?",
            onOk: async () => {
                try {
                    await upstashService.deleteAmentities(id);
                    message.success("Xóa tiện nghi thành công");
                    fetchAmenities();
                } catch (error) {
                    message.error("Failed to delete amenities", error);
                }
            },
        });
    };

    const handleEdit = (amenitie) => {
        setModalType("edit");
        const amenitieWithPhotos = {
            ...amenitie,
            photos: Array.isArray(amenitie.photos)
                ? amenitie.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentAmenitie(amenitieWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (modalType === "add") {
                await upstashService.addAmentities(data);
                message.success("Thêm đánh giá thành công");
            }else if (modalType === "edit") {
                await upstashService.updateAmenities(currentAmenitie.id, data);
                message.success("Chỉnh sửa phòng thành công");
            }
            fetchAmenities();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save amenities!", error);
        }
    };

    const filteredAmenities = listAmenitie.filter((amenitie) => {
        const matchesRoomType = selectedRoomType === null || amenitie.roomType === selectedRoomType;
        const matchesSearch = searchId ? amenitie.id.includes(searchId) : true;
        return matchesRoomType && matchesSearch;
    });

    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Loại Phòng",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Tiện nghi",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {photos.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Amenities Photo ${index + 1}`}
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </div>
            ),
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, amenitie) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(amenitie)}
                        type="primary"
                        shape="circle"

                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(amenitie.id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    const roomTypeMenuItems = [
        { key: "all", label: "Tất cả loại phòng" },
        ...rooms.map((room) => ({ key: room.roomType, label: room.roomType })),
    ];

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm tiện nghi
                </Button>
                <div style={{display: "flex", gap: "8px"}}>
                    <Dropdown
                        menu={{
                            items: roomTypeMenuItems,
                            onClick: ({key}) =>
                                setSelectedRoomType(key === "all" ? null : key),
                        }}
                    >
                        <Button>{selectedRoomType || "Lọc theo loại phòng"}</Button>
                    </Dropdown>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredAmenities}
                rowKey="id"
                className="branch-table"
                scroll={{ x: 1200 }}
            />
            <ModalAmenities
                type={modalType}
                data={currentAmenitie}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                rooms={rooms}
            />
        </div>
    );
}


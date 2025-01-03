import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input, Tooltip, Typography, Carousel} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalRoom from "./ModalRoom";
import '../index.css'
const { Title, Paragraph } = Typography;

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
            console.error("Lỗi khi tải danh sách phòng :", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentRoom(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa phòng này?",
            onOk: async () => {
                try {
                    await upstashService.deleteRoom(id);
                    message.success("Phòng được xóa thành công ");
                    fetchRooms();
                } catch (error) {
                    message.error("Lỗi khi xóa phòng !", error);
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
                message.error("ID Chi Nhánh là bắt buộc.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addRoom(data);
                message.success("Thêm mới phòng thành công!");
            } else if (modalType === "edit") {
                await upstashService.updateRoom(currentRoom.id, data);
                message.success("Chỉnh sửa phòng thành công");
            }
            fetchRooms();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Lỗi khi lưu phòng", error);
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
            title: "Chi Nhánh",
            dataIndex: "branchName",
            key: "branchName",
        },
        {
            title: "Loại Phòng",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Giá Phòng",
            dataIndex: "roomPrice",
            key: "roomPrice",
        },
        {
            title: "Hình Ảnh",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
              <div style={{width: 120}}>
                  <Carousel autoplay>
                      {photos.map((url, index) => (
                        <div key={index}>
                            <img
                              src={url}
                              alt={`Branch Photo ${index + 1}`}
                              style={{
                                  width: "100%",
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: "8px",
                              }}
                            />
                        </div>
                      ))}
                  </Carousel>
              </div>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: 400,
            render: (text) => (
              <Tooltip title={text}>
                  <Paragraph ellipsis={{rows: 2, expandable: false, symbol: '...'}}>
                      {text}
                  </Paragraph>
              </Tooltip>
            )
        },
        // {
        //     title: "Bookings",
        //     dataIndex: "bookings",
        //     key: "bookings",
        // },
        // {
        //     title: "Booked",
        //     dataIndex: "booked",
        //     key: "booked",
        // },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, room) => (
              <Space>
              <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(room)}
                    type="primary"
                    shape="circle"

                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(room.id)}
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

    return (
        <div className="branch-management">

            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <Input
                    placeholder="Tìm kiếm"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{width: "30%"}}
                />
                <Dropdown
                    menu={{
                        items: branchMenuItems,
                        onClick: ({key}) => setSelectedBranch(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedBranch || "Lọc theo chi nhánh"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm Phòng
                </Button>
            </div>

            <Table
                className="branch-table"
                scroll={{x: 1200}}
                columns={columns} dataSource={filteredRooms} rowKey="id"/>

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

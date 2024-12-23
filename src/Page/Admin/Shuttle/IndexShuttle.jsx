import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input, Tooltip, Typography, Carousel} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalShuttle from "./ModalShuttle";
import '../index.css'
const { Title, Paragraph } = Typography;

export default function IndexShuttle() {
    const [listShuttle, setListShuttle] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentShuttle, setCurrentShuttle] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchShuttles = async () => {
        try {
            const response = await upstashService.getAllShuttles();
            const shuttles = response.data;

            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = shuttles.map((shuttle) => ({
                ...shuttle,
                branchName: branchMap[shuttle.branchId] || "Unknown",
                photos: Array.isArray(shuttle.photos)
                    ? shuttle.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof shuttle.photos === "string"
                        ? shuttle.photos.split(", ")
                        : [],
            }));
            setListShuttle(normalizedData);
        } catch (error) {
            console.error("Failed to fetch Shuttle:", error);
        }
    };


    const handleAdd = () => {
        setModalType("add");
        setCurrentShuttle(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id, branchId) => {
        Modal.confirm({
            title: "Chắc chắn xóa dịch vụ đặt xe?",
            onOk: async () => {
                try {
                    await upstashService.deleteShuttle(id, branchId);
                    message.success("Xóa DV đặt xe thành công!");
                    fetchShuttles();
                } catch (error) {
                    message.error("Failed to delete shuttle!");
                }
            },
        });
    };

    const handleEdit = (shuttle) => {
        setModalType("edit");
        const shuttleWithPhotos = {
            ...shuttle,
            photos: Array.isArray(shuttle.photos)
                ? shuttle.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentShuttle(shuttleWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (!data.branchId) {
                message.error("Branch ID is required.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addShuttle(data);
                message.success("Thêm DV đặt xe thành công!");
            } else if (modalType === "edit") {
                await upstashService.updateShuttle(currentShuttle.id, data);
                message.success("Cập nhật DV đặt xe thành công ");
            }
            fetchShuttles();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save room!");
        }
    };

    useEffect(() => {
        fetchShuttles();
    }, []);

    const filteredShuttles = listShuttle.filter((shuttle) => {
        const matchesBranch = selectedBranch === null || shuttle.branchName === selectedBranch;
        const matchesSearch = searchId ? shuttle.id.includes(searchId) : true;
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
            dataIndex: "carDescription",
            key: "carDescription",
            width: 400,
            render: (text) => (
                <Tooltip title={text}>
                    <Paragraph ellipsis={{rows: 2, expandable: false, symbol: '...'}}>
                        {text}
                    </Paragraph>
                </Tooltip>
            )
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, shuttle) => (
                <Space>
                    <Button
                        icon={<EditOutlined/>}
                        onClick={() => handleEdit(shuttle)}
                        type="primary"
                        shape="circle"

                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(shuttle.id, shuttle.branchId)}
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
                    Add Shuttle
                </Button>
            </div>

            <Table
                className="branch-table"
                scroll={{x: 1200}}
                columns={columns} dataSource={filteredShuttles} rowKey="id"/>

            <ModalShuttle
                type={modalType}
                data={currentShuttle}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
            />
        </div>
    );
}

import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input, Tooltip, Typography, Carousel} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalRestaurant from "./ModalRestaurant.jsx";
import '../index.css'
const { Title, Paragraph } = Typography;

export default function IndexRestaurant() {
    const [listRestaurant, setListRestaurant] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchRestaurants = async () => {
        try {
            const response = await upstashService.getAllRestaurant();
            const restaurants = response.data;
            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = restaurants.map((restaurant) => ({
                ...restaurant,
                branchName: branchMap[restaurant.branchId] || "Unknown",
                photos: Array.isArray(restaurant.photos)
                    ? restaurant.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof restaurant.photos === "string"
                        ? restaurant.photos.split(", ")
                        : [],
            }));
            setListRestaurant(normalizedData);
        } catch (error) {
            console.error("Failed to fetch Restaurant:", error);
        }
    };


    const handleAdd = () => {
        setModalType("add");
        setCurrentRestaurant(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Có chắc chắn xóa nhà hàng này?",
            onOk: async () => {
                try {
                    await upstashService.deleteRestaurant(id);
                    message.success("Xóa nhà hàng thành công!");
                    fetchRestaurants();
                } catch (error) {
                    message.error("Failed to delete restaurant!", error);
                }
            },
        });
    };

    const handleEdit = (restaurant) => {
        setModalType("edit");
        const restaurantWithPhotos = {
            ...restaurant,
            photos: Array.isArray(restaurant.photos)
                ? restaurant.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentRestaurant(restaurantWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (!data.branchId) {
                message.error("Branch ID is required.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addRestaurant(data);
                message.success("Thêm Nhà hàng thành công");
            } else if (modalType === "edit") {
                await upstashService.updateRestaurant(currentRestaurant.id, data);
                message.success("Cập nhật nhà hàng thành công");
            }
            fetchRestaurants();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save restaurant!", error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const filteredRestaurants = listRestaurant.filter((restaurant) => {
        const matchesBranch = selectedBranch === null || restaurant.branchName === selectedBranch;
        const matchesSearch = searchId ? restaurant.id.includes(searchId) : true;
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
            title: "Loại Nhà Hàng",
            dataIndex: "restaurantType",
            key: "restaurantType",
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Giá Người lớn",
            dataIndex: "restaurantAdultPrice",
            key: "restaurantAdultPrice",
        },
        {
            title: "Giá Trẻ em",
            dataIndex: "restaurantChildrenPrice",
            key: "restaurantChildrenPrice",
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
            dataIndex: "restaurantDescription",
            key: "restaurantDescription",
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
            render: (_, restaurant) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(restaurant)}
                        type="primary"
                        shape="circle"

                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(restaurant.id)}
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
                {/*<Input*/}
                {/*    placeholder="Tìm kiếm"*/}
                {/*    value={searchId}*/}
                {/*    onChange={(e) => setSearchId(e.target.value)}*/}
                {/*    style={{width: "30%"}}*/}
                {/*/>*/}
                <Dropdown
                    menu={{
                        items: branchMenuItems,
                        onClick: ({key}) => setSelectedBranch(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedBranch || "Lọc theo chi nhánh"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm Nhà Hàng
                </Button>
            </div>

            <Table columns={columns} dataSource={filteredRestaurants} rowKey="id"/>

            <ModalRestaurant
                type={modalType}
                data={currentRestaurant}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
            />
        </div>
    );
}

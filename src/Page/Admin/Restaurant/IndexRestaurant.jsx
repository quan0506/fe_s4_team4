import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message, Dropdown, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalRestaurant from "./ModalRestaurant.jsx";

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
            console.log('response' , response)
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
            console.error("Failed to fetch Shuttle:", error);
        }
    };


    const handleAdd = () => {
        setModalType("add");
        setCurrentRestaurant(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id, branchId) => {
        Modal.confirm({
            title: "Are you sure you want to delete this restaurant?",
            onOk: async () => {
                try {
                    await upstashService.deleteRestaurant(id, branchId);
                    message.success("Restaurant deleted success!");
                    fetchRestaurants();
                } catch (error) {
                    message.error("Failed to delete restaurant!");
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
                message.success("Shuttle added success!");
            } else if (modalType === "edit") {
                await upstashService.updateRestaurant(currentRestaurant.id, data);
                message.success("Shuttle updated success!");
            }
            fetchRestaurants();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save room!");
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
            title: "Branch Name",
            dataIndex: "branchName",
            key: "branchName",
        },
        {
            title: "Restaurant Type",
            dataIndex: "restaurantType",
            key: "restaurantType",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Adult Price",
            dataIndex: "restaurantAdultPrice",
            key: "restaurantAdultPrice",
        },
        {
            title: "Children Price",
            dataIndex: "restaurantChildrenPrice",
            key: "restaurantChildrenPrice",
        },
        {
            title: "Photos",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
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
            dataIndex: "restaurantDescription",
            key: "restaurantDescription",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, shuttle) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(shuttle)}
                        type="primary"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(shuttle.id, shuttle.branchId)}
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
                    Add Shuttle
                </Button>
            </div>

            <Table columns={columns} dataSource={filteredRestaurants} rowKey="id" />

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

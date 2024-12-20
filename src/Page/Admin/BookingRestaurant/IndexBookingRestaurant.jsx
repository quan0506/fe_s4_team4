import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message, Dropdown, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBookingRestaurant from "./ModalBookingRestaurant";

export default function IndexBookingRestaurant() {
        const [listBookingRestaurant, setListBookingRestaurant] = useState([]);
        const [modalType, setModalType] = useState(null);
        const [currentBookingRestaurant, setCurrentBookingRestaurant] = useState(null);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [searchId, setSearchId] = useState("");
        const [branches, setBranches] = useState([]);

        const [restaurants, setRestaurants] = useState([]);

        const [selectedBranch, setSelectedBranch] = useState(null);
        const [selectedRestaurantType, setSelectedRestaurantType] = useState(null);

        const fetchBookingRestaurants = async () => {
            try {
                const response = await upstashService.getAllBookingRestaurant();
                const bookingRestaurantsData = response.data;
                console.log(bookingRestaurantsData);

                const bookingRestaurants = Object.values(bookingRestaurantsData).flat();

                const branches = await upstashService.getallbranches();
                setBranches(branches);

                const restaurantsResponse = await upstashService.getAllRestaurant();
                const restaurants = restaurantsResponse.data;
                setRestaurants(restaurants);
                console.log(restaurants);

                const branchMap = branches.reduce((map, branch) => {
                    map[branch.id] = branch.branchName;
                    return map;
                }, {});

                const normalizedData = bookingRestaurants.map((bookingRestaurant) => {
                    const restaurant = bookingRestaurant.restaurant || {};
                    const branchName = branchMap[bookingRestaurant.branchId] || "Unknown";

                    return {
                        ...bookingRestaurant,
                        branchName,
                        restaurantType: restaurant.restaurantType || "Unknown",
                        restaurantAdultPrice: restaurant.restaurantAdultPrice || 0,
                        restaurantChildrenPrice: restaurant.restaurantChildrenPrice || 0,
                    };
                });
                setListBookingRestaurant(normalizedData);
            } catch (error) {
                console.error("Failed to fetch restaurant:", error);
            }
        };

        const handleAdd = () => {
            setModalType("add");
            setCurrentBookingRestaurant(null);
            setIsModalVisible(true);
        };

        const handleDelete = async (id, branchId) => {
            console.log("Deleting booking restaurant:", id, branchId);
            Modal.confirm({
                title: "Are you sure you want to delete this booking restaurant?",
                onOk: async () => {
                    try {
                        await upstashService.deleteBookingRestaurant(id, branchId);
                        message.success("Booking Restaurant deleted successfully!");
                        fetchBookingRestaurants();
                    } catch (error) {
                        message.error("Failed to delete delete booking restaurant:!");
                    }
                },
            });
        };

        const handleSave = async ({ data, branchId, restaurantId }) => {
            try {
                const userId = 1;
                await upstashService.postBookingRestaurant(branchId, restaurantId, userId, data);
                message.success("Restaurant booking addb success!");
                fetchBookingRestaurants();
                setIsModalVisible(false);
            } catch (error) {
                console.error("Error during saving:", error?.response?.data || error.message);
                message.error(error?.response?.data?.message || "Failed to save booking!");
            }

        };

        useEffect(() => {
            fetchBookingRestaurants();
        }, []);

        const filteredBookingRestaurants = listBookingRestaurant.filter((bookingRestaurant) => {
            const matchesBranch = selectedBranch === null || bookingRestaurant.branchName === selectedBranch;
            const matchesRestaurantType = selectedRestaurantType === null || bookingRestaurant.restaurantType === selectedRestaurantType;
            const matchesSearch = searchId ? bookingRestaurant.bookingConfirmationCode.includes(searchId) : true;  // Sử dụng bookingConfirmationCode
            return matchesBranch && matchesSearch && matchesRestaurantType;
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
                title: "numOfAdults",
                dataIndex: "numOfAdults",
                key: "numOfAdults",
            },
            {
                title: "numOfChildren",
                dataIndex: "numOfChildren",
                key: "numOfChildren",
            },
            {
                title: "CheckInDate",
                dataIndex: "dayCheckIn",
                key: "dayCheckIn",
                render: (dayCheckIn) => {
                    const [year, month, day] = dayCheckIn;
                    return `${day}/${month}/${year} `;
                },
            },
            {
                title: "totalPrice",
                dataIndex: "totalPrice",
                key: "totalPrice",
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
            },
            {
                title: "Actions",
                key: "actions",
                render: (_, bookingRestaurant) => (
                    <Space>
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(bookingRestaurant.id, bookingRestaurant.branchId)}
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

        const restaurantMenuItems = [
            { key: "all", label: "All Restaurant Types" },
            ...restaurants.map((restaurant) => ({ key: restaurant.restaurantType, label: restaurant.restaurantType })),
        ];

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <Dropdown
                        menu={{
                            items: branchMenuItems,
                            onClick: ({ key }) => setSelectedBranch(key === "all" ? null : key),
                        }}
                    >
                        <Button>{selectedBranch || "Filter by Branch"}</Button>
                    </Dropdown>

                    <Dropdown
                        menu={{
                            items: restaurantMenuItems,
                            onClick: ({ key }) =>
                                setSelectedRestaurantType(key === "all" ? null : key),
                        }}
                    >
                        <Button>{selectedRestaurantType || "Filter by Restaurant Type"}</Button>
                    </Dropdown>

                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Add New Booking Restaurant
                    </Button>
                </div>

                <Table columns={columns} dataSource={filteredBookingRestaurants} rowKey="id" />

                <ModalBookingRestaurant
                    type={modalType}
                    data={currentBookingRestaurant}
                    isModalVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onSave={handleSave}
                    branches={branches}
                    restaurants={restaurants}
                />
            </div>
        );
    }

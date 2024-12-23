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
                title: "Có chắc chắn xóa lịch đặt nhà hàng này",
                onOk: async () => {
                    try {
                        await upstashService.deleteBookingRestaurant(id, branchId);
                        message.success("Lịch đặt nhà hàng được xóa thành công");
                        fetchBookingRestaurants();
                    } catch (error) {
                        message.error("Failed to delete delete booking restaurant:!", error);
                    }
                },
            });
        };

        const handleSave = async ({ data, branchId, restaurantId }) => {
            try {
                const userId = 1;
                await upstashService.postBookingRestaurant(branchId, restaurantId, userId, data);
                message.success("Lịch đặt nhà hàng được đặt thành công");
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
                title: "Số Người lớn",
                dataIndex: "numOfAdults",
                key: "numOfAdults",
            },
            {
                title: "Số trẻ em",
                dataIndex: "numOfChildren",
                key: "numOfChildren",
            },
            {
                title: "Ngày đặt lịch",
                dataIndex: "dayCheckIn",
                key: "dayCheckIn",
                render: (dayCheckIn) => {
                    const [year, month, day] = dayCheckIn;
                    return `${day}/${month}/${year} `;
                },
            },
            {
                title: "Tổng tiền",
                dataIndex: "totalPrice",
                key: "totalPrice",
            },
            {
                title: "Tên người đặt",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Số điện thoại",
                dataIndex: "phone",
                key: "phone",
            },
            {
                title: "Thực hiện",
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
            { key: "all", label: "Tất cả chi nhánh" },
            ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
        ];

        const restaurantMenuItems = [
            { key: "all", label: "Tất cả nhà hàng" },
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
                        <Button>{selectedBranch || "Lọc theo chi nhánh"}</Button>
                    </Dropdown>

                    <Dropdown
                        menu={{
                            items: restaurantMenuItems,
                            onClick: ({ key }) =>
                                setSelectedRestaurantType(key === "all" ? null : key),
                        }}
                    >
                        <Button>{selectedRestaurantType || "Lọc theo nhà hàng"}</Button>
                    </Dropdown>

                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Thêm lịch đặt
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

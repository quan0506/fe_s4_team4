import React, { useEffect, useState } from "react";
import {Table, Button, message, Space, Modal, Dropdown, Menu} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalReview from "./ModalReview";
import {useQuery} from "react-query";

export default function IndexReview() {
    const [listReview, setListReview] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentReview, setCurrentReview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const fetchReviews = async () => {
        try {
            const reviewsResponse = await upstashService.getAllReview();
            const branchesResponse = await upstashService.getallbranches();
            const roomsResponse = await upstashService.getAllRoom();

            console.log("branchesRes", branchesResponse);
            console.log("roomsRes", roomsResponse);

            const reviews = reviewsResponse.data || [];
            const branches = branchesResponse || [];
            const rooms = roomsResponse || [];

            const normalizedData = reviews.map((review) => ({
                ...review,
                photos: Array.isArray(review.photos)
                    ? review.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof review.photos === "string"
                        ? review.photos.split(", ")
                        : [],
            }));

            setListReview(normalizedData);
            setBranches(branches);
            setRooms(rooms)
        } catch (error) {
            console.error("Fail fetch reviews:", error);
            message.error("Failed to load data.");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [isModalVisible]);

    const handleAdd = () => {
        setModalType("add");
        setCurrentReview(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Bạn có muốn xóa đánh giá này?",
            onOk: async () => {
                try {
                    await upstashService.deleteReview(id);
                    message.success("Xóa đánh giá thành công");
                    fetchReviews();
                } catch (error) {
                    message.error("Failed to delete review", error);
                }
            },
        });
    };

    const handleSave = async (data) => {
        try {
            if (!data.branchId) {
                message.error("Branch ID is required.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addReview(data);
                message.success("Thêm đánh giá thành công");
            }
            fetchReviews();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save review!", error);
        }
    };

    const filteredReviews = listReview.filter((review) => {
        const matchesBranch = selectedBranch === null || review.branchName === selectedBranch;
        const matchesRoomType = selectedRoomType === null || review.roomType === selectedRoomType;
        const matchesSearch = searchId ? review.id.includes(searchId) : true;
        return matchesBranch && matchesRoomType && matchesSearch;
    });

    const columns = [
        {
            title: "Review Id",
            dataIndex: "reviewId",
            key: "reviewId",
        },
        {
            title: "Chi nhánh",
            dataIndex: "branchName",
            key: "branchName",
        },
        {
            title: "Loại Phòng",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Xếp hạng",
            dataIndex: "rating",
            key: "rating",
        },
        {
            title: "Bài Đánh Giá",
            dataIndex: "reviewText",
            key: "reviewText",
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
                            alt={`Review Photo ${index + 1}`}
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
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
                const [year, month, day, hour, minute, second] = createdAt;
                return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
            },
        },
        {
            title: "Email",
            dataIndex: "userEmail",
            key: "userEmail",
        },
        {
            title: "Thực hiện",
            key: "actions",
            render: (_, review) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(review.reviewId)}
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

    const roomTypeMenuItems = [
        { key: "all", label: "Tất cả loại phòng" },
        ...rooms.map((room) => ({ key: room.roomType, label: room.roomType })),
    ];

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Thêm đánh giá
                </Button>
                <div style={{display: "flex", gap: "8px"}}>
                    <Dropdown
                        menu={{
                            items: branchMenuItems,
                            onClick: ({key}) =>
                                setSelectedBranch(key === "all" ? null : key),
                        }}
                    >
                        <Button>{selectedBranch || "Lọc theo chi nhánh"}</Button>
                    </Dropdown>
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
                dataSource={filteredReviews}
                rowKey="id"
                className="branch-table"
                scroll={{ x: 1200 }}
            />
            <ModalReview
                type={modalType}
                data={currentReview}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
                rooms={rooms}
            />
        </div>
    );
}


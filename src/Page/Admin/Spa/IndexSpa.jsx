import React, { useEffect, useState } from "react";
import {Table, Button, Modal, Space, message, Dropdown, Input, Tooltip, Typography, Carousel} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalSpa from "./ModalSpa";
import '../index.css'
const { Title, Paragraph } = Typography;

export default function IndexSpa() {
    const [listSpa, setListSpa] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentSpa, setCurrentSpa] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchSpas = async () => {
        try {
            const response = await upstashService.getAllSpas();
            const spas = response.data;

            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = spas.map((spa) => ({
                ...spa,
                branchName: branchMap[spa.branchId] || "Unknown",
                photos: Array.isArray(spa.photos)
                    ? spa.photos.map((photo) =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : typeof spa.photos === "string"
                        ? spa.photos.split(", ")
                        : [],
            }));
            setListSpa(normalizedData);
        } catch (error) {
            console.error("Failed to fetch Shuttle:", error);
        }
    };


    const handleAdd = () => {
        setModalType("add");
        setCurrentSpa(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete spa?",
            onOk: async () => {
                try {
                    await upstashService.deleteSpa(id);
                    message.success("Spa deleted successfully!");
                    fetchSpas();
                } catch (error) {
                    message.error("Failed to delete spa!");
                }
            },
        });
    };

    const handleEdit = (spa) => {
        setModalType("edit");
        const spaWithPhotos = {
            ...spa,
            photos: Array.isArray(spa.photos)
                ? spa.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentSpa(spaWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (!data.branchId) {
                message.error("Branch ID is required.");
                return;
            }

            if (modalType === "add") {
                await upstashService.addSpa(data);
                message.success("Shuttle added success!");
            } else if (modalType === "edit") {
                await upstashService.updateSpa(currentSpa.id, data);
                message.success("Shuttle updated success!");
            }
            fetchSpas();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save room!");
        }
    };

    useEffect(() => {
        fetchSpas();
    }, []);

    const filteredSpas = listSpa.filter((spa) => {
        const matchesBranch = selectedBranch === null || spa.branchName === selectedBranch;
        const matchesSearch = searchId ? spa.id.includes(searchId) : true;
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
            title: "Spa Name",
            dataIndex: "spaServiceName",
            key: "spaServiceName",
        },
        {
            title: "Service Price",
            dataIndex: "spaServicePrice",
            key: "spaServicePrice",
        },
        {
            title: "Photos",
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
            title: "Description",
            dataIndex: "spaDescription",
            key: "spaDescription",
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
            title: "Actions",
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
        { key: "all", label: "All Branches" },
        ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
    ];

    return (
        <div className="branch-management">
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 16}}>
                <Input
                    placeholder="Search by ID"
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
                    <Button>{selectedBranch || "Filter by Branch"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
                    Add Shuttle
                </Button>
            </div>

            <Table
                className="branch-table"
                scroll={{ x: 1200 }}
                columns={columns} dataSource={filteredSpas} rowKey="id"/>
            <ModalSpa
                type={modalType}
                data={currentSpa}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
            />
        </div>
    );
}

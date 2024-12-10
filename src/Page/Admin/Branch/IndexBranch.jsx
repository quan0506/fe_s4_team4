import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Space, message, Carousel } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBranch from "./ModalBranch";

export default function IndexBranch() {
    const [listBranch, setListBranch] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");

    const fetchBranches = async () => {
        try {
            const branches = await upstashService.getallbranches();
            const normalizedData = branches.map(branch => ({
                ...branch,
                photos: Array.isArray(branch.photos)
                    ? branch.photos.map(photo =>
                        typeof photo === "string" ? photo : photo.url
                    )
                    : (typeof branch.photos === 'string' ? branch.photos.split(", ") : []),
            }));
            setListBranch(normalizedData);
        } catch (error) {
            console.error("Failed to fetch branches:", error);
        }
    };

    const handleSearch = async () => {
        if (!searchId) {
            message.error("Please enter an ID to search!");
            return;
        }

        try {
            const branch = await upstashService.getBranchesid(searchId);
            setListBranch([branch]);
        } catch (error) {
            message.error("Branch not found!");
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentBranch(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Are you sure to delete this branch?",
            onOk: async () => {
                try {
                    await upstashService.deleteBranch(id);
                    message.success("Branch deleted successfully!");
                    fetchBranches();
                } catch (error) {
                    message.error("Failed to delete branch!");
                }
            },
        });
    };

    const handleEdit = (branch) => {
        setModalType("edit");
        const branchWithPhotos = {
            ...branch,
            photos: Array.isArray(branch.photos)
                ? branch.photos.map((url, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url,
                }))
                : [],
        };
        setCurrentBranch(branchWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (modalType === "add") {
                await upstashService.addBranch(data);
                message.success("Branch added successfully!");
            } else if (modalType === "edit") {
                await upstashService.updateBranch(currentBranch.id, data);
                message.success("Branch updated successfully!");
            }
            fetchBranches();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save branch!");
        }
    };


    useEffect(() => {
        fetchBranches();
    }, []);

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
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        // {
        //     title: "Photos",
        //     dataIndex: "photos",
        //     key: "photos",
        //     render: (photos) => (
        //         <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
        //             {photos.map((url, index) => (
        //                 <img
        //                     key={index}
        //                     src={url}
        //                     alt={`Branch Photo ${index + 1}`}
        //                     style={{
        //                         width: 50,
        //                         height: 50,
        //                         objectFit: "cover",
        //                         borderRadius: "4px",
        //                     }}
        //                 />
        //             ))}
        //         </div>
        //     ),
        // },
        {
            title: "Photos",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <div style={{ width: 100 }}>
                    <Carousel autoplay>
                        {photos.map((url, index) => (
                            <div key={index}>
                                <img
                                    src={url}
                                    alt={`Branch Photo ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: 50,
                                        objectFit: "cover",
                                        borderRadius: "4px",
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
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, branch) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(branch)}
                        type="primary"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(branch.id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Input
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    style={{ width: "30%" }}
                    suffix={<SearchOutlined onClick={handleSearch} />}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add Branch
                </Button>
            </div>
            <Table columns={columns} dataSource={listBranch} rowKey="id" />
            <ModalBranch
                type={modalType}
                data={currentBranch}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
            />
        </div>
    );
}
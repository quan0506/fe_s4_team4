import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space, message, Dropdown, Input } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBookingSpa from "./ModalBookingSpa";

export default function IndexBookingSpa() {
    const [listBookingSpa, setListBookingSpa] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBookingSpa, setCurrentBookingSpa] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [branches, setBranches] = useState([]);

    const [spas, setSpas] = useState([]);

    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedSpaServiceName, setSelectedSpaServiceName] = useState(null);

    const fetchBookingSpas = async () => {
        try {
            const response = await upstashService.getAllBookingSpa();
            const bookingSpasData = response.data;
            console.log(bookingSpasData);

            const bookingSpas = Object.values(bookingSpasData).flat();

            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const spasResponse = await upstashService.getAllSpas();
            const spas = spasResponse.data;
            setSpas(spas);
            console.log(spas);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            console.log(branchMap);

            const normalizedData = bookingSpas.map((bookingSpa) => {
                const spa = bookingSpa.spa || {};
                console.log(spa);
                const branchId = spa.branchId;
                const branchName = branchMap[branchId] || "Unknown1";

                return {
                    ...bookingSpa,
                    branchName,
                    spaServiceName: spa.spaServiceName || "Unknown2",
                    spaServicePrice: spa.spaServicePrice || 0,
                };
            });

            setListBookingSpa(normalizedData);

        } catch (error) {
            console.error("Failed to fetch Spa:", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentBookingSpa(null);
        setIsModalVisible(true);
    };
    const handleDelete = async (id, branchId) => {
        console.log("Deleting booking spa:", id, branchId);
        Modal.confirm({
            title: "Are you sure you want to delete this booking spa?",
            onOk: async () => {
                try {
                    if (!branchId) {
                        message.error("Branch ID is missing!");
                        return;
                    }
                    await upstashService.deleteBookingSpa(branchId, id);
                    message.success("Booking spa deleted successfully!");
                    fetchBookingSpas();
                } catch (error) {
                    console.error("Failed to delete booking spa:", error);
                    message.error("Failed to delete booking spa!");
                }
            },
        });
    };


    const handleSave = async ({ data, branchId, spaId }) => {
        try {
            const userId = 1;
            await upstashService.postBookingSpa(branchId, spaId, userId, data);
            message.success("Spa booking addb success!");
            fetchBookingSpas();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error during saving:", error?.response?.data || error.message);
            message.error(error?.response?.data?.message || "Failed to save booking!");
        }
    };

    useEffect(() => {
        fetchBookingSpas();
    }, []);

    const filteredBookingSpas = listBookingSpa.filter((bookingSpa) => {
        const matchesBranch = selectedBranch === null || bookingSpa.branchName === selectedBranch;
        const matchesSpaServiceName = selectedSpaServiceName === null || bookingSpa.spaServiceName === selectedSpaServiceName;
        const matchesSearch = searchId ? bookingSpa.bookingConfirmationCode.includes(searchId) : true;
        return matchesBranch && matchesSearch && matchesSpaServiceName;
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
            title: "spaServiceName",
            dataIndex: "spaServiceName",
            key: "spaServiceName",
        },
        // {
        //     title: "spaServicePrice",
        //     dataIndex: "spaServicePrice",
        //     key: "spaServicePrice",
        // },
        {
            title: "description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "spaServiceTime",
            dataIndex: "spaServiceTime",
            key: "spaServiceTime",
        },
        {
            title: "appointmentTime",
            dataIndex: "appointmentTime",
            key: "appointmentTime",
            render: (appointmentTime) => {
                const [year, month, day, hour, minute] = appointmentTime;
                return `${day}/${month}/${year} ${hour}:${minute} `;
            },
        },
        {
            title: "numberOfPeople",
            dataIndex: "numberOfPeople",
            key: "numberOfPeople",
        },
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        // {
        //     title: "userEmail",
        //     dataIndex: "userEmail",
        //     key: "userEmail",
        // },
        {
            title: "Actions",
            key: "actions",
            render: (_, bookingSpa) => (
                <Space>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(bookingSpa.id, bookingSpa.spa?.branchId)}
                        danger
                    />
                </Space>
            ),
        }

    ];

    const branchMenuItems = [
        { key: "all", label: "All Branches" },
        ...branches.map((branch) => ({ key: branch.branchName, label: branch.branchName })),
    ];

    const spaServiceNameItems = [
        { key: "all", label: "All Spa Services" },
        ...spas.map((spa) => ({ key: spa.spaServiceName, label: spa.spaServiceName })),
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
                        items: spaServiceNameItems,
                        onClick: ({ key }) =>
                            setSelectedSpaServiceName(key === "all" ? null : key),
                    }}
                >
                    <Button>{selectedSpaServiceName || "Filter by Spa Service"}</Button>
                </Dropdown>

                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Add New Booking Spa
                </Button>
            </div>

            <Table columns={columns} dataSource={filteredBookingSpas} rowKey="id" />

            <ModalBookingSpa
                type={modalType}
                data={currentBookingSpa}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
                spas={spas}
            />
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Space, message , Dropdown, Menu} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalShuttle from "./ModalShuttle";

export default function IndexShuttle() {
    const [listCar, setListCar] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentCar, setCurrentCar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [cars, setCars] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branches, setBranches] = useState([]);

    const fetchCars = async () => {
        try {
            const cars = await upstashService.getAllCar();
            // console.log("Rooms: ", rooms);
            const branches = await upstashService.getallbranches();
            setBranches(branches);

            const branchMap = branches.reduce((map, branch) => {
                map[branch.id] = branch.branchName;
                return map;
            }, {});

            const normalizedData = cars.map(car => ({
                ...car,
                branchName: branchMap[car.branchId] || "Unknown",
                carPhotoUrl: Array.isArray(car.carPhotoUrl)
                    ? car.photos.map(carPhotoUrl =>
                        typeof carPhotoUrl === "string" ? carPhotoUrl : carPhotoUrl.url
                    )
                    : (typeof car.carPhotoUrl === 'string' ? car.carPhotoUrl.split(", ") : []),
            }));
            setListCar(normalizedData);

        } catch (error) {
            console.error("Failed to fetch cars:", error);
        }
    };

    const handleSearch = async () => {
        // if (!searchId) {
        //     message.error("Please enter an ID to search!");
        //     return;
        // }
        //
        // try {
        //     const room = await upstashService.getroomesid(searchId);
        //     setListroom([room]);
        // } catch (error) {
        //     message.error("room not found!");
        // }
    };

    const handleAdd = () => {
        // setModalType("add");
        // setCurrentRoom(null);
        // setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        // Modal.confirm({
        //     title: "Are you delete this room?",
        //     onOk: async () => {
        //         try {
        //             await upstashService.deleteRoom(id);
        //             message.success("Room delete success");
        //             fetchRooms();
        //         } catch (error) {
        //             message.error("Failed to delete room!");
        //         }
        //     },
        // });
    };

    const handleEdit = (room) => {
        // setModalType("edit");
        // const roomWithPhotos = {
        //     ...room,
        //     photos: Array.isArray(room.photos)
        //         ? room.photos.map((url, index) => ({
        //             uid: index.toString(),
        //             name: `Photo ${index + 1}`,
        //             status: "done",
        //             url,
        //         }))
        //         : [],
        // };
        // setCurrentRoom(roomWithPhotos);
        // setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        // try {
        //
        //     if (!data.branchId) {
        //         message.error("Branch ID is required.");
        //         return;
        //     }
        //
        //     if (modalType === "add") {
        //         await upstashService.addRoom(data);
        //         message.success("room added success!");
        //     } else if (modalType === "edit") {
        //         await upstashService.updateRoom(currentRoom.id, data);
        //         message.success("room updated success!");
        //     }
        //     fetchRooms();
        //     setIsModalVisible(false);
        // } catch (error) {
        //     message.error("Failed to save room!");
        // }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const filteredCars = listCar.filter((car) => {
        // const matchesBranch = selectedBranch === null || room.branchName === selectedBranch;
        // const matchesSearch = searchId ? room.id.includes(searchId) : true;
        // return matchesBranch && matchesSearch;
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Car Type",
            dataIndex: "carType",
            key: "carType",
        },
        {
            title: "Car Price",
            dataIndex: "carPrice",
            key: "carPrice",
        },
        {
            title: "Photos",
            dataIndex: "photos",
            key: "photos",
            render: (photos) => (
                <div style={{ gap: "8px" }}>
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
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, room) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(room)}
                        type="primary"
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(room.id)}
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
                    Add Car
                </Button>
            </div>

            <Dropdown
                menu={
                    <Menu onClick={({ key }) => setSelectedBranch(key === "all" ? null : key)}>
                        <Menu.Item key="all">All Branches</Menu.Item>
                        {branches.map((branch) => (
                            <Menu.Item key={branch.branchName}>
                                {branch.branchName}
                            </Menu.Item>
                        ))}
                    </Menu>
                }
            >
                <Button>
                    {selectedBranch || "Filter by Branch"}
                </Button>
            </Dropdown>

            {/*<Table columns={columns} dataSource={listRoom} rowKey="id" />*/}
            <Table columns={columns} dataSource={filteredCars} rowKey="id" />

            <ModalShuttle
                type={modalType}
                data={currentCar}
                isModalVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSave}
                branches={branches}
            />
        </div>
    );
}


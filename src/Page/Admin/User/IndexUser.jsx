import React, { useEffect, useState } from "react";
import upstashService from "../../../services/upstashService.js";
import { Table } from "antd";

export default function IndexUser() {
    const [listUser, setListUser] = useState([]);

    const fetchUsers = async () => {
        try {
            const UserResponse = await upstashService.getAllUsers();
            console.log("Response:", UserResponse);

            setListUser(UserResponse.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={listUser} rowKey="id" />
        </div>
    );
}

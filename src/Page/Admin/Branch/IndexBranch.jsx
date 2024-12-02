import React, { useState } from "react";
import { TableCell, TableRow, IconButton, Button } from "@mui/material";
import { MoreHoriz, Edit, Delete } from "@mui/icons-material";
import GenericTable from "../../../component/GenericTable.jsx";
import ModalBranch from "./ModalBranch.jsx";


export default function IndexBranch() {
    const [modalType, setModalType] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const headers = ["Project Name", "Status", "Created At", "Actions"];
    const [listProject, setListProject] = useState({
        contents: [
            { projectName: "Project A", status: "Active", createdAt: "2024-11-25T12:00:00Z" },
            { projectName: "Project B", status: "Inactive", createdAt: "2024-10-15T09:30:00Z" },
            { projectName: "Project C", status: "Active", createdAt: "2024-12-01T14:45:00Z" },
        ],
    });

    const openModal = (type, project = null) => {
        setModalType(type);
        setCurrentProject(project);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setCurrentProject(null);
    };

    const handleSave = (updatedProject) => {
        if (modalType === "add") {
            setListProject((prev) => ({
                ...prev,
                contents: [...prev.contents, { ...updatedProject, createdAt: new Date().toISOString() }],
            }));
        } else if (modalType === "edit") {
            setListProject((prev) => ({
                ...prev,
                contents: prev.contents.map((project) =>
                    project.projectName === currentProject.projectName ? updatedProject : project
                ),
            }));
        }
        closeModal();
    };

    const handleDelete = (projectName) => {
        setListProject((prev) => ({
            ...prev,
            contents: prev.contents.filter((project) => project.projectName !== projectName),
        }));
        closeModal();
    };

    const renderRow = (row) => (
        <TableRow key={row.projectName}>
            <TableCell>{row.projectName}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <IconButton onClick={() => openModal("view", row)} style={{ color: "white" }}>
                        <MoreHoriz />
                    </IconButton>
                    <IconButton onClick={() => openModal("edit", row)} style={{ color: "white" }}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => openModal("delete", row)} style={{ color: "white" }}>
                        <Delete />
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={() => openModal("add")} type="primary">
                    Add
                </Button>
            </div>
            <GenericTable
                headers={headers}
                renderRow={renderRow}
                data={listProject?.contents || []}
            />
            <ModalBranch
                type={modalType}
                data={currentProject}
                isModalVisible={isModalVisible}
                onClose={closeModal}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </div>
    );
}

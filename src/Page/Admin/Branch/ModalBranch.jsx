import { Modal, Button, Upload, Input, Select, Descriptions } from "antd";
import React, { useState, useEffect } from "react";

const { Option } = Select;

const ModalBranch = ({ type, data, onClose, isModalVisible, onSave, onDelete }) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        setForm(data || {});
        setSelectedImages(data?.images || []);
    }, [data]);

    const handleFileChange = ({ fileList }) => {
        setSelectedImages(fileList.map((file) => file.originFileObj || file));
    };

    const handleSave = () => {
        const updatedData = { ...form, images: selectedImages };
        if (onSave) {
            onSave(updatedData);
        }
        onClose();
    };

    const handleDelete = () => {
        if (onDelete && data) {
            onDelete(data.projectName); // Gọi callback để xóa dữ liệu
        }
        onClose();
    };

    const renderModalContent = () => {
        if (type === "view") {
            return (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Project Name">{form.projectName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{form.status}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {new Date(form.createdAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
            );
        } else if (type === "delete") {
            return (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Are you sure you want to delete the project{" "}
                        <strong>"{data?.projectName}"</strong>?
                    </p>
                    <p>This action cannot be undone.</p>
                </div>
            );
        } else {
            return (
                <div>
                    <label>
                        <strong>Project Name:</strong>
                        <Input
                            value={form.projectName || ""}
                            onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                            placeholder="Enter project name"
                            style={{ marginBottom: "15px" }}
                        />
                    </label>
                    <label>
                        <strong>Status:</strong>
                        <Select
                            value={form.status || ""}
                            onChange={(value) => setForm({ ...form, status: value })}
                            style={{ width: "100%", marginBottom: "15px" }}
                        >
                            <Option value="Active">Active</Option>
                            <Option value="Inactive">Inactive</Option>
                        </Select>
                    </label>
                    <label>
                        <strong>Upload Images:</strong>
                        <Upload
                            listType="picture-card"
                            fileList={selectedImages.map((image, index) => ({
                                uid: index.toString(),
                                name: image.name || `Image ${index}`,
                                status: "done",
                                url: image.url || URL.createObjectURL(image),
                            }))}
                            onChange={handleFileChange}
                            beforeUpload={() => false}
                            multiple
                        >
                            + Upload
                        </Upload>
                    </label>
                </div>
            );
        }
    };

    return (
        <Modal
            title={
                type === "view"
                    ? "View Project Details"
                    : type === "edit"
                        ? "Edit Project"
                        : type === "delete"
                            ? "Delete Project"
                            : "Add Project"
            }
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                    <Button onClick={onClose}>Close</Button>
                ) : type === "delete" ? (
                    <>
                        <Button type="primary" danger onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )
            }
            width={800}
        >
            {renderModalContent()}
        </Modal>
    );
};

export default ModalBranch;

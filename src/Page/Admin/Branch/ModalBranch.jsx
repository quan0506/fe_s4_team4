import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ModalBranch = ({ type, data, isModalVisible, onClose, onSave }) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        setForm(data || {});
        setSelectedImages(data?.photos || []);
    }, [data]);

    const handleFileChange = ({ fileList }) => {
        setSelectedImages(fileList.map((file) => file.originFileObj || file));
    };

    const handleSave = () => {
        const updatedData = { ...form, photos: selectedImages };
        onSave(updatedData);
    };

    return (
        <Modal
            title={
                type === "add"
                    ? "Add Branch"
                    : type === "edit"
                        ? "Edit Branch"
                        : "View Branch"
            }
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                    <Button onClick={onClose}>Close</Button>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )
            }
        >
            <label>
                <strong>Branch Name:</strong>
                <Input
                    value={form.branchName || ""}
                    onChange={(e) => setForm({...form, branchName: e.target.value})}
                    placeholder="Enter branch name"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Location:</strong>
                <Input
                    value={form.location || ""}
                    onChange={(e) => setForm({...form, location: e.target.value})}
                    placeholder="Enter location"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Address:</strong>
                <Input
                    value={form.address || ""}
                    onChange={(e) => setForm({...form, address: e.target.value})}
                    placeholder="Enter address"
                    style={{marginBottom: 16}}
                />
            </label>


            <label>
                <strong>Description:</strong>
                <Input
                    value={form.description || ""}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    placeholder="Enter description"
                    style={{marginBottom: 16}}
                />
            </label>


            <label>
                <strong>Upload Photos:</strong>
                <Upload
                    listType="picture"
                    fileList={selectedImages.map((photo, index) => ({
                        uid: index.toString(),
                        name: photo.name || `Photo ${index}`,
                        status: "done",
                        url: photo.url || URL.createObjectURL(photo),
                    }))}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                >
                    <Button icon={<UploadOutlined/>}>Upload</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalBranch;

import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalShuttle = ({ type, data, isModalVisible, onClose, onSave, branches}) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setForm(data || {});
        setSelectedImages(
            data?.photos?.map((photo, index) => ({
                uid: index.toString(),
                name: photo.name || `Photo ${index + 1}`,
                status: "done",
                url: photo.url || photo,
            })) || []
        );
    }, [data]);

    const handleBranchChange = (value) => {
        setForm({...form, branchId: value});
    };


    const handleSave = () => {
        const photos = fileList;
        const updatedData = { ...form, photos };

        if (!updatedData.branchId) {
            message.error("Please select a branch.");
            return;
        }

        console.log("Data before send:", updatedData);
        onSave(updatedData);
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => console.error('Error reading file:', error);
    };

    const handlePreview = (file) => {
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj, (base64) => {
                file.preview = base64;
                const image = new Image();
                image.src = base64;
                const imgWindow = window.open(base64);
                imgWindow?.document.write(image.outerHTML);
            });
        }
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(
            newFileList.map((file) => {
                if (file.originFileObj && !file.url && !file.preview) {
                    getBase64(file.originFileObj, (base64) => {
                        file.preview = base64;
                    });
                }
                return file;
            })
        );
    };

    return (
        <Modal
            title={type === "add" ? "Add shuttle" : type === "edit" ? "Edit shuttle" : "View shuttle"}
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
                <strong>Car Type</strong>
                <Input
                    value={form.carType || ""}
                    onChange={(e) => setForm({...form, carType: e.target.value})}
                    placeholder="Enter Car Type"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Car Price</strong>
                <Input
                    value={form.carPrice || ""}
                    onChange={(e) => setForm({...form, carPrice: e.target.value})}
                    placeholder="Enter Car Price"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Description:</strong>
                <Input
                    value={form.carDescription || ""}
                    onChange={(e) => setForm({...form, carDescription: e.target.value})}
                    placeholder="Enter Car Description"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Branch Name</strong>
                <Select
                    value={form.branchId || ""}

                    onChange={handleBranchChange}
                    placeholder="Select Branch"
                    style={{width: '100%', marginBottom: 16}}
                >
                    {branches.map((branch) => (
                        <Select.Option key={branch.id} value={branch.id}>
                            {branch.branchName}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Upload Photos:</strong>
                <Upload
                    listType="picture"
                    beforeUpload={(file) => {
                        return false;
                    }}
                    onChange={handleChange}
                    fileList={fileList}
                    onPreview={handlePreview}
                >
                    <Button icon={<UploadOutlined/>}>Upload</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalShuttle;


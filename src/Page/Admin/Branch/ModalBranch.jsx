import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalBranch = ({ type, data, isModalVisible, onClose, onSave }) => {
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

    // const handleFileChange = ({ fileList }) => {
    //     const newSelectedImages = fileList.map((file) =>
    //         file.originFileObj ||
    //         (file.url ? { uid: file.uid, name: file.name, url: file.url } : file)
    //     );
    //     console.log("Selected Images:", newSelectedImages);
    //     setSelectedImages(newSelectedImages);
    // };

    const handleSave = () => {
        const photos = fileList;
        const updatedData = { ...form, photos };
        console.log("Data before sending:", updatedData);
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
            title={type === "add" ? "Add Branch" : type === "edit" ? "Edit Branch" : "View Branch"}
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
                    onChange={(e) => setForm({ ...form, branchName: e.target.value })}
                    placeholder="Enter branch name"
                    style={{ marginBottom: 16 }}
                />
            </label>
            <label>
                <strong>Location:</strong>
                <Input
                    value={form.location || ""}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Enter location"
                    style={{ marginBottom: 16 }}
                />
            </label>
            <label>
                <strong>Address:</strong>
                <Input
                    value={form.address || ""}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Enter address"
                    style={{ marginBottom: 16 }}
                />
            </label>
            <label>
                <strong>Description:</strong>
                <Input
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter description"
                    style={{ marginBottom: 16 }}
                />
            </label>
            <label>
                <strong>Upload Photos:</strong>
                <Upload
                    listType="picture"
                    // onRemove={(file) => {
                    //     const index = fileList.indexOf(file);
                    //     const newFileList = fileList.slice();
                    //     newFileList.splice(index, 1);
                    //     setFileList(newFileList);
                    // }}
                    beforeUpload={(file) => {
                        // setFileList([...fileList, file]);
                        return false;
                    }}
                    onChange={handleChange}
                    fileList={fileList}
                    onPreview={handlePreview}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalBranch;

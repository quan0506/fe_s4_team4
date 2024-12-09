import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalReview = ({ type, data, isModalVisible, onClose, onSave, branches, rooms}) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setForm(data || {});
        setSelectedImages(
            (Array.isArray(data?.reviewImageURL) ? data.reviewImageURL : [data?.reviewImageURL])
                .filter(Boolean)
                .map((reviewImageURL, index) => ({
                    uid: index.toString(),
                    name: `Photo ${index + 1}`,
                    status: "done",
                    url: reviewImageURL.url || reviewImageURL,
                }))
        );
    }, [data]);

    const handleBranchChange = (value) => {
        setForm({...form, branchId: value});
    };

    const handleRoomChange = (value) => {
        setForm({...form, roomId: value});
    };

    const handleSave = () => {
        const reviewImageURL = fileList.map((file) =>
            file.originFileObj ? file.originFileObj : file.url
        );
        const updatedData = { ...form, reviewImageURL };

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
            title={type === "add" ? "Add room" : "View room"}
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
                <strong>Review Text</strong>
                <Input
                    value={form.reviewText || ""}
                    onChange={(e) => setForm({...form, reviewText: e.target.value})}
                    placeholder="Enter Review Text"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Rating</strong>
                <Rate
                    value={form.rating}
                    onChange={(value) => setForm({...form, rating: value})}
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
                <strong>Room Type</strong>
                <Select
                    value={form.roomId || ""}

                    onChange={handleRoomChange}
                    placeholder="Select Room"
                    style={{width: '100%', marginBottom: 16}}
                >
                    {rooms.map((room) => (
                        <Select.Option key={room.id} value={room.id}>
                            {room.roomType}
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

export default ModalReview;


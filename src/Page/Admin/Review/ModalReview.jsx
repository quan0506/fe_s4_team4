import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalReview = ({ type, data, isModalVisible, onClose, onSave, branches, rooms }) => {
    const [form, setForm] = useState(data || {});
    const [fileList, setFileList] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        setForm(data || {});
        if (data?.branchId) {
            setFilteredRooms(rooms.filter(room => room.branchId === data.branchId));
        } else {
            setFilteredRooms([]);
        }
    }, [data, rooms]);

    const handleBranchChange = (value) => {
        setForm({ ...form, branchId: value, roomId: undefined });
        const filtered = rooms.filter(room => room.branchId === value);
        setFilteredRooms(filtered);
    };

    const handleRoomChange = (value) => {
        setForm({ ...form, roomId: value });
    };

    const handleSave = () => {
        const updatedData = { ...form, reviewImageURL: fileList.map(file => file.originFileObj || file.url) };
        if (!updatedData.branchId) {
            message.error("Please select a branch.");
            return;
        }
        onSave(updatedData);
    };

    return (
        <Modal
            title={type === "add" ? "Add Review" : "View Review"}
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                    <Button onClick={onClose}>Close</Button>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSave}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </>
                )
            }
        >
            <label>
                <strong>Review Text</strong>
                <Input
                    value={form.reviewText || ""}
                    onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                    placeholder="Enter Review Text"
                    style={{ marginBottom: 16 }}
                />
            </label>

            <label>
                <strong>Rating</strong>
                <Rate
                    value={form.rating}
                    onChange={(value) => setForm({ ...form, rating: value })}
                    style={{ marginBottom: 16 }}
                />
            </label>

            <label>
                <strong>Branch Name</strong>
                <Select
                    value={form.branchId || ""}
                    onChange={handleBranchChange}
                    placeholder="Select Branch"
                    style={{ width: '100%', marginBottom: 16 }}
                >
                    {branches.map(branch => (
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
                    style={{ width: '100%', marginBottom: 16 }}
                    disabled={!filteredRooms.length}
                >
                    {filteredRooms.map(room => (
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
                    beforeUpload={() => false}
                    onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                    fileList={fileList}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalReview;

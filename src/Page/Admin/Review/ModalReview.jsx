import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalReview = ({ type, data, isModalVisible, onClose, onSave, branches, rooms }) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);

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

        if (data?.branchId) {
            const branchRooms = rooms.filter(room => room.branchId === data.branchId);
            setFilteredRooms(branchRooms);
        } else {
            setFilteredRooms([]);
        }
    }, [data, rooms]);

    const handleBranchChange = (value) => {
        setForm({ ...form, branchId: value, roomId: null });
        const branchRooms = rooms.filter(room => room.branchId === value);
        setFilteredRooms(branchRooms);
    };

    const handleRoomChange = (value) => {
        setForm({ ...form, roomId: value });
    };

    const handleSave = () => {
        const photos = fileList;
        const updatedData = { ...form, photos };

        if (!updatedData.branchId) {
            message.error("Please select a branch");
            return;
        }
        if (!updatedData.roomId) {
            message.error("Please select a room.");
            return;
        }

        console.log("Data before send:", updatedData);
        onSave(updatedData);
    };

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => console.error("Error reading file:", error);
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
            title={type === "add" ? "Thêm đánh giá" : "View Review"}
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                    <Button onClick={onClose}>Đóng</Button>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSave}>Lưu</Button>
                        <Button onClick={onClose}>Thoát</Button>
                    </>
                )
            }
        >
            <label>
                <strong>Chi Nhánh</strong>
                <Select
                    value={form.branchId || ""}
                    onChange={handleBranchChange}
                    placeholder="Select Branch"
                    style={{ width: "100%", marginBottom: 16 }}
                >
                    {branches.map((branch) => (
                        <Select.Option key={branch.id} value={branch.id}>
                            {branch.branchName}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Loại Phòng</strong>
                <Select
                    value={form.roomId || ""}
                    onChange={handleRoomChange}
                    placeholder="Select Room"
                    style={{ width: "100%", marginBottom: 16 }}
                    disabled={!filteredRooms.length}
                >
                    {filteredRooms.map((room) => (
                        <Select.Option key={room.id} value={room.id}>
                            {room.roomType}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Bài Đánh Giá</strong>
                <Input
                    value={form.reviewText || ""}
                    onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                    placeholder="Enter Review Text"
                    style={{ marginBottom: 16 }}
                />
            </label>

            <label>
                <strong>Xếp hạng</strong>
                <Rate
                    value={form.rating}
                    onChange={(value) => setForm({ ...form, rating: value })}
                    style={{ marginBottom: 16 }}
                />
            </label>

            <label>
                <strong>Tải lên hình ảnh:</strong>
                <Upload
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleChange}
                    fileList={fileList}
                    onPreview={handlePreview}
                >
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalReview;

import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalAmentities = ({ type, data, isModalVisible, onClose, onSave, rooms}) => {
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
        setFilteredRooms(rooms || []);
    }, [data, rooms]);

    const handleRoomChange = (value) => {
        setForm({ ...form, roomId: value });
    };

    const handleSave = () => {
        const photos = fileList;
        const updatedData = { ...form, photos };

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
            title={type === "add" ? "Thêm tien nghi" : type === "edit" ? "Cập Nhật Tien nghi" : "View Review"}
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
                <strong>Loại Phòng</strong>
                <Select
                    value={form.roomId || ""}
                    onChange={handleRoomChange}
                    placeholder="Select Room"
                    style={{width: "100%", marginBottom: 16}}
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
                <strong>Ten tien nghi</strong>
                <Input
                    value={form.name || ""}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Enter Name"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Mo ta</strong>
                <Input
                    value={form.description || ""}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    placeholder="Enter description"
                    style={{marginBottom: 16}}
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
                    <Button icon={<UploadOutlined/>}>Tải lên</Button>
                </Upload>
            </label>
        </Modal>
    );
};

export default ModalAmentities;

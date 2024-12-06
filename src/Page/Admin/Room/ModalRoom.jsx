import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalRoom = ({ type, data, isModalVisible, onClose, onSave }) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);

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

    const handleFileChange = ({ fileList }) => {
        const newSelectedImages = fileList.map((file) =>
            file.originFileObj ||
            (file.url ? { uid: file.uid, name: file.name, url: file.url } : file)
        );
        console.log("Selected Images:", newSelectedImages);
        setSelectedImages(newSelectedImages);
    };

    const handleSave = () => {
        const photos = selectedImages.map((photo) =>
            photo.originFileObj || photo.url || photo
        );
        const updatedData = { ...form, photos };
        console.log("Data before sending:", updatedData);
        onSave(updatedData);
    };

    return (
        <Modal
            title={type === "add" ? "Add room" : type === "edit" ? "Edit room" : "View room"}
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
                <strong>Room Type</strong>
                <Input
                    value={form.roomType || ""}
                    onChange={(e) => setForm({...form, roomType: e.target.value})}
                    placeholder="Enter Room Type"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Room Price</strong>
                <Input
                    value={form.roomPrice || ""}
                    onChange={(e) => setForm({...form, roomPrice: e.target.value})}
                    placeholder="Enter Room Price"
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
                <strong>Brand Id</strong>
                <Input
                    value={form.branchId || ""}
                    onChange={(e) => setForm({...form, branchId: e.target.value})}
                    placeholder="Enter Brand Id "
                    style={{marginBottom: 16}}
                />
            </label>

            {/*<label>*/}
            {/*    <strong>Bookings</strong>*/}
            {/*    <Input*/}
            {/*        value={form.bookings || ""}*/}
            {/*        onChange={(e) => setForm({...form, bookings: e.target.value})}*/}
            {/*        placeholder="Enter Brand Id "*/}
            {/*        style={{marginBottom: 16}}*/}
            {/*    />*/}
            {/*</label>*/}

            {/*<label>*/}
            {/*    <strong>Booked</strong>*/}
            {/*    <Input*/}
            {/*        value={form.booked || ""}*/}
            {/*        onChange={(e) => setForm({...form, booked: e.target.value})}*/}
            {/*        placeholder="Enter Booked"*/}
            {/*        style={{marginBottom: 16}}*/}
            {/*    />*/}
            {/*</label>*/}

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

export default ModalRoom;

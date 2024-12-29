import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalRoom = ({ type, data, isModalVisible, onClose, onSave, branches}) => {
    const [form, setForm] = useState(data || {});
    const [selectedImages, setSelectedImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    console.log(branches)

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
            message.error("Vui lòng chọn chi nhánh.");
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
            title={type === "add" ? "Thêm Phòng" : type === "edit" ? "Cập Nhật Phòng" : "View room"}
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                    <Button onClick={onClose}>Đóng</Button>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSave}>
                            Lưu
                        </Button>
                        <Button onClick={onClose}>Thoát</Button>
                    </>
                )
            }
        >

            <label>
                <strong>Chi Nhánh</strong>
                <Select
                    value={form.branchId || ""}
                    onChange={(value) => setForm({...form, branchId: value})}
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
                <strong>Loại Phòng</strong>
                <Input
                    value={form.roomType || ""}
                    onChange={(e) => setForm({...form, roomType: e.target.value})}
                    placeholder="Enter Room Type"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Giá Phòng</strong>
                <Input
                    value={form.roomPrice || ""}
                    onChange={(e) => setForm({...form, roomPrice: e.target.value})}
                    placeholder="Enter Room Price"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Mô tả</strong>
                <Input
                    value={form.description || ""}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    placeholder="Enter description"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Tải Lên Hình Ảnh:</strong>
                <Upload
                    listType="picture"
                    beforeUpload={(file) => {
                        return false;
                    }}
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

export default ModalRoom;


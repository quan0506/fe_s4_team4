import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalRestaurant = ({ type, data, isModalVisible, onClose, onSave, branches}) => {
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
            title={type === "add" ? "Thêm Nhà hàng" : type === "edit" ? "Chỉnh sửa nhà hàng" : "View restaurant"}
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
                <strong>Loại Nhà Hàng</strong>
                <Input
                    value={form.restaurantType || ""}
                    onChange={(e) => setForm({...form, restaurantType: e.target.value})}
                    placeholder="Enter Restaurant Type"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Thời gian</strong>
                <Input
                    value={form.time || ""}
                    onChange={(e) => setForm({...form, time: e.target.value})}
                    placeholder="Enter Time"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Giá cho Người lớn</strong>
                <Input
                    value={form.restaurantAdultPrice || ""}
                    onChange={(e) => setForm({...form, restaurantAdultPrice: e.target.value})}
                    placeholder="Enter Adult Price"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Giá cho Trẻ em</strong>
                <Input
                    value={form.restaurantChildrenPrice || ""}
                    onChange={(e) => setForm({...form, restaurantChildrenPrice: e.target.value})}
                    placeholder="Enter Children Price"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>Mô tả</strong>
                <Input
                    value={form.restaurantDescription || ""}
                    onChange={(e) => setForm({...form, restaurantDescription: e.target.value})}
                    placeholder="Enter Restaurant Description"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Tải lên hình ảnh:</strong>
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

export default ModalRestaurant;


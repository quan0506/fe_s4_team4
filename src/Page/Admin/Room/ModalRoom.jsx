import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import '../Moad.css'

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
      <div className="modal-admin">
          <Modal
            title={type === "add" ? "Thêm Phòng" : type === "edit" ? "Cập Nhật Phòng" : "View room"}
            open={isModalVisible}
            onCancel={onClose}
            className="custom-modal"
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
              <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 ">Chi Nhánh</label>
                      <Select
                        value={form.branchId || ""}
                        onChange={handleBranchChange}
                        placeholder="Chọn Chi Nhánh"
                        style={{width: '100%'}}
                        className="custom-select"
                      >
                          {branches.map((branch) => (
                            <Select.Option key={branch.id} value={branch.id}>
                                {branch.branchName}
                            </Select.Option>
                          ))}
                      </Select>
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 mb-1">Loại Phòng</strong>
                      <Input
                        value={form.roomType || ""}
                        onChange={(e) => setForm({...form, roomType: e.target.value})}
                        placeholder="Enter Room Type"
                        style={{marginBottom: 16}}
                      />
                  </div>
                  <div>
                      <strong className="block text-sm font-medium text-gray-700 mb-1">Giá Phòng</strong>
                      <Input
                        value={form.roomPrice || ""}
                        onChange={(e) => setForm({...form, roomPrice: e.target.value})}
                        placeholder="Enter Room Price"
                        style={{marginBottom: 16}}
                      />
                  </div>
                  <div className="col-span-2">
                      <strong className="block text-sm font-medium text-gray-700 mb-1">Mô tả</strong>
                      <Input.TextArea
                        value={form.carDescription || ""}
                        onChange={(e) => setForm({ ...form, carDescription: e.target.value })}
                        placeholder="Nhập Mô tả Xe"
                        className="custom-textarea"
                        rows={4}
                      />
                  </div>

                  <div className="col-span-2">
                      <strong>Tải Lên Hình Ảnh:</strong>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        className="custom-upload"
                      >
                          <div>
                              <UploadOutlined />
                              <div style={{ marginTop: 8 }}>Tải lên</div>
                          </div>
                      </Upload>
                  </div>
              </div>
          </Modal>
      </div>

    );
};

export default ModalRoom;


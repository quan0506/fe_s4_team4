import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import '../Moad.css'
const ModalShuttle = ({ type, data, isModalVisible, onClose, onSave, branches }) => {
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
        setForm({ ...form, branchId: value });
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
      <div className="modal-admin">
          <Modal
            title={
                <h2 className="text-2xl font-bold text-primary ">
                    {type === "add" ? "Thêm DV đặt xe" : type === "edit" ? "Sửa DV đặt xe" : "Xem thông tin xe"}
                </h2>
            }
            open={isModalVisible}
            onCancel={onClose}
            footer={
                type === "view" ? (
                  <Button onClick={onClose} className="bg-primary text-white hover:bg-primary-dark">Đóng</Button>
                ) : (
                  <>
                      <Button type="primary" onClick={handleSave} className="bg-primary text-white hover:bg-primary-dark mr-2">
                          Lưu
                      </Button>
                      <Button onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Thoát</Button>
                  </>
                )
            }
            width={600}
            className="custom-modal"
          >
              <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 ">Chi Nhánh</label>
                      <Select
                        value={form.branchId || ""}
                        onChange={handleBranchChange}
                        placeholder="Chọn Chi Nhánh"
                        style={{ width: '100%' }}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại Xe</label>
                      <Input
                        value={form.carType || ""}
                        onChange={(e) => setForm({ ...form, carType: e.target.value })}
                        placeholder="Nhập Loại Xe"
                        className="custom-input"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giá Xe</label>
                      <Input
                        value={form.carPrice || ""}
                        onChange={(e) => setForm({ ...form, carPrice: e.target.value })}
                        placeholder="Nhập Giá Xe"
                        className="custom-input"
                      />
                  </div>
                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                      <Input.TextArea
                        value={form.carDescription || ""}
                        onChange={(e) => setForm({ ...form, carDescription: e.target.value })}
                        placeholder="Nhập Mô tả Xe"
                        className="custom-textarea"
                        rows={4}
                      />
                  </div>
                  <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tải lên hình ảnh:</label>
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

export default ModalShuttle;


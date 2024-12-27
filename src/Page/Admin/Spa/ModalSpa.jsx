import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalSpa = ({ type, data, isModalVisible, onClose, onSave, branches}) => {
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
            message.error("Please select a spa.");
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
      <div className="custom-modal">
          <Modal
            title={type === "add" ? "Thêm Spa" : type === "edit" ? "Chỉnh sửa Spa" : "View spa"}
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
              <div>
                  <strong className="block text-sm font-medium text-gray-700">Chi Nhánh</strong>
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
              </div>

              <div>
                  <strong className='block text-sm font-medium text-gray-700'>Tên Spa</strong>
                  <Input
                    value={form.spaServiceName || ""}
                    onChange={(e) => setForm({...form, spaServiceName: e.target.value})}
                    placeholder="Enter Spa Name"
                    style={{marginBottom: 16}}
                  />
              </div>
              <div>
                  <strong className='block text-sm font-medium text-gray-700'>Giá Dịch Vụ</strong>
                  <Input
                    value={form.spaServicePrice || ""}
                    onChange={(e) => setForm({...form, spaServicePrice: e.target.value})}
                    placeholder="Enter Service Price"
                    style={{marginBottom: 16}}
                  />
              </div>
              <div>
                  <strong className='block text-sm font-medium text-gray-700'>Mô tả</strong>
                  <Input
                    value={form.spaDescription || ""}
                    onChange={(e) => setForm({...form, spaDescription: e.target.value})}
                    placeholder="Enter Spa Description"
                    style={{marginBottom: 16}}
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
                          <UploadOutlined/>
                          <div style={{marginTop: 8}}>Tải lên</div>
                      </div>
                  </Upload>
              </div>
          </Modal>
      </div>

    );
};

export default ModalSpa;


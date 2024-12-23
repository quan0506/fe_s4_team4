import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Space, message, Carousel, Typography, Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, BranchesOutlined } from "@ant-design/icons";
import upstashService from "../../../services/upstashService.js";
import ModalBranch from "./ModalBranch";

const { Title, Paragraph } = Typography;

export default function IndexBranch() {
    const [listBranch, setListBranch] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBranch, setCurrentBranch] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchId, setSearchId] = useState("");

    const fetchBranches = async () => {
        try {
            const branches = await upstashService.getallbranches();
            const normalizedData = branches.map(branch => ({
                ...branch,
                photos: Array.isArray(branch.photos)
                  ? branch.photos.map(photo =>
                    typeof photo === "string" ? photo : photo.url
                  )
                  : (typeof branch.photos === 'string' ? branch.photos.split(", ") : []),
            }));
            setListBranch(normalizedData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const handleSearch = async () => {
        if (!searchId) {
            message.error("Vui lòng nhập ID để tìm kiếm");
            return;
        }

        try {
            const branch = await upstashService.getBranchesid(searchId);
            setListBranch([branch]);
        } catch (error) {
            message.error("Branch Not Found", error);
        }
    };

    const handleAdd = () => {
        setModalType("add");
        setCurrentBranch(null);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn xóa chi nhánh này",
            onOk: async () => {
                try {
                    await upstashService.deleteBranch(id);
                    message.success("Xóa chi nhánh thành công");
                    fetchBranches();
                } catch (error) {
                    message.error("Failed to delete branch", error);
                }
            },
        });
    };

    const handleEdit = (branch) => {
        setModalType("edit");
        const branchWithPhotos = {
            ...branch,
            photos: Array.isArray(branch.photos)
              ? branch.photos.map((url, index) => ({
                  uid: index.toString(),
                  name: `Photo ${index + 1}`,
                  status: "done",
                  url,
              }))
              : [],
        };
        setCurrentBranch(branchWithPhotos);
        setIsModalVisible(true);
    };

    const handleSave = async (data) => {
        try {
            if (modalType === "add") {
                await upstashService.addBranch(data);
                message.success("Thêm mới Chi nhánh thành công");
            } else if (modalType === "edit") {
                await upstashService.updateBranch(currentBranch.id, data);
                message.success("Chỉnh sửa chi nhánh thành cônh");
            }
            fetchBranches();
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to save branch!", error);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Chi Nhánh",
            dataIndex: "branchName",
            key: "branchName",
            width: 150,
            render: (text) => (
              <Tooltip title={text}>
                  <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                      {text}
                  </Paragraph>
              </Tooltip>
            ),
        },
        {
            title: "Vị trí",
            dataIndex: "location",
            key: "location",
            width: 120,
            render: (text) => (
              <Tooltip title={text}>
                  <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                      {text}
                  </Paragraph>
              </Tooltip>
            ),
        },
        {
            title: "Hình Ảnh",
            dataIndex: "photos",
            key: "photos",
            width: 120,
            render: (photos) => (
              <div style={{ width: 120 }}>
                  <Carousel autoplay>
                      {photos.map((url, index) => (
                        <div key={index}>
                            <img
                              src={url}
                              alt={`Branch Photo ${index + 1}`}
                              style={{
                                  width: "100%",
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: "8px",
                              }}
                            />
                        </div>
                      ))}
                  </Carousel>
              </div>
            ),
        },
        {
            title: "Mô Tả",
            dataIndex: "description",
            key: "description",
            width: 200,
            render: (text) => (
              <Tooltip title={text}>
                  <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                      {text}
                  </Paragraph>
              </Tooltip>
            ),
        },
        {
            title: "Địa Chỉ",
            dataIndex: "address",
            key: "address",
            width: 200,
            render: (text) => (
              <Tooltip title={text}>
                  <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                      {text}
                  </Paragraph>
              </Tooltip>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Thực hiện",
            key: "actions",
            width: 100,
            render: (_, branch) => (
              <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(branch)}
                    type="primary"
                    shape="circle"
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(branch.id)}
                    danger
                    shape="circle"
                  />
              </Space>
            ),
        },
    ];

    return (
      <div className="branch-management">
          <Title level={2} className="page-title">
              <BranchesOutlined /> Branch Management
          </Title>
          <div className='mb-3 flexs' >
              <Input
                placeholder="Tìm Kiếm"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                style={{ width: "300px" }}
                suffix={<SearchOutlined onClick={handleSearch} />}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  Thêm Chi Nhánh
              </Button>
          </div>
          <Table
            columns={columns}
            dataSource={listBranch}
            rowKey="id"
            className="branch-table"
            scroll={{ x: 1200 }}
          />
          <ModalBranch
            type={modalType}
            data={currentBranch}
            isModalVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={handleSave}
          />
      </div>
    );
}


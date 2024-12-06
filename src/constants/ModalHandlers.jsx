import { useState } from "react";

export const useModalHandlers = (initialState) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(initialState);

    const handleRowClick = (data) => {
        setSelectedNotification(data); // Lưu thông tin xe
        setIsModalVisible(true); // Hiển thị modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Đóng modal
        setSelectedNotification(null); // Xóa thông tin
    };

    return { isModalVisible, handleRowClick, handleModalClose, selectedNotification };
};

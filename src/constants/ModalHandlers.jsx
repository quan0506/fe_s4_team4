import { useState } from "react";

export const useModalHandlers = (initialValue) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(initialValue);
    const handleRowClick = (row) => {
        setSelectedNotification(row);
        setIsModalVisible(true);
    };
    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedNotification(null);
    };
    return {
        setIsModalVisible,
        isModalVisible,
        selectedNotification,
        handleRowClick,
        handleModalClose,
    };
};

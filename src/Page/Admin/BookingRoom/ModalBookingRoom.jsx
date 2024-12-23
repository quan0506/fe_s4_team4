import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, message, Select, Input } from "antd";
import moment from "moment";

const ModalBookingRoom = ({ type, data, isModalVisible, onClose, onSave, rooms }) => {
    const [form, setForm] = useState(data || {});
    const [roomTypes, setRoomTypes] = useState([]);
    const [roomPrice, setRoomPrice] = useState(0);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        setForm(data || {});
    }, [data]);

    const handleRoomChange = (value) => {
        setForm({ ...form, roomType: value });
        const selectedRoom = rooms.find((room) => room.roomType === value);
        setRoomPrice(selectedRoom?.roomPrice || 0);
    };

    const handleSave = () => {
        if (!form.roomType) {
            message.error("Please select a room type.");
            return;
        }

        const updatedData = {
            ...form,
            checkInDate: form.checkInDate ? moment(form.checkInDate).format("YYYY-MM-DD") : null,
            checkOutDate: form.checkOutDate ? moment(form.checkOutDate).format("YYYY-MM-DD") : null,
        };

        console.log("Data before send:", updatedData);
        onSave(updatedData);
    };

    return (
        <Modal
            title={type === "add" ? "Add Booking Room" : "Edit Booking Room"}
            open={isModalVisible}
            onCancel={onClose}
            footer={
                <>
                    <Button type="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </>
            }
        >
            <label>
                <strong>Room Type</strong>
                <Select
                    value={form.roomType || ""}
                    onChange={handleRoomChange}
                    placeholder="Select Room Type"
                    style={{ width: "100%", marginBottom: 16 }}
                >
                    {rooms.map((room) => (
                        <Select.Option key={room.roomType} value={room.roomType}>
                            {room.roomType}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Room Price</strong>
                <Input
                    value={roomPrice || ""}
                    readOnly
                    placeholder="Room Price"
                    style={{ marginBottom: 16 }}
                />
            </label>

            <label>
                <strong>Check-In Date</strong>
                <DatePicker
                    value={form.checkInDate ? moment(form.checkInDate) : null}
                    onChange={(date, dateString) => setForm({ ...form, checkInDate: dateString })}
                    placeholder="Select Check-In Date"
                    style={{ marginBottom: 16, width: "100%" }}
                />
            </label>

            <label>
                <strong>Check-Out Date</strong>
                <DatePicker
                    value={form.checkOutDate ? moment(form.checkOutDate) : null}
                    onChange={(date, dateString) => setForm({ ...form, checkOutDate: dateString })}
                    placeholder="Select Check-Out Date"
                    style={{ marginBottom: 16, width: "100%" }}
                />
            </label>
        </Modal>
    );
};

export default ModalBookingRoom;

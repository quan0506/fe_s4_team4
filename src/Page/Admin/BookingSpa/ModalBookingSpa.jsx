import React, { useEffect, useState } from "react";
import { Modal, Input, Button, message, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const ModalBookingSpa = ({type, data, isModalVisible, onClose, onSave, branches, spas,}) => {
    const [form, setForm] = useState(data || {});
    const [spaServiceNames, setSpaServiceNames] = useState([]);
    const [spaServicePrice, setSpaServicePrice] = useState([]);
    const [filteredSpas, setFilteredSpas] = useState([]);
    console.log("spas",spas);

    useEffect(() => {
        setForm(data || {});
    }, [data]);

    const handleBranchChange = (value) => {
        setForm({ ...form, branchId: value, spaServiceNames: null });

        const branchSpas = spas.filter((spa) => spa.branchId === value);

        setFilteredSpas(branchSpas);
        setSpaServiceNames(
            branchSpas.map((spa) => ({
                type: spa.spaServiceName,
                price: spa.spaServicePrice,
            }))
        );
    };

    const handleSpaChange = (value) => {
        setForm({ ...form, spaServiceNames: value });

        const selectedSpa = spaServiceNames.find((spa) => spa.type === value);
        setSpaServicePrice(selectedSpa ? [selectedSpa] : []);
    };

    const handleSave = () => {
        if (!form.branchId || !form.spaServiceNames) {
            message.error("Please select a branch and spa service name.");
            return;
        }

        const selectedSpa = filteredSpas.find(
            (spa) => spa.spaServiceName === form.spaServiceNames
        );

        if (!selectedSpa) {
            message.error(`Invalid spa service selected: ${form.spaServiceNames}`);
            console.log("Filtered Spas:", filteredSpas);
            return;
        }

        const updatedData = {
            ...form,
            appointmentTime: form.appointmentTime
                ? moment(form.appointmentTime).format("YYYY-MM-DDTHH:mm:ss")
                : null,
        };


        console.log("Data before send:", updatedData);
        onSave({
            data: updatedData,
            branchId: form.branchId,
            spaId: selectedSpa.id,
        });
    };

    const handleSelectChange = (value) => {
        setForm({ ...form, spaServiceTime: value });
    };

    return (
        <Modal
            title={
                type === "add"
                    ? "Đặt lịch spa mới"
                    // : type === "edit"
                    //     ? "Edit Booking"
                    : "View Booking"
            }
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
                    style={{width: "100%", marginBottom: 16}}
                >
                    {branches.map((branch) => (
                        <Select.Option key={branch.id} value={branch.id}>
                            {branch.branchName}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Tên Spa</strong>
                <Select
                    value={form.spaServiceNames || ""}
                    onChange={handleSpaChange}
                    placeholder="Select Spa service"
                    style={{width: "100%", marginBottom: 16}}
                >
                    {spaServiceNames.map((spa) => (
                        <Select.Option key={spa.type} value={spa.type}>
                            {spa.type}
                        </Select.Option>
                    ))}
                </Select>
            </label>

            <label>
                <strong>Tên người đặt</strong>
                <Input
                    value={form.fullName || ""}
                    onChange={(e) => setForm({...form, fullName: e.target.value})}
                    placeholder="Enter Full Name"
                    style={{marginBottom: 16}}
                />
            </label>
            <label>
                <strong>email</strong>
                <Input
                    value={form.userEmail || ""}
                    onChange={(e) => setForm({...form, userEmail: e.target.value})}
                    placeholder="Enter userEmail"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Thời gian phục vụ</strong>
                <Select
                    value={form.spaServiceTime || undefined}
                    onChange={handleSelectChange}
                    placeholder="Chọn thời gian dịch vụ (phút)"
                    style={{width: "100%", marginBottom: 16}}
                >
                    <Option value="60">60</Option>
                    <Option value="45">45</Option>
                    <Option value="30">30</Option>
                </Select>
            </label>

            <label>
                <strong>Mô tả</strong>
                <Input
                    value={form.description || ""}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    placeholder="description"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Số điện thoại </strong>
                <Input
                    value={form.phone || ""}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    placeholder="Enter Phone"
                    style={{marginBottom: 16}}
                />
            </label>

            <label>
                <strong>Số lượng</strong>
                <Input
                    value={form.numberOfPeople || ""}
                    onChange={(e) => setForm({...form, numberOfPeople: e.target.value})}
                    placeholder="Enter numberOfPeople"
                    style={{marginBottom: 16}}
                />
            </label>


            <label>
                <strong>Thời gian đặt</strong>
                <DatePicker
                    value={form.appointmentTime ? moment(form.appointmentTime) : null}
                    onChange={(date, dateString) =>
                        setForm({...form, appointmentTime: dateString})
                    }
                    showTime={{
                        format: 'HH:mm:ss',
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select appointmentTime"
                    style={{marginBottom: 16, width: "100%"}}
                />
            </label>


        </Modal>
    );
};

export default ModalBookingSpa;

import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, message, Select, Input } from "antd";
import moment from "moment";

const ModalBookingShuttle = ({ type, data, isModalVisible, onClose, onSave, branches, shuttles }) => {
    const [form, setForm] = useState(data || {});
    const [carTypes, setCarTypes] = useState([]);
    const [carPrice, setCarPrice] = useState(0);
    const [filteredShuttles, setFilteredShuttles] = useState([]);

    console.log(shuttles);

    useEffect(() => {
        setForm(data || {});
    }, [data]);

    useEffect(() => {
        if (form.shuttleCheckInDate && form.shuttleCheckOutDate && carPrice) {
            const checkIn = moment(form.shuttleCheckInDate, "YYYY-MM-DD");
            const checkOut = moment(form.shuttleCheckOutDate, "YYYY-MM-DD");
            const days = checkOut.diff(checkIn, "days");
        }
    }, [form.shuttleCheckInDate, form.shuttleCheckOutDate, carPrice]);

    const handleBranchChange = (value) => {
        setForm({ ...form, branchId: value, carType: null });
        const branchShuttles = shuttles.filter(shuttle => shuttle.branchId === value);
        setFilteredShuttles(branchShuttles);
        setCarTypes(branchShuttles.map(shuttle => ({ type: shuttle.carType, price: shuttle.carPrice })));
    };

    const handleShuttleChange = (value) => {
        setForm({ ...form, carType: value });
        const selectedCar = carTypes.find(car => car.type === value);
        setCarPrice(selectedCar ? selectedCar.price : 0);
    };

    const handleSave = () => {
        if (!form.branchId || !form.carType) {
            message.error("select a branch and car type.");
            return;
        }

        const selectedShuttle = filteredShuttles.find(shuttle => shuttle.carType === form.carType);
        if (!selectedShuttle) {
            message.error("Invalid carType selected.");
            return;
        }

        const updatedData = {
            ...form,
            shuttleCheckInDate: moment(form.shuttleCheckInDate).format("YYYY-MM-DD"),
            shuttleCheckOutDate: moment(form.shuttleCheckOutDate).format("YYYY-MM-DD"),
        };

        onSave({
            data: updatedData,
            branchId: form.branchId,
            shuttleId: selectedShuttle.id,
        });
    };


    return (
      <div className="modal-admin">
          <Modal
            className="custom-modal"
            title={
                type === "add"
                  ? "Thêm lịch đặt xe"
                  // : type === "edit"
                  //     ? "Edit shuttle"
                  : "View shuttle"
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
              <div className="grid grid-cols-1 gap-4">
                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Chi Nhánh</strong>
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
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Loại Xe</strong>
                      <Select
                        value={form.carType || ""}
                        onChange={handleShuttleChange}
                        placeholder="Select Car Type"
                        style={{width: "100%", marginBottom: 16}}
                      >
                          {carTypes.map((car) => (
                            <Select.Option key={car.type} value={car.type}>
                                {car.type}
                            </Select.Option>
                          ))}
                      </Select>
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Giá Xe</strong>
                      <Input
                        value={carPrice || ""}
                        readOnly
                        placeholder="Car Price"
                        style={{marginBottom: 16}}
                      />
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Ngày Đặt xe</strong>
                      <DatePicker
                        value={form.shuttleCheckInDate ? moment(form.shuttleCheckInDate) : null}
                        onChange={(date, dateString) => setForm({...form, shuttleCheckInDate: dateString})}
                        placeholder="Select CheckIn Date"
                        style={{marginBottom: 16, width: "100%"}}
                      />
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Ngày Hủy </strong>
                      <DatePicker
                        value={form.shuttleCheckOutDate ? moment(form.shuttleCheckOutDate) : null}
                        onChange={(date, dateString) => setForm({...form, shuttleCheckOutDate: dateString})}
                        placeholder="Select CheckOut Date"
                        style={{marginBottom: 16, width: "100%"}}
                      />
                  </div>
              </div>

          </Modal>
      </div>

    );
};

export default ModalBookingShuttle;

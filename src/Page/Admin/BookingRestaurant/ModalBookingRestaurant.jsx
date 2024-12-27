import React, { useEffect, useState } from "react";
import { Modal, Input, Button, message, Select, DatePicker } from "antd";
import moment from "moment";

const ModalBookingRestaurant = ({type, data, isModalVisible, onClose, onSave, branches, restaurants,}) => {
    const [form, setForm] = useState(data || {});
    const [restaurantTypes, setRestaurantTypes] = useState([]);
    const [restaurantPrice, setRestaurantPrice] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        setForm(data || {});
    }, [data]);

    const handleBranchChange = (value) => {
        setForm({ ...form, branchId: value, restaurantTypes: null });
        const branchRestaurants = restaurants.filter(
            (restaurant) => restaurant.branchId === value
        );
        setFilteredRestaurants(branchRestaurants);
        setRestaurantTypes(
            branchRestaurants.map((restaurant) => ({
                type: restaurant.restaurantType,
                price: restaurant.restaurantPrice,
            }))
        );
    };

    const handleRestaurantChange = (value) => {
        setForm({ ...form, restaurantTypes: value });
        const selectedRestaurant = restaurantTypes.find(
            (restaurant) => restaurant.type === value
        );
        setRestaurantPrice(selectedRestaurant ? [selectedRestaurant] : []);
    };

    const handleSave = () => {
        if (!form.branchId || !form.restaurantTypes) {
            message.error("Please select a branch and restaurant type.");
            return;
        }

        const selectedRestaurant = filteredRestaurants.find(
            (restaurant) => restaurant.restaurantType === form.restaurantTypes
        );
        if (!selectedRestaurant) {
            message.error("Invalid restaurant type selected.");
            return;
        }

        const updatedData = {
            ...form,
            dayCheckIn: form.dayCheckIn
                ? moment(form.dayCheckIn).format("YYYY-MM-DD")
                : null,
        };

        console.log("Data before send:", updatedData);
        onSave({
            data: updatedData,
            branchId: form.branchId,
            restaurantId: selectedRestaurant.id,
        });
    };

    return (
      <div className="modal-admin">
          <Modal
            title={
                type === "add"
                  ? "Thêm lịch đặt"
                  // : type === "edit"
                  //     ? "Edit Booking"
                  : "View Booking"
            }
            open={isModalVisible}
            className="custom-modal"
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
                      <strong className="block text-sm font-medium text-gray-700 ">Nhà Hàng</strong>
                      <Select
                        value={form.restaurantTypes || ""}
                        onChange={handleRestaurantChange}
                        placeholder="Select Restaurant Type"
                        style={{width: "100%", marginBottom: 16}}
                      >
                          {restaurantTypes.map((type) => (
                            <Select.Option key={type.type} value={type.type}>
                                {type.type}
                            </Select.Option>
                          ))}
                      </Select>
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Tên người đặt</strong>
                      <Input
                        value={form.name || ""}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="Enter Name"
                        style={{marginBottom: 16}}
                      />
                  </div>
                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Số điện thoại </strong>
                      <Input
                        value={form.phone || ""}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="Enter Phone"
                        style={{marginBottom: 16}}
                      />
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Số Người Lớn</strong>
                      <Input
                        value={form.numOfAdults || ""}
                        onChange={(e) => setForm({...form, numOfAdults: e.target.value})}
                        placeholder="Enter num Adult"
                        style={{marginBottom: 16}}
                      />
                  </div>
                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Sô Trẻ Em</strong>
                      <Input
                        value={form.numOfChildren || ""}
                        onChange={(e) => setForm({...form, numOfChildren: e.target.value})}
                        placeholder="Enter num Children "
                        style={{marginBottom: 16}}
                      />
                  </div>

                  <div>
                      <strong className="block text-sm font-medium text-gray-700 ">Ngày Đặt Lịch</strong>
                      <DatePicker
                        value={form.dayCheckIn ? moment(form.dayCheckIn) : null}
                        onChange={(date, dateString) =>
                          setForm({...form, dayCheckIn: dateString})
                        }
                        placeholder="Select Check-In Date"
                        style={{marginBottom: 16, width: "100%"}}
                      />
                  </div>
              </div>

          </Modal>
      </div>

    );
};

export default ModalBookingRestaurant;

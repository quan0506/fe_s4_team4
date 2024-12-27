import { Modal, DatePicker, Image, InputNumber, Form, Input } from 'antd';
import { AccountBookOutlined, UserOutlined, PhoneOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const ShuttleBookingModal = ({
                               isModalVisible,
                               handleModalClose,
                               selectedNotification,
                               handleOk,
                               setDateRange,
                               dateRange,
                               date = false,
                               restaurant = false,
                               onChange,
                               form
                             }) => {
  const handleDateChange = (_, dateStrings) => {
    setDateRange(dateStrings);
  };

  return (
    <Modal
      title={null}
      open={isModalVisible}
      onOk={restaurant ? () => form.submit() : handleOk}
      onCancel={handleModalClose}
      width={800}
      cancelText='Hủy'
      okText='Đặt xe'
      className="custom-modalshutt"
    >
      <div>
        <div className="border-b  pb-6 ">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 ">
            Thông tin {restaurant ? 'nhà hàng' : 'xe'}
          </h2>
        </div>
        {restaurant ? (
          <Form
            onFinish={handleOk}
            form={form}
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Form.Item
              name='name'
              label={<span className="text-black font-bold">Tên người đặt</span>}>
              <Input prefix={<UserOutlined className="text-gray-400" />} className=" border-gray-700  rounded-md" />
            </Form.Item>
            <Form.Item
              name='phone'
              label={<span className="text-black font-bold">Số điện thoại</span>}>
              <Input prefix={<PhoneOutlined className="text-gray-400" />} className=" border-gray-700  rounded-md" />
            </Form.Item>
            <Form.Item
              name='numOfAdults'
              label={<span className="text-black font-bold">Số lượng người lớn</span>}>
              <InputNumber prefix={<TeamOutlined className="text-gray-400" />} className="w-full  border-gray-700  " />
            </Form.Item>
            <Form.Item
              name='numOfChildren'
              label={<span className="text-black font-bold">Số lượng trẻ em</span>}>
              <InputNumber prefix={<TeamOutlined className="text-gray-400" />} className="w-full  border-gray-700  rounded-md" />
            </Form.Item>
            <Form.Item label={<span className="text-black font-bold">Ngày</span>}>
              <DatePicker
                onChange={onChange}
                className="w-full  border-gray-700  rounded-md"
                prefix={<CalendarOutlined className="text-gray-400" />} />
            </Form.Item>
          </Form>
        ) : (
          <div className='mt-4'>
            <label className=" text-sm font-medium block mb-2">
              Thời gian nhận xe và trả xe
            </label>
            <RangePicker
              placeholder={['Ngày nhận xe', 'Ngày trả xe']}
              size="large"
              className="w-full "
              value={dateRange[0] && dateRange[1] ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : [null, null]}
              onChange={handleDateChange}
              suffixIcon={<AccountBookOutlined className="text-blue-400"/>}
              format="YYYY-MM-DD"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            {restaurant && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-lg shadow-md">
                  <label className="text-blue-200 text-sm font-medium block mb-2">
                    Restaurant Adult Price
                  </label>
                  <p className="text-3xl text-white font-bold">
                    {selectedNotification?.restaurantAdultPrice.toLocaleString()} VNĐ
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-4 rounded-lg shadow-md">
                  <label className="text-amber-200 text-sm font-medium block mb-2">
                    Restaurant Children Price
                  </label>
                  <p className="text-3xl text-white font-bold">
                    {selectedNotification?.restaurantChildrenPrice.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            )}

            {!restaurant && (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-lg shadow-md">
                  <label className="text-blue-200 text-sm font-medium block mb-2">
                    Loại xe
                  </label>
                  <p className="text-2xl text-white font-bold">
                    {selectedNotification?.carType}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-lg shadow-md">
                  <label className="text-yellow-200 text-sm font-medium block mb-2">
                    Giá xe
                  </label>
                  <p className="text-3xl text-white font-bold">
                    {selectedNotification?.carPrice?.toLocaleString()} VNĐ
                  </p>
                </div>
              </>
            )}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <label className="text-blue-400 text-sm font-medium block mb-2">
                Giới thiệu {restaurant ? 'nhà hàng' : 'loại xe'}
              </label>
              <p className="text-gray-300 leading-relaxed">
                {selectedNotification?.carDescription}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-blue-400 text-sm font-medium block mb-2">
              Hình ảnh {restaurant ? 'nhà hàng' : 'xe'}
            </label>
            <div className="rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl duration-300 transform hover:scale-105">
              <Image.PreviewGroup items={(selectedNotification?.photos)}>
                <Image width='100%' src={selectedNotification?.photos[0]} className="object-cover h-80 w-full" />
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShuttleBookingModal;


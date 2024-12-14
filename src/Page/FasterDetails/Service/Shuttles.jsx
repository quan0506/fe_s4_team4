import Restaurant from "../../../component/Services/Restaurant.jsx";
import {useNavigate, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import upstashService from "../../../services/upstashService.js";
import { useModalHandlers } from "../../../constants/ModalHandlers.jsx";
import { Image, Modal , DatePicker } from "antd";
import toast from "react-hot-toast";
import {useState} from "react";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import {AccountBookOutlined} from "@ant-design/icons";
import UserStore from "../../../constants/states/user.js";
const Shuttles = () => {
  const { id } = useParams();
  const [dateRange , setDateRange] = useState(["", ""]);
  const navigate = useNavigate();
  const { data: listShuttlesid } = useQuery(
    'av.listShuttlesid',
    () => upstashService.getShuttlesid(id)
  );
  const {user} = UserStore();
  const { isModalVisible, handleRowClick, handleModalClose, selectedNotification } = useModalHandlers(null);
  console.log('selectedNotification' , selectedNotification)
  const handleOk = async () => {
    try {
       await upstashService.postBookingShuttle(selectedNotification?.branchId , selectedNotification?.id , user?.id ,{
          shuttleCheckInDate:dateRange[0].toString(),
          shuttleCheckOutDate:dateRange[1].toString(),
        })
      toast.success('Đặt xe thành công')
      navigate('/bookinghistory/shuttle')
    }catch (e){
      console.log(e)
      toast.error(e?.response?.data?.message)
    }
  }
  const handleDateChange = (_, dateStrings) => {
    setDateRange(dateStrings);
  };
  return (
    <div>
      <Restaurant
        handleRowClick={handleRowClick}
        id={id}
        api={listShuttlesid}
      />
      <Modal
        title={null}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleModalClose}
        width={800}
        cancelText='Hủy'
        okText='Đặt xe'
      >
        <div className="">
          <div className="border-b border-gray-700 pb-4 mb-6 flexs">
            <h2 className="text-2xl font-bold text-white">
              Thông tin đặt xe
            </h2>
            <div className='search'>
              <label className="text-gray-400 text-sm font-medium block mb-2">
                Thời gian nhận xe và trả xe
              </label>
              <RangePicker
                placeholder={['Ngày nhận xe', 'Ngày trả xe']}
                size="large"
                className="w-full border-white/10 text-white"
                value={dateRange[0] && dateRange[1] ? [dayjs(dateRange[0]), dayjs(dateRange[1])] : [null, null]}
                onChange={handleDateChange}
                suffixIcon={<AccountBookOutlined className="text-amber-400"/>}
                format="YYYY-MM-DD"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-gray-400 text-sm font-medium block mb-2">
                  Loại xe
                </label>
                <p className="text-xl text-white font-medium">
                  {selectedNotification?.carType}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium block mb-2">
                  Giá xe
                </label>
                <p
                  className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-amber-400">
                  {selectedNotification?.carPrice?.toLocaleString()}/VNĐ
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium block mb-2">
                  Giới thiệu loại xe
                </label>
                <p className="text-gray-300 leading-relaxed">
                  {selectedNotification?.carDescription}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-gray-400 text-sm font-medium block mb-2">
                Hình ảnh xe
              </label>
              <div className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300">
                <Image.PreviewGroup
                  items={selectedNotification?.photos}
                >
                  <Image
                     width='w-full'
                    src={selectedNotification?.photos[0]}
                  />
                </Image.PreviewGroup>
              </div>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Shuttles;

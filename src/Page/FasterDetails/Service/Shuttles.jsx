import Restaurant from "../../../component/Services/Restaurant.jsx";
import {useNavigate, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import upstashService from "../../../services/upstashService.js";
import { useModalHandlers } from "../../../constants/ModalHandlers.jsx";
import toast from "react-hot-toast";
import {useState} from "react";
import UserStore from "../../../constants/states/user.js";
import ShuttleBookingModal from "../../../component/ShuttleBookingModal.jsx";
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

  return (
    <div className='shuttles'>
      <Restaurant
        handleRowClick={handleRowClick}
        id={id}
        api={listShuttlesid}
      />
      <ShuttleBookingModal
        dateRange={dateRange}
        setDateRange={setDateRange}
        isModalVisible={isModalVisible}
        handleModalClose={handleModalClose}
        selectedNotification={selectedNotification}
        handleOk={handleOk}
      />
    </div>
  );
};

export default Shuttles;

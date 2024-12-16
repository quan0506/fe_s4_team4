import {useQuery} from "react-query";
import upstashService from "../../../services/upstashService.js";
import {useParams} from "react-router-dom";
import Restaurant from "../../../component/Services/Restaurant.jsx";
import {useModalHandlers} from "../../../constants/ModalHandlers.jsx";
import ShuttleBookingModal from "../../../component/ShuttleBookingModal.jsx";
import toast from "react-hot-toast";
import {useState} from "react";
import UserStore from "../../../constants/states/user.js";
import {Form} from "antd";

const Restaurants =() => {
  const { isModalVisible, handleRowClick, handleModalClose, selectedNotification } = useModalHandlers(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const {user} = UserStore();
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data: listRestaurantsid } = useQuery(
    'av.listRestaurantsid',
    () => upstashService.getrestaurantbranchId(id)
  );
  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };
  const handleOk = async (value) => {
    try {
      await upstashService.bookrestaurant(selectedNotification?.branchId , selectedNotification?.id , user?.id ,{
        ...value,
        dayCheckIn : selectedDate.toString()
      })
      toast.success('Đặt xe thành công')
    }catch (e){
      console.log(e)
      toast.error(e?.response?.data?.message)
    }
  }
  return (
    <>
      <div>
        <Restaurant
          restaurant={true}
          handleRowClick={handleRowClick}
          id={id}
          api={listRestaurantsid}
        />

        <ShuttleBookingModal
          handleOk={handleOk}
          form={form}
          onChange={onChange}
          restaurant={true}
          isModalVisible={isModalVisible}
          handleModalClose={handleModalClose}
          selectedNotification={selectedNotification}
        />
      </div>
    </>
  )
}
export default Restaurants;

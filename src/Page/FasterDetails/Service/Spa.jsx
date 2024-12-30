import Restaurant from "../../../component/Services/Restaurant.jsx";
import {useQuery} from "react-query";
import upstashService from "../../../services/upstashService.js";
import {useParams} from "react-router-dom";
import {useModalHandlers} from "../../../constants/ModalHandlers.jsx";
import ShuttleBookingModal from "../../../component/ShuttleBookingModal.jsx";
import toast from "react-hot-toast";
import {Form} from "antd";
import {useState} from "react";
import UserStore from "../../../constants/states/user.js";

const Spa = () => {
  const { isModalVisible, handleRowClick, handleModalClose, selectedNotification } = useModalHandlers(null);
  const { id } = useParams();
  const { data: listSpaid } = useQuery(
    'av.listSpaid',
    () => upstashService.getSpabranchId(id)
  );
  const {user} = UserStore();
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState("");
  const handleOk = async (value) => {
    try {
      await upstashService.postBookingSpa(selectedNotification?.branchId , selectedNotification?.id , user?.id ,{
        ...value,
        numberOfPeople:value.numberOfPeople.toString(),
        appointmentTime: dateRange
      })
      toast.success('Thêm lịch đặt spa thành công!')
    }catch (e){
      console.log(e)
      toast.error(e?.response?.data?.message || e.messgae)
    }
  }
  return (
    <>
      <Restaurant
        handleRowClick={handleRowClick}
        id={id}
        api={listSpaid}
      />
      <ShuttleBookingModal
        spa={true}
        handleOk={handleOk}
        form={form}
        // onChange={onChange}
        setDateRange={setDateRange}
        isModalVisible={isModalVisible}
        handleModalClose={handleModalClose}
        selectedNotification={selectedNotification}
      />
    </>
  )
}
export default Spa

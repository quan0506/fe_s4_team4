import BookingHistory from "../../component/History.tsx";
import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";
import UserStore from "../../constants/states/user.js";

const  HistoryRoomuser = () => {
  const {user}=UserStore()
  const { data: listhistorybookings } = useQuery(
    ['av.listhistorybookings' , user],
    () => upstashService.gethistorybookings(user?.id)
  );
  return (
    <>
      <BookingHistory

        title='đặt phòng'
        data={listhistorybookings}
      />
    </>
  )
}
export default HistoryRoomuser

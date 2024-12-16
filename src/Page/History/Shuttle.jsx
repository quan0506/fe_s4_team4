import BookingHistory from "../../component/History.js";
import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";
import UserStore from "../../constants/states/user.js";

const HistoryShuttle = () => {
  const {user}=UserStore()
  const { data: listhistoryshuttle } = useQuery(
    ['av.listhistoryshuttle' , user],
    () => upstashService.gethistoryshuttle(user?.id)
  );
  return (
    <>
      <BookingHistory
       data={listhistoryshuttle?.shuttleBookingList}
      />
    </>
  )
}
export default HistoryShuttle

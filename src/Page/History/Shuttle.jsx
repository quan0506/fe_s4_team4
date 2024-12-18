import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";
import UserStore from "../../constants/states/user.js";
import BookingHistory from "../../component/History.tsx";

const HistoryShuttle = () => {
  const {user}=UserStore()
  const { data: listhistoryshuttle } = useQuery(
    ['av.listhistoryshuttle' , user],
    () => upstashService.gethistoryshuttle(user?.id)
  );

  return (
    <>
      <BookingHistory
        title='xe'
       data={listhistoryshuttle?.shuttleBookingList}
      />
    </>
  )
}
export default HistoryShuttle

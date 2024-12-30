import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";
import UserStore from "../../constants/states/user.js";
import BookingHistory from "../../component/History.tsx";

const HistorySpa = () => {
  const {user}=UserStore()
  const { data: listhistoryspa } = useQuery(
    ['av.listhistoryspa' , user],
    () => upstashService.gethistoryspa(user?.id)
  );
  return (
    <>
      <BookingHistory
        spa={ true}
        title='spa'
        data={listhistoryspa?.spaBookingList}
      />
    </>
  )
}
export default HistorySpa

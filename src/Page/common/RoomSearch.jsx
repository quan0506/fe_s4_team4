import  { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Drawer } from 'antd';
import ImageCarousel from "./ImageCarousel";
import FromBooking from "../home/New/FomBooking";

const RoomSearch = ({ handleSearchResult }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);  // State to control the Drawer visibility

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div>
      <section
        className="absolute bottom-0  left-20 right-20 bg-white shadow-lg"
        onClick={() => setIsDrawerVisible(true)}  // Open Drawer on click
      >
        <div className="flex">
          <div className="flex-1 border-r border-gray-300 p-4">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="location">
              ĐỊA ĐIỂM
            </label>
            <input
              className="w-full text-sm text-gray-700 leading-tight focus:outline-none"
              id="location"
              type="text"
              value="Khách sạn Silverland Jolie"
              readOnly
            />
          </div>
          <div className="flex-1 border-r border-gray-300 p-4">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="check-in">
              CHECK-IN
            </label>
            <input
              className="w-full text-sm text-gray-700 leading-tight focus:outline-none"
              id="check-in"
              type="text"
              value={`${getCurrentDate()} — ${getTomorrowDate()}`}
              readOnly
            />
          </div>
          <div
            className="flex-none bg-[rgb(217,190,124)] font-bold p-4
                    flex items-center justify-center "
            style={{ width: '33.33%' }}
          >
            <button type="button" >
              ĐẶT NGAY
            </button>
          </div>
        </div>
      </section>
      <Drawer
        placement="bottom"
        closable={true}
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        title={<h1>Booking</h1>}
        height="80%"  // Set Drawer height to 50% of screen
      >
        <div>
          <ImageCarousel/>
        </div>
        <div>
            <FromBooking/>
        </div>
      </Drawer>
    </div>
);
};

export default RoomSearch;

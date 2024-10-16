import React, { useState, useEffect } from 'react';
import { DatePicker, Select, Input, Button, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import upstashService from "../../../services/upstashService.js";

const { RangePicker } = DatePicker;
const { Option } = Select;

const FromBooking = ({ handleSearchResult }) => {
  const [dateRange, setDateRange] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
        message.error('Failed to fetch room types');
      }
    };
    fetchRoomTypes();
  }, []);

  // const handleInternalSearch = async () => {
  //   if (dateRange.length !== 2 || !roomType) {
  //     message.error('Please select all fields');
  //     return;
  //   }
  //   try {
  //     const [startDate, endDate] = dateRange;
  //     const formattedStartDate = startDate.format('YYYY-MM-DD');
  //     const formattedEndDate = endDate.format('YYYY-MM-DD');
  //
  //
  //     if (response.statusCode === 200) {
  //       if (response.roomList.length === 0) {
  //         message.warning('Room not currently available for this date range on the selected room type.');
  //         return;
  //       }
  //       handleSearchResult(response.roomList);
  //     }
  //   } catch (error) {
  //     message.error("Unknown error occurred: " + error.response?.data?.message || error.message);
  //   }
  // };

  return (
    <div className="mt-10 border-t border-gray-300 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
          <Select
            style={{ width: '100%' }}
            placeholder="Select a property"
            onChange={setRoomType}
            value={roomType}
            size='large'
          >
            {roomTypes.map((type) => (
              <Option key={type} value={type}>{type}</Option>
            ))}
          </Select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in / Check-out</label>
          <RangePicker
            size='large'
            style={{ width: '100%' }}
            onChange={setDateRange}
            format="YYYY-MM-DD"
            placeholder={['Check-in', 'Check-out']}
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Promotion Code</label>
          <Input placeholder="Enter code"
                 size='large'
          />
        </div>
      </div>
      <Button
        size='large'
        type="primary"
        // onClick={handleInternalSearch}
        className="mt-6 w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300"
        icon={<CalendarOutlined />}
      >
        CHECK RATE
      </Button>
    </div>
  );
};

export default FromBooking;

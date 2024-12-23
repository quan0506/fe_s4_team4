import { useState } from "react";
import { DatePicker, Input, InputNumber, Slider, Button } from "antd";
import { SearchOutlined ,AccountBookOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;
 const SearchBooking = ({setCity, city}) => {
  const [date, setDate] = useState();
  const [guests, setGuests] = useState(1);
  const [priceRange, setPriceRange] = useState([0]);

  return (
    <div className='bg-[#313642] p-3 rounded-2xl	'>
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r
                        from-amber-200 to-yellow-400 bg-clip-text
                         text-transparent text-center">
          Tìm kiếm theo yêu cầu của bạn
        </h2>
        <div className="space-y-4">
          <div className='search'>
            <label className="block text-sm font-medium text-white/80">Địa điểm</label>
            <Input
              size='large'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Bạn đang cần tìm thành phố nào?"
              className="border-white/10 text-white"
              prefix={<SearchOutlined className="text-amber-400"/>}
            />
          </div>
          <div className='search'>
            <label className="block text-sm font-medium text-white/80">Ngày nhận phòng & trả phòng</label>
            <RangePicker
              placeholder={['Ngày nhận phòng', 'Ngày trả phòng']}
              size="large"
              className="w-full border-white/10 text-white"
              onChange={(dates) => {
                if (dates) {
                  setDate({
                    from: dates[0]?.toDate(),
                    to: dates[1]?.toDate(),
                  });
                } else {
                  setDate(undefined);
                }
              }}
              suffixIcon={<AccountBookOutlined className="text-amber-400"/>}
            />
          </div>
          <div className='grid md:grid-cols-3 gap-3'>
            <div className='search'>
              <label className="block text-sm font-medium text-white/80">Người lớn</label>
              <InputNumber
                size='large'
                min={1}
                value={guests}
                onChange={(value) => setGuests(value || 1)}
                className="w-full  border border-white/10"
              />
            </div>
            <div className='search'>
              <label className="block text-sm font-medium text-white/80">Trẻ em</label>
              <InputNumber
                size='large'
                min={1}
                value={guests}
                onChange={(value) => setGuests(value || 1)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div className='search'>
              <label className="block text-sm font-medium text-white/80">Phòng</label>
              <InputNumber
                size='large'
                min={1}
                value={guests}
                onChange={(value) => setGuests(value || 1)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80">Price Range</label>
            <div >
              <Slider
                defaultValue={0}
                max={10000}
                step={100}
                value={priceRange[0]}
                onChange={(value) => setPriceRange([value])}
                className="w-full"
              />
              <div className="mt-2 text-sm text-white/70">
                Up to ${priceRange[0].toLocaleString()}
              </div>
            </div>
          </div>
          <Button
            size="large"
            className="w-full"
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </div>
  );
 };
export default SearchBooking;

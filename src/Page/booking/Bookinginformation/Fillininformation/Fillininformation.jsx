import {
  Checkbox,
  Col,
  Radio,
  Row,
  Space,
  Typography,
  Divider,
  Button,
  DatePicker,
  InputNumber
} from "antd";
import { HomeOutlined, ClockCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Tag, Wallet } from 'lucide-react'
import toast from "react-hot-toast";
import upstashService from "../../../../services/upstashService.js";
import UserStore from "../../../../constants/states/user.js";
import {useState} from "react";
const { Title } = Typography;

const Fillininformation = ({ setCurrentStep, setStartDate, setDiscountcode,
                             setAdults, setChildren, children, startDate,
                             litsroomid, adults, TotalAmount, discountcode }) => {
  const { RangePicker } = DatePicker;
  const { user } = UserStore()
  const [paymentMethod, setPaymentMethod] = useState('zalopay');
  const onFinish = async () => {
    if (!paymentMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán');
      return;
    }
    upstashService.postbookingsRoom({
      user: user?.id,
      room: litsroomid?.id,
      checkInDate: startDate[0],
      checkOutDate: startDate[1],
      adults: adults,
      children: children,
      totalPrice: TotalAmount,
      paymentMethod: paymentMethod,
      confirmBookingCode: discountcode,
      status: 'oke'
    })
    setCurrentStep(2);
  };

  return (
    <div className="fillininformation p-8 rounded-2xl shadow-lg bg-[rgba(51,61,77,0.5)] from-gray-100 to-gray-300">
      <div>
        <div className="mb-6 text-xl text-amber-400 flex items-center">
          <HomeOutlined className="mr-2 text-yellow-500"/> Thời gian đặt phòng
        </div>
        <div className='grid md:grid-cols-3 gap-3'>
          <div className="relative flex-shrink-0 ">
            <input
              type="text"
              placeholder="Nhập mã"
              onChange={(e) => setDiscountcode(e.target.value)}
              className="w-full px-3 py-2 bg-[rgb(108,106,126)]
               border border-gray-300 rounded-md focus:outline-none
                focus:border-amber-300 transition-colors "/>
            <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(81,79,94)]" size={15}/>
          </div>
          <div className='search'>
            <InputNumber
              placeholder='Số lượng trẻ em'
              size='large'
              min={1}
              onChange={(value) => setChildren(value || 1)}
              className="w-full bg-[rgb(108,106,126)]
               border border-gray-300 rounded-md focus:outline-none
                focus:border-amber-300 transition-colors "
            />
          </div>
          <div className='search'>
            <InputNumber
              placeholder='Số lượng người lớn'
              size='large'
              min={1}
              onChange={(value) => setAdults(value || 1)}
              className="w-full bg-[rgb(108,106,126)]
               border border-gray-300 rounded-md focus:outline-none
                focus:border-amber-300 transition-colors "
            />
          </div>
          <div className="flex-grow">
            <RangePicker
              name="rangePicker"
              size="large"
              className="w-full"
              placeholder={['Chọn ngày nhận phòng', 'Chọn ngày trả phòng']}
              onChange={(dates, dateStrings) => {
                setStartDate(dateStrings);
              }}
              format="DD-MM-YYYY"
            />
          </div>
        </div>
      </div>

      <Divider orientation="left" className="text-gray-800 font-bold my-8">
        <div className='text-white'>Yêu Cầu Đặc Biệt</div>
      </Divider>

      <div>
        <Title level={4} className="mb-4 text-gray-800 flex items-center">
          <ClockCircleOutlined className="mr-2 text-yellow-500"/>
          <div className='text-amber-400'>Hãy cho chúng tôi biết Quý khách cần gì?</div>
        </Title>
        <Space direction="vertical" size="large" className="w-full">
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <div className="text-amber-400 font-bold mb-2">Loại Phòng</div>
                <Radio.Group defaultValue="non-smoking" className="w-full">
                  <Radio className="py-2 text-white">Phòng không hút thuốc</Radio>
                  <Radio className="py-2 text-white">Phòng hút thuốc</Radio>
                </Radio.Group>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical">
                <div className="text-amber-400 font-bold mb-2">Loại Giường</div>
                <Radio.Group defaultValue="large-bed" className="w-full">
                  <Radio className="py-2 text-white">Tôi muốn lấy giường lớn</Radio>
                  <Radio className="py-2 text-white">Tôi muốn lấy giường đôi</Radio>
                </Radio.Group>
              </Space>
            </Col>
          </Row>
          <Space direction="vertical">
            <div className="text-amber-400 font-bold mb-2">Yêu Cầu Khác</div>
            <Checkbox className="py-2 text-white">Tôi muốn lấy phòng tầng cao</Checkbox>
            <Checkbox className="py-2 text-white">Thêm nôi trẻ em (có thể áp dụng phụ phí)</Checkbox>
            <Checkbox className="py-2 text-white">Giờ nhận phòng</Checkbox>
            <Checkbox className="py-2 text-white">Giờ trả phòng</Checkbox>
          </Space>
        </Space>
      </div>
      <div>
        <Title level={4} className="mb-4 text-gray-800 flex items-center">
          <CreditCardOutlined className="mr-2 text-yellow-500"/>
          <div className='text-amber-400'>Chọn phương thức thanh toán</div>
        </Title>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="w-full"
        >
          <Space direction="horizontal" className="w-full justify-center">
            <Radio value="zalopay" className="payment-option">
              <div className="flex items-center justify-between w-[150px] p-4 bg-[rgba(81,79,94,0.8)] rounded-lg">
                <div className="flex items-center">
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                    alt="ZaloPay"
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-white font-semibold">ZaloPay</span>
                </div>
              </div>
            </Radio>
            <Radio value="paybo" className="payment-option">
              <div className="flex items-center justify-between w-[150px] p-4 bg-[rgba(81,79,94,0.8)] rounded-lg">
                <div className="flex items-center">
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                    alt="PayBo"
                    className="w-8 h-8 mr-3"
                  />
                  <span className="text-white font-semibold">Paypal</span>
                </div>
              </div>
            </Radio>
          </Space>
        </Radio.Group>

      </div>

      <Button
        onClick={() => {
          if (children === 0) {
            toast.error('Vui lòng nhập số lượng người')
            return
          }
          if (startDate.length < 2) {
            toast.error('Vui lòng điền đầy đủ thời gian nhận và trả phòng')
            return;
          }
          if (!paymentMethod) {
            toast.error('Vui lòng chọn phương thức thanh toán')
            return;
          }
          onFinish();
        }}
        size='large'
        className='w-full mt-8 bg-amber-500 hover:bg-amber-600 text-white font-bold'>
        TIẾP TỤC
      </Button>
    </div>
  );
};

export default Fillininformation;


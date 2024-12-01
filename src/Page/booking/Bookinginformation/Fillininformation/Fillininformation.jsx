import {Checkbox, Col, Form, Radio, Row, Space, Typography, Divider, Button, DatePicker, Input} from "antd";
import { HomeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Tag } from 'lucide-react'
const { Title } = Typography;
const Fillininformation = ({ setCurrentStep , setStartDate, setDiscountcode}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const onFinish = (values) => {
    console.log('Form values:', values);
    setCurrentStep(1);
  };
  return (
    <div className=" fillininformation  p-8  rounded-2xl shadow-lg bg-[rgba(51,61,77,0.5)] from-gray-100 to-gray-300">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div>
          <div className="mb-6 text-xl text-amber-400 flex items-center">
            <HomeOutlined className="mr-2 text-yellow-500"/> Thời gian đặt phòng
          </div>
          <div className='flex flex-col md:flex-row gap-4'>
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
            <div className="relative flex-shrink-0 md:w-1/3">
              <input
                type="text"
                placeholder="Nhập mã"
                onChange={(e) => setDiscountcode(e.target.value)}
                className="w-full px-3 py-2  bg-[rgb(108,106,126)]
                 border border-gray-300 rounded-md focus:outline-none
                  focus:border-amber-300 transition-colors "/>
              <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(81,79,94)]" size={15}/>
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
        <Form.Item className="mt-8 text-center">
          <Button
            onClick={() => form.submit()}
            size='large'
            className='w-full'>
            TIẾP TỤC
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Fillininformation;

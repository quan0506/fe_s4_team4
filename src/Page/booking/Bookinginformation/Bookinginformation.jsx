import { useState } from 'react';
import { Card, Steps, Row, Col, Typography, Divider, Space } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import Fillininformation from "./Fillininformation/Fillininformation.jsx";
import VNPay from "./Fillininformation/VNPay.jsx";
import Index from "./Thank/Index.jsx";
import {useQuery} from "react-query";
import upstashService from "../../../services/upstashService.js";
import {useParams} from "react-router-dom";
const { Title, Text } = Typography;
export default function BookingInformation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [startDate, setStartDate] = useState([]);

  const { id } = useParams();
  const { data: litsroomid } = useQuery(
    'av.litsroomid',
    () => upstashService.getRoomId(id)
  );
  const giamgia= 40
  const TotalAmount = litsroomid?.roomPrice * (1 - giamgia / 100)
  const discountAmount = litsroomid?.roomPrice * (giamgia / 100);
  return (
    <div
      style={{
        backgroundImage: "url('https://cdn-www.vinid.net/2d57b9b5-dat-phong-agoda.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{maxWidth: 1200, margin: '0 auto', padding: '24px'}}>
        <Steps
          current={currentStep}
          items={[
            {title: 'Điền thông tin'},
            {title: 'Thanh Toán'},
            {title: 'Xác nhận'},
          ]}
          style={{marginBottom: 32}}
        />
        <Row gutter={24}>
          <Col xs={24} sm={16} md={currentStep === 2 ? 24 : 16}>
            {currentStep === 0 && (
              <Fillininformation
                setStartDate={setStartDate}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 1 && (
              <div>
                <Title level={4}>Thanh Toán</Title>
                <VNPay
                  setCurrentStep={setCurrentStep}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <Index/>
              </div>
            )}
          </Col>
          {(currentStep === 0 || currentStep === 1) && (
            <Col xs={24} sm={8} md={8}>
              <Card>
                <Title level={4}>Thông tin đặt phòng</Title>
                <Title level={5}>Khách sạn Riva Vũng Tàu</Title>
                <Text type="secondary">Phòng Superior</Text>
                <Divider/>
                <Space direction="vertical" size="middle" style={{width: '100%'}}>
                  <Space className='flexs'>
                    <div>
                      <Text type="secondary">Ngày nhận phòng</Text>
                      <br/>
                      <Text strong>{startDate[0]}</Text>
                    </div>
                    <div>
                      <Text type="secondary">Ngày trả phòng</Text>
                      <br/>
                      <Text strong>{startDate[0]}</Text>
                    </div>
                  </Space>
                  <div>
                    <Text type="secondary">Số khách phòng</Text>
                    <br/>
                    <Text strong>2 khách, 1 phòng</Text>
                  </div>
                </Space>
                <Divider/>
                <Space direction="vertical" size="small" style={{width: '100%'}}>
                  <Row justify="space-between">
                    <Col>1 phòng x 1 đêm</Col>
                    <Col>{litsroomid?.roomPrice.toLocaleString()} VND</Col>
                  </Row>
                  <Row justify="space-between">
                    <Col><Text type="success">Promo giảm {giamgia}%</Text></Col>
                    <Col><Text type="success">- {discountAmount} VND</Text></Col>
                  </Row>
                  <Row justify="space-between">
                    <Col><Text type="success">Phí dịch vụ</Text></Col>
                    <Col><Text type="success">MIỄN PHÍ</Text></Col>
                  </Row>
                </Space>
                <Divider/>
                <Row justify="space-between">
                  <Col><Text strong>Tổng tiền</Text></Col>
                  <Col><Text strong>{TotalAmount.toLocaleString()} VND</Text></Col>
                </Row>
                <div style={{backgroundColor: '#FFFBE6', padding: 16, borderRadius: 8, marginTop: 16}}>
                  <Text>Booking của bạn đang được chờ xác nhận. Tư vấn viên sẽ sớm liên hệ với bạn</Text>
                </div>
                <div style={{marginTop: 16}}>
                  <Space>
                    <PhoneOutlined/>
                    <Text>Gọi <Text strong>1900 4698</Text> để được hỗ trợ 24/7</Text>
                  </Space>
                </div>
              </Card>
            </Col>
          )
          }
        </Row>
      </div>
    </div>
  );
}

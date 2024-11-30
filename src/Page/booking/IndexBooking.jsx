import SearchBooking from "./SearchBooking.jsx";
import Room from "./Room.jsx";
import HeaderPega from "../../component/HeaderPega.jsx";
import {Col, Row} from "antd";
const IndexBooking = () => {
  return (
    <div className="bg-[#1c2638] ">
      <HeaderPega
        title='Các loại phòng'
        backgroundImage='https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
        description='Trải nghiệm sự sang trọng vô song trên khắp Việt Nam'
      />
      <Row className='p-4' gutter={16}>
        <Col md={7}>
            <SearchBooking/>
        </Col>
        <Col md={17}>
          <Room/>
        </Col>
      </Row>
    </div>
  )
}
export default IndexBooking

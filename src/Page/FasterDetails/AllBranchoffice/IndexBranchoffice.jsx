import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import upstashService from "../../../services/upstashService.js";
import HeaderPega from "../../../component/HeaderPega.jsx";
import Room from "../../../component/Room.jsx";
import { Button, Col, Drawer, Row } from "antd";
import SearchBooking from "../../booking/SearchBooking.jsx";
import Roomdetails from "../../../component/Roomdetails/Roomdetails.jsx";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const IndexBranchoffice = () => {
  const { id } = useParams();
  const { data: detailBranches } = useQuery(
    "av.detailBranchesID",
    () => upstashService.getBranchesid(id)
  );
  const [open, setOpen] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  return (
    <>
      <div className="bg-[#1c2638] ">
        <HeaderPega
          title="Các loại phòng"
          backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          description={`Trải nghiệm sự sang trọng cùng chi nhánh ${detailBranches?.address}`}
        />
        <Row className="p-4" gutter={16}>
          <Col md={7}>
            <SearchBooking />
          </Col>
          <Col md={17}>
            {detailBranches?.rooms?.map((item) => (
              <div key={item.id}>
                <Room
                  setOpen={() => {
                    setCurrentRoomId(item.id);
                    setOpen(true);
                  }}
                  title={item?.roomType}
                  location="Ha Noi Hanoi"
                  description={item?.description}
                  images={item?.photos}
                  originalPrice={5114630}
                  discountedPrice={item?.roomPrice}
                  rating={5}
                />

                <Drawer
                  title={<span className="text-[#D4AF37]">Room Details</span>}
                  open={open}
                  onClose={() => {
                    setOpen(false);
                    setCurrentRoomId(null);
                  }}
                  width={800}
                  styles={{
                    header: {
                      backgroundColor: "#1a1a2e",
                      borderBottom: "1px solid #2a2a3e",
                    },
                    body: {
                      backgroundColor: "#333d4d",
                    },
                  }}
                  extra={
                    <Button
                      shape="circle"
                      icon={<CloseOutlined />}
                      onClick={() => {
                        setOpen(false);
                        setCurrentRoomId(null);
                      }}
                      className="border-[#D4AF37] text-black"
                    />
                  }
                >
                  <Roomdetails
                    id={currentRoomId}
                  />
                </Drawer>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IndexBranchoffice;

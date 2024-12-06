import { useState } from "react";
import { Button, Drawer, ConfigProvider, theme, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Roomdetails from "../../component/Roomdetails/Roomdetails";
import Room from "../../component/Room.jsx";
import { useQuery } from "react-query";
import upstashService from "../../services/upstashService.js";

export default function HotelCard() {
  const [open, setOpen] = useState(false);
  const { data: listAllroom, isLoading, error } = useQuery(
    "av.listAllroom",
    () => upstashService.getAllRoom()
  );
  console.log(listAllroom)
  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error loading rooms: {error.message}</div>;
  }

  if (!listAllroom || listAllroom.length === 0) {
    return <div>No rooms available.</div>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#D4AF37",
          colorBgContainer: "#1a1a2e",
          borderRadius: 8,
        },
      }}
    >
      {listAllroom.map((item, index) => (
        <Room
          key={index}
          setOpen={setOpen}
          title={item?.roomType}
          location={item?.address}
          description={item?.description}
          images={item?.photos}
          originalPrice={5114630}
          discountedPrice={2864198}
          rating={5}
        />
      ))}
      <Drawer
        title={<span className="text-[#D4AF37]">Room Details</span>}
        open={open}
        onClose={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
            className="border-[#D4AF37] text-black"
          />
        }
      >
        <Roomdetails />
      </Drawer>
    </ConfigProvider>
  );
}

import { useState } from "react"
import { Button, Drawer, ConfigProvider, theme } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Roomdetails from "../../component/Roomdetails/Roomdetails"
import Room from "../../component/Room.jsx";

export default function HotelCard() {
  const [open, setOpen] = useState(false)
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#D4AF37',
          colorBgContainer: '#1a1a2e',
          borderRadius: 8,
        },
      }}
    >
      <Room
        setOpen={setOpen}
        title = "Muong Thanh Hotel"
        location = "Ha Noi Hanoi"
        description = "Tracing a captivating path through the heart of the 'Pearl of the Far East', Silverland's eight hotels reflect the unique history and culture of this majestic metropolis with distinct designs, old-world flair and a commitment to making each and every guest arrival feel like a celebrated homecoming. Eight properties. Eight distinctive locations. Eight great ways to experience the soul of Saigon."
        images = {[
        "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
        "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7044&type=jpg",
        "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
        "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
        ]}
        originalPrice = {5114630}
        discountedPrice = {2864198}
        rating ={5}
      />
      <Drawer
        title={<span className="text-[#D4AF37]">Room Details</span>}
        open={open}
        onClose={() => setOpen(false)}
        width={800}
        styles={{
          header: {
            backgroundColor: '#1a1a2e',
            borderBottom: '1px solid #2a2a3e'
          },
          body: {
            backgroundColor: '#333d4d'
          }
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
  )
}

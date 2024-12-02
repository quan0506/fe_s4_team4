import {Button, Card, Image, Tag, Typography} from "antd";
import Slider from "react-slick";
import {ArrowRightOutlined, EnvironmentOutlined, StarFilled, WifiOutlined} from "@ant-design/icons";
import {Car, SpadeIcon as Spa, Utensils} from "lucide-react";
import {useState} from "react";
const { Title, Text, Paragraph } = Typography
const Room = ({title,location,description,images,originalPrice,discountedPrice,rating , setOpen,key}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, setSliderRef] = useState(null)
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  }

  const handleThumbnailClick = (index) => {
    if (sliderRef) {
      sliderRef.slickGoTo(index)
    }
  }
  return (
    <>
      <Card
        key={key}
        hoverable
        className="w-full  mx-auto overflow-hidden transition-all duration-300
        hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-[rgb(51,61,77)]"
      >
        <div className="flex flex-col md:flex-row gap-6 IndexFasterDetails">
          <div className="md:w-1/3 relative">
            <Slider ref={slider => setSliderRef(slider)} {...sliderSettings}>
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    className="w-full aspect-[4/3] object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
            <Tag color="red" className="absolute top-3 left-3 z-10">
              Only 1 left
            </Tag>
            <div className="flex justify-center mt-2">
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`w-16 h-11 mx-1 cursor-pointer rounded ${
                    currentSlide === index ? 'border-2 border-[#D4AF37]' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleThumbnailClick(index)
                  }}
                >
                  <Image
                    src={image}
                    className="w-full h-full object-cover rounded"
                    preview={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <Title level={4} className="!mb-1 !text-[#D4AF37]">{title}</Title>
                <div className="flex items-center gap-1 text-gray-400">
                  <EnvironmentOutlined className="text-[#D4AF37]"/>
                  <Text className="text-gray-400">{location}</Text>
                </div>
              </div>
              <div className="flex">
                {[...Array(rating)].map((_, i) => (
                  <StarFilled key={i} className="text-[#D4AF37]" />
                ))}
              </div>
            </div>
            <div className="h-[150px] overflow-auto">
              <Paragraph className="text-gray-300">
                {description}
              </Paragraph>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <WifiOutlined className="text-[#D4AF37]" />
                <Text className="text-gray-300">Free Wi-Fi</Text>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#D4AF37]" />
                <Text className="text-gray-300">Car Service</Text>
              </div>
              <div className="flex items-center gap-2">
                <Spa className="w-4 h-4 text-[#D4AF37]" />
                <Text className="text-gray-300">Spa</Text>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#D4AF37]" />
                <Text className="text-gray-300">Restaurant</Text>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <Text className="block text-gray-500 line-through">
                  {formatter.format(originalPrice)}
                </Text>
                <div className="flex items-baseline gap-1">
                  <Text className="text-2xl font-bold text-[#D4AF37]">
                    {formatter.format(discountedPrice)}
                  </Text>
                  <Text className="text-gray-400">/nightly</Text>
                </div>
              </div>
              <Button
                size="large"
                className="flex items-center gap-2  hover:bg-[#B4941F] border-none"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(true)
                }}
              >
                View Details
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
export default Room;

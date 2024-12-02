import { Button } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Article() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
    "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7044&type=jpg",
    "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
    "https://images.travelanium.net/crs-file-manager/images/hotel?propertyid=1039&group=2&width=600&height=400&imageid=7043&type=jpg",
  ];

  return (
    <div className="flex flex-col md:flex-row bg-[rgb(51,61,77)] text-white Article">
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif mb-4">Silverland Banquet</h1>
        <p className="text-xl md:text-2xl italic text-gray-300 mb-6">"Tinh cá nhân tạo nên sự quý phái"</p>
        <p className="text-gray-300 leading-relaxed mb-8">
          Bên cạnh dịch vụ lưu trú tiện nghi và chất lượng, dịch vụ Sảnh
          tiệc chuyên nghiệp và ấn tượng của Silverland Hospitality mang
          đến những trải nghiệm phong cách độc đáo, ghi dấu ấn cá nhân
          cho khách hàng. Mang trong mình triết lý "Luxury is personal" –
          "Tính cá nhân tạo nên sự quý phái", các không gian sảnh tiệc tại
          Silverland Hospitality được thiết kế hiện đại, có tính thẩm mỹ
          cao và mang đậm hơi thở của thành phố với những cá tính
          riêng biệt.
        </p>
        <Button className="bg-[#D2B48C] text-black hover:bg-[#C19A6B] w-fit">
          KHÁM PHÁ CÁC DỊCH VỤ
        </Button>
      </div>
      <div className="md:w-1/2">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Silverland Banquet Room ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

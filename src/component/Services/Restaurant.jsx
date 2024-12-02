import { MapPin, Clock , CircleDollarSign  } from 'lucide-react'
import { Slide } from "react-slideshow-image"
import { useRef } from "react"
import { SlideButton } from "../SlideButton.jsx"
import {Button, Col, Empty, Row} from "antd"
import HeaderPega from "../HeaderPega.jsx";
export default function Restaurant({api , handleRowClick}) {
  const slideRef = useRef(null)
  return (
    <>
      {api?.shuttleList.length > 0 ? (
        <div className="relative mt-5 restaurant bg-[#1c2638]">
          <HeaderPega
            title="Dịch vụ"
            description="Bên cạnh dịch vụ lưu trú tiện nghi và chất lượng,
        Silverland Hospitality còn nâng cao trải nghiệm với các dịch
        vụ Ẩm thực & Đồ uống chuyên nghiệp, đặc sắc, mang đến những
         trải nghiệm độc đáo và riêng biệt cho khách hàng."
            backgroundImage="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
          />
          <Slide ref={slideRef} indicators={true} autoplay={false} canSwipe={false}>
            {api?.shuttleList.map((slide, index) => (
              <div key={index} className="h-auto md:h-[700px] w-full mt-8">
                <div className="relative">
                  <img
                    src={slide.carPhotoUrl}
                    className="w-full h-[400px] object-cover sm:h-[500px] md:h-[600px]"
                  />
                  <div
                    className="absolute bottom-0 right-0 w-full md:w-2/3 bg-[rgba(51,61,77,0.5)] p-6 md:p-10 translate-y-[70%] md:translate-y-[30%] shadow-xl">
                    <div className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Restaurants & Bars
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{slide.carType}</h1>
                    <Row gutter={[24, 24]}
                         className="border-t-2 border-gray-200 pt-4 max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <Col xs={24} md={9}>
                        <div className="flex items-start text-gray-600 mb-4">
                          <MapPin className="w-5 h-5 mr-2  flex-shrink-0 text-[#d4af37]"/>
                          <span className="text-sm text-white">12th Floor - The Myst Dong Khoi Hotel</span>
                        </div>
                        <div className="flex items-start text-gray-600 mb-4">
                          <Clock className="w-5 h-5 mr-2 flex-shrink-0 text-[#d4af37]"/>
                          <div className="text-sm text-white">
                            <div className="mb-1">06:00 – 10:00 : Breakfast Buffet</div>
                          </div>
                        </div>
                        <div className="flex items-start text-gray-600">
                          <CircleDollarSign  className="w-5 h-5 mr-2 flex-shrink-0 text-[#d4af37]"/>
                          <div className="text-sm text-white">
                            <div className="mb-1">{slide.carPrice.toLocaleString()}/VNĐ</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={15}>
                        <p className="text-sm leading-relaxed text-white">
                          {slide.carDescription}
                        </p>
                      </Col>
                    </Row>
                    <Button
                      onClick={handleRowClick}
                      size='large'
                      className="mt-4">
                      ĐẶT DỊCH VỤ
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
          <div className="absolute hidden md:flex left-10 bottom-4 gap-3 z-10">
            <SlideButton
              direction="left"
              onClick={() => slideRef.current?.goBack()}
            />
            <SlideButton
              direction="right"
              onClick={() => slideRef.current?.goNext()}
            />
          </div>
        </div>
      ) : (
        <Empty description='Chưa có dữ liệu'/>
      )}
    </>
  )
}


'use client'

import { MapPin, Clock } from 'lucide-react'
import { Slide } from "react-slideshow-image"
import { useRef } from "react"
import { SlideButton } from "../../component/SlideButton.jsx"
import { Col, Row } from "antd"

export default function Restaurant() {
  const slideRef = useRef(null)

  const slides = [
    {
      image: "https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/28-2.png",
      title: "The Nest Restaurant",
      location: "12th Floor - The Myst Dong Khoi Hotel",
      hours: [
        "06:00 – 10:00 : Breakfast Buffet",
        "14:00 – 16:00 : Afternoon Hi-tea Buffet",
        "10:00 – 14:00 & 16:00 – 22:00 : Alacart Menu"
      ],
      description: "The Nest embodies the nostalgic charm of a family home. Its red roof tiles, stone floors, and exquisite Vietnamese decor infuse warmth and tradition into an unparalleled all-day dining affair in Saigon. The buffet is uniquely presented on a nine-meter wooden boat, reminiscent of those gracing the Saigon River in spring, laden with blossoms and fruits. This distinctive touch not only adds to the aesthetic appeal but also offers a delightful culinary journey, blending tradition and innovation to create a dining experience that is both visually and gastronomically captivating."
    },
    // Add more slides here if needed
  ]

  return (
    <div className="relative mt-5 restaurant">
      <Slide ref={slideRef} indicators={true} autoplay={false} canSwipe={false}>
        {slides.map((slide, index) => (
          <div key={index} className="h-auto md:h-[700px] w-full">
            <div className="relative">
              <img
                src={slide.image}
                alt={`${slide.title} Interior`}
                className="w-full h-[400px] object-cover sm:h-[500px] md:h-[600px]"
              />
              <div className="absolute bottom-0 right-0 w-full md:w-2/3 bg-[rgba(51,61,77,0.5)] p-6 md:p-10 translate-y-[70%] md:translate-y-[30%] shadow-xl">
                <div className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Restaurants & Bars</div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{slide.title}</h1>
                <Row gutter={[24, 24]} className="border-t-2 border-gray-200 pt-4 max-h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <Col xs={24} md={9}>
                    <div className="flex items-start text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-[#d4af37]"/>
                      <span className="text-sm text-white">{slide.location}</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <Clock className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-[#d4af37]"/>
                      <div className="text-sm text-white">
                        {slide.hours.map((hour, i) => (
                          <div key={i} className="mb-1">{hour}</div>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={15}>
                    <p className="text-sm leading-relaxed text-white">
                      {slide.description}
                    </p>
                  </Col>
                </Row>
                <button className="mt-4 text-[#d4af37] hover:text-[#c4a030] underline hover:no-underline transition-colors duration-200 focus:outline-none">
                  Xem Chi Tiết
                </button>
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
  )
}


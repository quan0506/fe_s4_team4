'use client'

import { useState, useRef } from 'react'
import {Button, Carousel} from 'antd'
import {ArrowRightOutlined, CalendarOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons'
import ButtomBookNow from "../CardWithMotion.jsx"
import Amenities from "./Amenities.jsx"
import Features from "./Features.jsx"
import { ArrowDownToDot, ArrowUpFromDot } from "lucide-react"
import useExpandableText from "../../constants/useExpandableText.js"
import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";

export default function Component({id}) {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "Junior Suite Living Room"
    },
    {
      url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      alt: "Junior Suite Exterior"
    },
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      alt: "Junior Suite Bedroom"
    }
  ]
  const { data: litsroomid } = useQuery(
    'av.litsroomid',
    () => upstashService.getRoomId(id)
  );
  const { isExpanded, isOverflow, toggleText, textRef } = useExpandableText()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)
  const photoArray = litsroomid?.photo.split(',').map(photo => photo.trim());
  const handleThumbnailClick = (index) => {
    setActiveIndex(index)
    carouselRef.current.goTo(index)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto ">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <Carousel
            ref={carouselRef}
            arrows
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            autoplay
            className="h-[500px]"
            beforeChange={(from, to) => setActiveIndex(to)}
          >
            {images.map((image, index) => (
              <div key={index}>
                <div className="relative h-[500px]">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            ))}
          </Carousel>
          <div className="absolute bottom-0 left-0 p-8 text-white z-10">
            <p className="text-2xl font-serif">Điểm đặc trưng phòng {litsroomid?.roomType}</p>
          </div>
        </div>
        {/* Thumbnail Gallery */}
        <div className="flex justify-center gap-2 mb-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-300 ${
                index === activeIndex ? 'ring-2 ring-burgundy scale-105' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div>
          <div className='flexs'>
            <div>
              <h1 className="text-4xl md:text-5xl text-white">Sunshine Garden</h1>
              <p className="text-2xl font-serif text-[#D4AF37]">
                Từ {litsroomid?.roomPrice.toLocaleString()} vnđ/đêm
              </p>
            </div>
            <div>
              <a href='/bookinginformation/1' target='_blank'>
                <Button
                  size="large"
                  className="flex items-center gap-2  hover:bg-[#B4941F] border-none"
                >
                  Đặt Ngay
                  <CalendarOutlined />
                </Button>
              </a>
            </div>
          </div>
          <Features/>
          <div className='mt-8'>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold	 font-serif text-burgundy mb-4 prose text-white">
                Tiện nghi trong phòng
              </h2>
              <Amenities/>
            </div>
          </div>
          <div className="mt-8 prose max-w-none">
            <h2 className="text-2xl font-serif text-burgundy mb-4 text-white">Mô tả</h2>
            <p
              ref={textRef}
              className={`scrool mb-0  text-white ${isExpanded ? 'h-[197px] overflow-auto' : 'line-clamp-3 h-auto'}`}>
              {litsroomid?.description}
            </p>
            {isOverflow && (
              <button
                className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-2 mx-auto transition-transform duration-300 hover:scale-110"
                onClick={toggleText}
              >
                {isExpanded ? (
                  <ArrowUpFromDot className="animate-bounce text-[#D4AF37]" />
                ) : (
                  <ArrowDownToDot className="animate-bounce text-[#D4AF37]" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
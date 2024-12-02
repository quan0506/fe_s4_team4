import { useRef } from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { Button } from "antd"
import { SlideButton } from "../SlideButton.jsx"
import { MapPin, Clock } from 'lucide-react'

export default function SlideSapa() {
  const slideRef = useRef(null)

  const slides = [
    {
      category: 'Spa',
      image: "https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/28-2.png",
      title: "Bason Café Thì Sách tại sảnh khách sạn Silverland Mây",
      description: "An nhiên và mộng mơ bên khung cửa sổ lớn và hàng me xanh cao vút bên ngoài, Bason Café Thì Sách tại sảnh khách sạn Silverland Mây gợi liên tưởng đến những giờ phút thong dong tự tại, lòng an yên nhìn ngắm những vạt nắng vui đùa trên ly latte thơm.",
      subDescription: "Không chỉ là nơi để thưởng thức những thức uống thơm ngon mà đây còn là nơi gặp gỡ của những tâm hồn say đắm về đẹp của Sài Gòn xưa và nay. Đến với Bason Café Thì Sách để trải nghiệm một \"Sài Gòn Mơ\" ngay giữa lòng thành phố đầy ồn ào, vội vã.",
      location: "Tầng Trệt - Khách sạn Silverland May",
      hours: "7:00 AM - 22:00 PM"
    },
    // Add more slides here if needed
  ]

  return (
    <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-lg ">
      <Slide ref={slideRef} indicators={true} autoplay={false} canSwipe={false}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row h-auto md:h-[600px] w-full bg-gradient-to-r from-[#1a2634] "
          >
            {/* Image section */}
            <div className="w-full md:w-1/2 relative">
              <div className='absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent'>
                <h3 className='font-serif text-sm md:text-base text-white uppercase tracking-wider'>{slide?.category}</h3>
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[300px] md:h-[600px] object-cover"
              />
            </div>
            {/* Content section */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8  text-white">
              <div className="space-y-4 md:space-y-6">
                <div className='flex gap-3 justify-end mb-4'>
                  <SlideButton
                    direction="left"
                    onClick={() => slideRef.current?.goBack()}
                  />
                  <SlideButton
                    direction="right"
                    onClick={() => slideRef.current?.goNext()}
                  />
                </div>
                <h1 className='text-2xl md:text-4xl font-bold text-[#d4af37] leading-tight'>{slide.title}</h1>
                <p className="text-sm md:text-base leading-relaxed">{slide.description}</p>
                <p className="text-sm md:text-base leading-relaxed italic">{slide.subDescription}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] " />
                  <span className="text-sm md:text-base">{slide.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#d4af37]" />
                  <span className="text-sm md:text-base">{slide.hours}</span>
                </div>
                <Button
                  className="mt-4 bg-[#d4af37] text-[#1a2634] border-none hover:bg-[#c4a030] hover:text-[#1a2634] text-sm md:text-base font-semibold px-6 py-3 rounded-full transition-all duration-300"
                >
                  KHÁM PHÁ
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
}


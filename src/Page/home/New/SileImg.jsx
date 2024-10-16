import { useState } from 'react'
import { Button } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const hotels = [
  {
    name: 'The Myst Dong Khoi Hotel',
    image: './img1.webp',
    description: "The starting point of journey to explore the renowned Far East architectural heritage, hiding the cultural beauty in Saigon's soul",
  },
  {
    name: 'Silverland Sil Hotel',
    image: './img1.webp',
    description: 'Experience luxury in the heart of the city',
  },
  {
    name: 'Silverland Min Hotel',
    image: '/placeholder.svg?height=300&width=400',
    description: 'Modern comfort meets traditional charm',
  },
  {
    name: 'Silverland Ben Thanh Hotel',
    image: '/placeholder.svg?height=300&width=400',
    description: 'Your gateway to exploring vibrant Ben Thanh area',
  },
  {
    name: 'Silverland Ben Thanh Hotel1',
    image: '/placeholder.svg?height=300&width=400',
    description: 'Your gateway to exploring vibrant Ben Thanh area',
  },
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotels.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hotels.length) % hotels.length)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative w-full h-screen overflow-hidden">
        {hotels.map((hotel, index) => (
          <div
            key={hotel.name}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${hotel.image})`,
              filter: 'brightness(1.2)',
              zIndex: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 flex justify-center items-center h-full">
          {hotels.map((hotel, index) => {
            let offset = index - currentIndex
            if (offset < 0) offset += hotels.length
            if (offset > 2) offset -= hotels.length

            return (
              <div
                key={hotel.name}
                className={`w-[320px] absolute transition-all duration-700 ease-in-out  ${offset == 0 ? 'bg-white' : ''}  overflow-hidden shadow-lg`}
                style={{
                  transform: `translateX(${offset * 320}px) rotateY(${offset * -15}deg) scale(${
                    offset === 0 ? 1.05 : 0.9
                  })`,
                  boxShadow:
                    offset === 0 ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' : 'none',
                  zIndex: offset === 0 ? 2 : 1,
                }}
              >
                {offset === 0 && (
                  <div className="p-4">
                    <h4 className="text-xl font-bold		 mb-2">{hotel.name}</h4>
                  </div>
                )}
                <div className={`relative overflow-hidden ${offset !== 0 ? 'h-[400px]' : 'h-[250px]'}`}>
                  <img
                    alt={hotel.name}
                    src={hotel.image}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105`}
                  />
                  <div/>
                  {offset !== 0 && (
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center">
                      <h4 className="text-center text-white text-lg font-semibold">{hotel.name}</h4>
                    </div>
                  )}
                </div>
                {offset === 0 && (
                  <div className="p-4">
                    <p className="text-gray-700 text-base mb-4 line-clamp-3">{hotel.description}</p>
                    <button
                      className="w-full h-[40px] bg-orange-200 text-black hover:bg-orange-300"
                    >
                      VIEW MORE
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <Button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 rounded-full p-2"
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 rounded-full p-2"
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  )
}

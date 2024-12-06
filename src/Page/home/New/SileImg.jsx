import { useState } from 'react'
import { Button } from 'antd'
import { ChevronLeft, ChevronRight} from 'lucide-react'
import {useQuery} from "react-query";
import upstashService from "../../../services/upstashService.js";
import {useNavigate} from "react-router-dom";
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate();

  const { data: listDetails } = useQuery(
    'av.listDetails',
    () => upstashService.getallbranches()
  );
  console.log(listDetails)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedHotels?.length)
  }
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedHotels?.length) % displayedHotels?.length)
  }
  const displayedHotels = listDetails?.slice(0, 7);
  return (
    <div className="min-h-screen ">
      <div className="relative w-full h-screen overflow-hidden">
        {displayedHotels?.map((hotel, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${hotel?.photos[0]})`,
              filter: 'brightness(1.2)',
              zIndex: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-30"/>
        <div className="relative z-10 flex justify-center items-center h-full">
          {displayedHotels?.map((hotel, index) => {
            let offset = index - currentIndex
            if (offset < 0) offset += displayedHotels?.length
            if (offset > 2) offset -= displayedHotels?.length
            return (
              <div
                key={index}
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
                    <h4 className="text-xl font-bold	mb-2">{hotel.branchName}</h4>
                  </div>
                )}
                <div className={`relative overflow-hidden ${offset !== 0 ? 'h-[400px]' : 'h-[250px]'}`}>
                  <img
                    src={hotel?.photos[0]}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105`}
                  />
                  <div/>
                  {offset !== 0 && (
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center">
                      <h4 className="text-center text-white text-lg font-semibold">{hotel.branchName}</h4>
                    </div>
                  )}
                </div>
                {offset === 0 && (
                  <div className="p-4">
                    <p className="text-gray-700 text-base mb-4 line-clamp-3">{hotel.address}</p>
                    <button
                      onClick={() => {
                        navigate(`/detailbranches/${hotel.id}`)
                      }}
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
        <motion className="absolute top-4 right-4 z-20">
          <button
            onClick={() => {
              navigate('/fasterdetails')
            }}
            className="group relative overflow-hidden bg-white bg-opacity-20 text-white rounded-full px-6 py-2 transition-all duration-300 hover:bg-opacity-30 hover:shadow-lg"
          >
          <span className="relative z-10 w-full text-center inline-block">
            Xem tất cả
          </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </button>
        </motion>
        <div className="absolute bottom-8 right-8 z-20 flex space-x-4">
          <Button
            onClick={prevSlide}
            className="rounded-full w-14 h-14 bg-white/20 border-1 border-amber-400"
            size="icon"
          >
            <ChevronLeft className="h-8 w-8"/>
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            onClick={nextSlide}
            className="rounded-full w-14 h-14  border-1 border-amber-400 bg-white/20"
            size="icon"
          >
            <ChevronRight className="h-8 w-8"/>
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

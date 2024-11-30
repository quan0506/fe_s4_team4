import { Slide } from 'react-slideshow-image'
import { ArrowRight } from 'lucide-react'
import { Button } from "antd"

export default function SileDiscountCode() {
  const slides = [
    {
      image: "https://ak-d.tripcdn.com/images/0222312000arfqhhl1249_R_960_660_R5_D.jpg",
      title: "SILVERLAND JOLIE",
      subtitle: "EARLY SAVER",
      offer: "FREE AIRPORT PICKUP & BREAKFAST",
      discount: "(SAVE 55%)",
      benefits: [
        "Airport transfers (T&C)",
        "Free Daily Buffet Breakfast",
        "Free Daily Afternoon Tea",
        "Free access to Rooftop Jacuzzi Pool"
      ],
      hotelName: "Silverland Jolie Hotel",
      hotelUrl: "https://silverlandhotels.com/silverland-jolie-hotel"
    },
    // Add more slides here to see the effect
    {
      image: "https://ak-d.tripcdn.com/images/0222312000arfqhhl1249_R_960_660_R5_D.jpg",
      title: "SILVERLAND CENTRAL",
      subtitle: "SUMMER SPECIAL",
      offer: "FREE SPA TREATMENT",
      discount: "(SAVE 40%)",
      benefits: [
        "Welcome drink",
        "Free Daily Spa Treatment",
        "Free Mini Bar",
        "Late check-out until 2 PM"
      ],
      hotelName: "Silverland Central Hotel",
      hotelUrl: "https://silverlandhotels.com/silverland-central-hotel"
    },
  ]

  return (
    <div className="max-w-6xl mx-auto sileDiscountCode overflow-hidden">
      <Slide
        autoplay={true}
        duration={5000}
        transitionDuration={500}
        indicators={true}
        arrows={true}
        slidesToShow={2}
        slidesToScroll={1}
        cssClass="slide-wrapper"
      >
        {slides.map((slide, index) => (
          <div key={index} className="each-slide-effect">
            <div className="relative h-[500px] mr-4">
              <img
                src={slide.image}
                alt={`${slide.title} - ${slide.subtitle}`}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 space-y-2 rounded-b-lg">
                <h2 className="text-xl font-semibold text-gray-800">{slide.title}</h2>
                <h3 className="text-2xl font-bold text-gray-900">{slide.subtitle}</h3>
                <h4 className="text-lg font-semibold">{slide.offer}</h4>
                <p className="text-lg text-orange-500 font-semibold">{slide.discount}</p>
              </div>
            </div>
            <div className="bg-white px-8 py-6 space-y-4 mr-4">
              <div className="space-y-2">
                <h5 className="font-semibold">Benefits:</h5>
                <ul className="space-y-1 list-disc pl-5 text-sm">
                  {slide.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <Button className="bg-primary hover:bg-primary/90  ">
                BOOK NOW
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-xs text-gray-600 space-y-1">
                <p>{slide.hotelName}</p>
                <p>{slide.hotelUrl}</p>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  )
}

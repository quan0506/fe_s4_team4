import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland May Hotel',
    title: 'Silverland May Hotel',
    description: '28 - 30 Thi Sach, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Sakyo Hotel',
    title: 'Silverland Sakyo Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Yen Hotel',
    title: 'Silverland Yen Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Min Hotel',
    title: 'Silverland Min Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Jolie Hotel',
    title: 'Silverland Jolie Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Central Hotel',
    title: 'Silverland Central Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Charner Hotel',
    title: 'Silverland Charner Hotel',
    description: 'Example address',
    rating: 4
  },
  {
    src: 'https://silverlandhotels.com/wp-content/uploads/2023/12/4-7.png',
    alt: 'Silverland Sil Hotel',
    title: 'Silverland Sil Hotel',
    description: 'Example address',
    rating: 4
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleImages, setVisibleImages] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1);
      } else if (window.innerWidth < 768) {
        setVisibleImages(2);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(3);
      } else {
        setVisibleImages(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - visibleImages + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length - visibleImages + 1) % (images.length - visibleImages + 1));
  };

  return (
    <div className="relative w-full mx-auto px-4">
      <div className='text-right mb-2'>
        <button
          onClick={prevSlide}
          className="bg-white bg-opacity-50 p-2 rounded-full z-10 border hover:bg-[#ffddb3]"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6"/>
        </button>
        <button
          onClick={nextSlide}
          className="bg-white bg-opacity-50 p-2 rounded-full z-10 border ml-2 hover:bg-[#ffddb3]"
          disabled={currentIndex === images.length - visibleImages}
        >
          <ChevronRight className="h-6 w-6"/>
        </button>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`}}
        >
          {images.map((image, index) => (
            <div key={index} className={`flex-shrink-0 px-2 mt-5 ${
              visibleImages === 1 ? 'w-full' :
                visibleImages === 2 ? 'w-1/2' :
                  visibleImages === 3 ? 'w-1/3' : 'w-1/4'
            }`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-lg font-bold">{image.title}</h3>
                      <p className="text-sm">{image.description}</p>
                      <div className="flex mt-2">
                        {[...Array(image.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;

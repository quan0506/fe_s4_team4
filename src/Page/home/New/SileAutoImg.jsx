import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";

function SlideAutoImg() {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = [
    { src: "./img1.webp", text: "Premium Design" },
    { src: "./img1.webp", text: "Elegant Style" },
    { src: "./img1.webp", text: "Modern Touch" },
    { src: "./img1.webp", text: "Timeless Beauty" },
    { src: "./img1.webp", text: "Perfect Detail" },
    { src: "./img1.webp", text: "Pure Luxury" },
    { src: "./img1.webp", text: "Classic Appeal" },
    { src: "./img1.webp", text: "Refined Taste" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full overflow-hidden bg-white"
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="marquee-container">
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            play={!isPaused}
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="image-card"
              >
                <div className="image-wrapper">
                  <img
                    src={item.src}
                    alt={`Image ${index + 1}`}
                    className={`image ${isLoaded ? "loaded" : ""}`}
                    loading="lazy"
                    onLoad={() => {
                      const img = new Image();
                      img.src = item.src;
                    }}
                  />
                  <div className="image-overlay">
                    <span className="image-text">{item.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default SlideAutoImg;

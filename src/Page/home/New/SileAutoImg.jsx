import Marquee from "react-fast-marquee";
import { useState  } from "react";
import { useQuery } from "react-query";
import upstashService from "../../../services/upstashService.js";

function SlideAutoImg() {
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: listAllroom } = useQuery(
    "av.listAllroom",
    () => upstashService.getAllRoom()
  );



  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="marquee-container">
          <Marquee gradient={false} speed={40} pauseOnHover={true} play={!isPaused}>
            {listAllroom?.map((room, index) => (
              <div key={index} className="image-card">
                <div className="image-wrapper">
                  <img
                    src={room.photos[1] || "./img1.webp"}
                    alt={`Room ${index + 1}`}
                    className={`image ${isLoaded ? "loaded" : ""}`}
                    loading="lazy"
                    onLoad={() => {
                      const img = new Image();
                      img.src = room.photos[1] || "./img1.webp"; // Ensure the image is preloaded
                    }}
                  />
                  <div className="image-overlay">
                    <span className="image-text">{room.roomType || "Default Text"}</span> {/* Use room.text or fallback */}
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

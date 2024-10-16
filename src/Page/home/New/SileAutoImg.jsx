import Slider from "react-slick";

function SileAutoImg() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        adaptiveHeight: true // Adjust the slider height dynamically based on content
    };

    const images = [
        "https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/32-3-1280x677.png",
        "./img1.webp",
        "./img1.webp",
        "./img1.webp",
        "./img1.webp",
        "./img1.webp"
    ];

    return (
      <div className="slider-container">
          <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className='image-wrapper'>
                    <img src={img} alt={`slide-${index + 1}`} className='img-auto' />
                </div>
              ))}
          </Slider>
      </div>
    );
}

export default SileAutoImg;

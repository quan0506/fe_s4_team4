import {Link, useNavigate, useParams} from "react-router-dom";
import { useQuery } from "react-query";
import upstashService from "../../services/upstashService.js";
import { Slide } from "react-slideshow-image";
import { Button ,Image} from "antd";
import "react-slideshow-image/dist/styles.css";
import FooterComponent from "../../component/Footer.jsx"; // Import CSS của react-slideshow-image

const DetailBranches = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: detailBranches } = useQuery(
    "av.detailBranchesID",
    () => upstashService.getBranchesid(id)
  );
  // Mock images for slideshow
  const slideImages = [
    "https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/28-2.png",
    "https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/28-3.png",
    "https://png.pngtree.com/background/20230527/original/pngtree-living-room-in-city-with-large-windows-picture-image_2757919.jpg",
  ];
  console.log(detailBranches)
  return (
    <div>
      <div className="mb-6">
        <Slide easing="ease" autoplay duration={3000} indicators>
          {detailBranches?.photos?.map((image, index) => (
            <div key={index} className="each-slide">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[300px] md:h-[600px] object-cover"
              />
            </div>
          ))}
        </Slide>
      </div>
      <div className=' w-[800px] m-auto '>
        <div className="flex flex-col md:flex-row h-auto md:h-[600px]  bg-gradient-to-r from-[#1a2634] to-[#2c3e50]">
          {/* Image section */}
          <div className="w-full md:w-1/2 relative">
            <img
              src="https://cdn.silverlandhotels.com/wp-content/uploads/2023/12/28-2.png"
              className="w-full h-[300px] md:h-[600px] object-cover"
            />
          </div>
          {/* Content section */}
          <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8 bg-[#1a2634] text-white">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] leading-tight">
                {detailBranches?.branchName}
              </h1>
              <p className="text-sm md:text-base leading-relaxed italic">
                {detailBranches?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="w-full py-12 bg-white">
          <div className="container mx-auto ">
            <div className="grid lg:grid-cols-2 gap-8 items-start   bg-[rgb(26,38,52)]">
              {/* Text Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#d4af37]">
                    {detailBranches?.address}
                  </h3>
                </div>
                <p className="text-muted-foreground text-white leading-relaxed">
                  The Myst Dong Khoi inhabits tree-lined Ho Huan Nghiep Street, near the gently flowing waters of the
                  Saigon River and steps from famous Dong Khoi Street – the fashionable commercial heart of Saigon
                  since colonial times. You&apos;re free to meander along the riverfront or head to the Opera House,
                  to Notre-Dame Cathedral or to Independence Palace or heed the call of Nguyen Hue Walking Street with
                  all its bars and boutiques.
                </p>
              </div>
              {/* Map */}
              <div className="relative">
                <div className="aspect-[4/3]  overflow-hidden">
                  <iframe
                    width="100%"
                    height="700"
                    src={detailBranches?.location}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <div className="container mx-auto px-4  grid md:grid-cols-2 gap-16">
        {/* Dining Section */}
        <div className="space-y-6 text-center">
          <div className="relative w-full aspect-square rounded-full overflow-hidden mx-auto max-w-lg">
            <Image
              src="http://localhost:5173/img1.webp"
              className="object-cover"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="secondary"
              >
                Cùng khám phá dịch vụ chúng tôi
              </Button>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-serif mb-4">Dịch vụ</h2>
            <p className="text-muted-foreground leading-relaxed">
              Khám phá sâu hơn vào The Myst và khám phá ốc đảo bình yên. Thư giãn bên hồ bơi; trẻ hóa tại KL Spa; hoặc nạp năng lượng cho cơ thể và tinh thần tại trung tâm thể dục.            </p>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="space-y-6 text-center">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mx-auto">
            <Image
              src="http://localhost:5173/img1.webp"
              className="object-cover"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => {
                    navigate(`/allbranchoffice/${detailBranches?.id}`)
                  }}
                  variant="secondary"
                >
                  Cùng khám phá dịch vụ chúng tôi
                </Button>

            </div>
          </div>
          <div className="max-w-md mx-auto">

            <h2 className="text-4xl font-serif mb-4">Các loại phòng</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trải nghiệm sự sang trọng trong từng chi tiết với các loại phòng được thiết kế tinh tế,
              mang đến không gian nghỉ ngơi thoải mái và đầy phong cách.
            </p>
          </div>
        </div>
      </div>
      <FooterComponent/>

    </div>
  );
};

export default DetailBranches;

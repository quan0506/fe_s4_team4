import { Star, MapPin, CarTaxiFront , Utensils , WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "antd";
import {useQuery} from "react-query";
import upstashService from "../../services/upstashService.js";
import HeaderPega from "../../component/HeaderPega.jsx";
import {Link, useNavigate} from "react-router-dom";
import CardWithMotion from "../../component/CardWithMotion.jsx";
const IndexFasterDetails = () => {
  const { data: listhotel } = useQuery(
    'av.listhotel',
    () => upstashService.getallbranches()
  );
  console.log(listhotel)
  const navigate = useNavigate();
  // console.log('listhotel' , listhotel)
  return (
    <div className="min-h-screen bg-[#1c2638] from-navy via-navy-light
    to-navy text-white IndexFasterDetails">
      {/* Hero Section */}
      <HeaderPega
        title='TÊN KHÁCH SẠN'
        backgroundImage='https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
        description='Trải nghiệm sự sang trọng vô song trên khắp Việt Nam'
      />
      {/* Branches Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gradient  text-[#d3b772]">
            Địa điểm uy tín của chúng tôi
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Khám phá bộ sưu tập khách sạn sang trọng của chúng tôi tại các điểm đến được săn đón nhiều nhất ở Việt Nam
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listhotel?.map((branch, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className="glass-card rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20"
            >
              <div className="relative h-72">
                <img
                  src={branch?.photos[0]}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Lớp bóng đen */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  aria-hidden="true"
                ></div>

                {/* Nội dung hiển thị trên ảnh */}
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-serif text-3xl font-bold text-[#d3b772]">
                    {branch?.branchName}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <MapPin className="w-4 h-4 text-[#d3b772]"/>
                      <span className="text-sm text-gray-300 font-bold hover:text-amber-400">
                        {branch?.address}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#d3b772]"/>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6 bg-[#333d4d]">
                <div className='h-[150px] overflow-auto '>
                  <p className="text-gray-300">{branch?.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <CardWithMotion
                    onClick={() => {
                      navigate(`services/${branch?.id}`);
                    }}
                    icon={CarTaxiFront}
                    text="Dịch vụ xe"
                  />
                  <CardWithMotion
                    icon={WandSparkles}
                    text="Spa"
                  />
                  <CardWithMotion
                    icon={Utensils}
                    text="Nhà hàng"
                  />
                </div>
                <Link to={`/detailbranches/${branch?.id}`}>
                  <Button size="large" className="w-full font-semibold butto mt-3">
                    View Rooms
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexFasterDetails;

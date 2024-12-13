import SuccessAnimation from "./SuccessAnimation.jsx";
import BookingDetails from "./BookingDetails.jsx";
import ShareButtons from "./ShareButtons.jsx";
import Suggestions from "./Suggestions.jsx";
import './Thank.css'
import {useQuery} from "react-query";
import upstashService from "../../../../services/upstashService.js";
const Index = ({idbook}) => {
  const { data: listIDbook } = useQuery(
    "av.listIDbook",
    () => upstashService.getIDbook(idbook)
  );
  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-amber-50 rounded-2xl	">
      <div className="max-w-4xl mx-auto text-center mb-12 relative">
        <SuccessAnimation />
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-4 tracking-tight">
          Cảm ơn bạn đã đặt phòng!
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Chúng tôi rất hân hạnh được phục vụ bạn. Chi tiết đặt phòng đã được gửi vào email của bạn.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
        <BookingDetails
          listIDbook={listIDbook}
        />
      </div>

      <ShareButtons />

      <div className="text-center mb-12 relative">
        <h2 className="font-playfair text-2xl text-navy mb-8 inline-block relative">
          Trải nghiệm thêm dịch vụ của chúng tôi
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </h2>
        <Suggestions />
      </div>
    </div>
  );
};

export default Index;

import { Gift, Award } from "lucide-react";

const Suggestions = () => {
  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gold/10">
        <Gift className="w-10 h-10 text-gold mb-6 animate-float" />
        <h3 className="font-playfair text-2xl mb-4 text-navy">Dịch vụ Spa</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thư giãn với liệu trình spa cao cấp của chúng tôi. Giảm 20% cho khách đặt phòng.
        </p>
        <button className="text-gold hover:text-navy transition-colors flex items-center gap-2 group">
          Tìm hiểu thêm
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gold/10">
        <Award className="w-10 h-10 text-gold mb-6 animate-float" />
        <h3 className="font-playfair text-2xl mb-4 text-navy">Nhà hàng 5 sao</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Trải nghiệm ẩm thực đẳng cấp với đầu bếp michelin. Đặt bàn ngay hôm nay.
        </p>
        <button className="text-gold hover:text-navy transition-colors flex items-center gap-2 group">
          Đặt bàn ngay
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default Suggestions;

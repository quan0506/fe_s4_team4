import { Receipt, Hotel } from "lucide-react";

const BookingDetails = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8 max-w-2xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-playfair font-semibold text-navy">Chi tiết đặt phòng</h2>
        <Hotel className="w-6 h-6 text-gold" />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-600">Mã đặt phòng</span>
          <span className="font-semibold bg-gold/10 px-3 py-1 rounded-full">BK12345</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-600">Loại phòng</span>
          <span className="font-semibold text-navy">Deluxe Ocean View</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-600">Ngày nhận phòng</span>
          <span className="font-semibold">15/03/2024</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-600">Ngày trả phòng</span>
          <span className="font-semibold">18/03/2024</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-600">Tổng thanh toán</span>
          <span className="font-semibold text-xl text-gold">15,000,000 VND</span>
        </div>
      </div>

      <button className="mt-8 w-full flex items-center justify-center gap-2 bg-navy hover:bg-opacity-90 text-white py-3 rounded-lg transition-colors group">
        <Receipt className="w-5 h-5 group-hover:rotate-6 transition-transform" />
        Tải hóa đơn PDF
      </button>
    </div>
  );
};

export default BookingDetails;
import {Armchair, Bath, Brush, Building2, Heater, SunDim} from "lucide-react";

const Amenities =() => {
  const amenities = [
    {
      id: 1,
      name: "Màn che ánh sáng",
      icon: SunDim,
    },
    {
      id: 2,
      name: "Ban công riêng",
      icon: Building2,
    },
    {
      id: 3,
      name: "Nước đóng chai",
      icon: Building2,
    },
    {
      id: 4,
      name: "Bồn tắm / vòi sen",
      icon: Bath,
    },
    {
      id: 5,
      name: "Dọn phòng",
      icon: Brush,
    },
    {
      id: 6,
      name: "Khu vực ngồi",
      icon: Armchair,
    },
    {
      id: 7,
      name: "Chăn điện",
      icon: Heater,
    },
    {
      id: 8,
      name: "Đồ dùng nhà tắm miễn phí",
      icon: Heater,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              <amenity.icon className="w-6 h-6 text-hotel-600 text-amber-400"/>
            </div>
            <div>
              <h3 className='text-white'>
                {amenity.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Amenities

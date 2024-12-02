import HeaderPega from "../HeaderPega.jsx";
// import SileSapa from "./SileSapa.jsx";
import Restaurant from "./Restaurant.jsx";

const  IndexServices = () => {
  return (
    <>
      <HeaderPega
        title="Dịch vụ"
        description="Bên cạnh dịch vụ lưu trú tiện nghi và chất lượng,
        Silverland Hospitality còn nâng cao trải nghiệm với các dịch
        vụ Ẩm thực & Đồ uống chuyên nghiệp, đặc sắc, mang đến những
         trải nghiệm độc đáo và riêng biệt cho khách hàng."
        backgroundImage="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
      />
      <div className='bg-[#1c2638]'>
        {/*<SileSapa/>*/}
        <Restaurant/>
      </div>
    </>
  )
}
export default IndexServices;

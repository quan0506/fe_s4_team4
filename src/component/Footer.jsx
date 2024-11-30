import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Globe } from 'lucide-react'

export default function FooterComponent() {
  return (
    <footer className="bg-[rgb(28,38,56)] text-gray-300 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-gray-100 mb-4">Silverland Hospitality</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-orange-400 flex-shrink-0" />
                <p>14-16 Lê Lai, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-orange-400 flex-shrink-0" />
                <p>(+84) 28 3827 2740</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-orange-400 flex-shrink-0" />
                <p>info@silverlandhotels.com</p>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-orange-400 flex-shrink-0" />
                <p>https://silverlandhotels.com</p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-100">Theo dõi ngay</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Youtube, label: "YouTube" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="bg-gray-700 p-2 rounded-full text-orange-400 hover:bg-gray-600 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-2xl text-gray-100 mb-4">Về Chúng tôi</h2>
              <ul className="space-y-2">
                {["Các Khách sạn", "Tin tức", "Liên hệ", "Tuyển dụng"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-100 mb-4">Các Dịch vụ</h2>
              <ul className="space-y-2">
                {["Blog", "Thư viện", "Câu hỏi thường gặp"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-bold text-2xl text-gray-100 mb-4">Khách sạn chính của chúng tôi</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="300"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.305188164342!2d105.83571147503126!3d21.020471280626825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1d06525d01%3A0x99dd5bcf2f9f10dd!2zTcOsIHRy4buZbiBuZ29uIG5o4bqldCBURywgNjggVHJ1bmcgVGnhu4FuLCBLaMOibSBUaGnDqm4!5e0!3m2!1svi!2s!4v1732376928809!5m2!1svi!2s"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 space-x-4">
            <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">Chính sách bảo mật</a>
            <a href="#" className="text-sm hover:text-orange-400 transition-colors duration-300">Điều khoản & Điều kiện</a>
          </div>
          <p className="text-sm text-gray-400">&copy; 2024 Silverland Hospitality. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


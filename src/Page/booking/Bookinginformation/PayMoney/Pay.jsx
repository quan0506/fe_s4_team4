import { useState } from 'react';
import { Wallet, CreditCard } from 'lucide-react';
import toast from "react-hot-toast";

const Pay = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const handleSelect = (method) => {
        setSelectedMethod(method);
        toast("Payment method selected");
    };
    const PaymentCard = ({ method, icon, title }) => (
      <div
        onClick={() => handleSelect(method)}
        className={`relative overflow-hidden rounded-xl p-6 bg-red cursor-pointer transition-all duration-300 hover:animate-card-hover
            ${selectedMethod === method
          ? 'bg-gradient-to-br from-warmOrange to-goldYellow border-2 border-goldYellow shadow-lg'
          : 'bg-white border-2 border-gray-100 hover:border-goldYellow'
        }`}
      >
          <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${selectedMethod === method ? 'bg-white' : 'bg-warmOrange'}`}>
                  {icon}
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          {selectedMethod === method && (
            <div className="absolute top-2 right-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          )}
      </div>
    );
    return (
      <div >
          <div className="w-full max-w-4xl my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PaymentCard
                    method="vnpay"
                    icon={<Wallet className="w-8 h-8 text-blue-600"/>}
                    title="VNPay"
                  />
                  <PaymentCard
                    method="paypal"
                    icon={<CreditCard className="w-8 h-8 text-blue-700" />}
                    title="PayPal"
                  />
                  <PaymentCard
                    method="zalopay"
                    icon={<Wallet className="w-8 h-8 text-blue-500" />}
                    title="OFF Line"
                  />
              </div>
          </div>
      </div>

    );
};

export default Pay;

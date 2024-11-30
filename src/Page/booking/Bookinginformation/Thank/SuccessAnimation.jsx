import { Check } from "lucide-react";

const SuccessAnimation = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-8 transform hover:scale-105 transition-transform">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-gold animate-checkmark" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Check className="w-12 h-12 text-gold animate-checkmark" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-gold/30 animate-pulse" />
      </div>
    </div>
  );
};

export default SuccessAnimation;

import { Share2 } from "lucide-react";

const ShareButtons = () => {
  return (
    <div className="text-center mb-12">
      <h3 className="font-playfair text-xl mb-6 text-navy relative inline-block">
        Chia sẻ trải nghiệm của bạn
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="bg-[#3b5998] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Facebook
        </button>
        <button className="bg-[#1DA1F2] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Twitter
        </button>
        <button className="bg-[#0e76a8] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          LinkedIn
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;

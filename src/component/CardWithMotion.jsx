import { motion } from "framer-motion";

const CardWithMotion = ({ icon: Icon, text, hoverScale = 1.05, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer bg-white/5 border border-white/10 hover:border-orange-200 transition-colors ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-6 h-6 text-amber-400 mb-2" />} {/* Render icon as a component */}
      <span className="text-xs text-center text-gray-300">{text}</span>
    </motion.div>
  );
};

export default CardWithMotion;

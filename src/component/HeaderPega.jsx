import {motion} from "framer-motion";
const HeaderPega = ({ title, description, backgroundImage }) => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <motion.div
        initial={{scale: 1.1}}
        animate={{scale: 1}}
        transition={{duration: 1.5}}
        className="absolute inset-0"
      >
        <img
          src={backgroundImage}
          alt="Luxury Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-navy"/>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 px-4 max-w-4xl">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="space-y-4"
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold  text-[#d3b772]">
              {title}
            </h1>
            <div className="w-40 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto"/>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPega;

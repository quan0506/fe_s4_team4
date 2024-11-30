import { Ban, Bed, Maximize, Users, Wind } from "lucide-react";
import CardWithMotion from "../CardWithMotion.jsx";

const Features = () => {
  const features = [
    { icon: Maximize, text: "Diện tích phòng: 40 m²" },
    { icon: Wind, text: "Hướng phòng: sông và biệt thự" },
    { icon: Bed, text: "Loại giường: 1 giường đôi" },
    { icon: Users, text: "Sức chứa: 2 khách" },
    { icon: Ban, text: "Phòng không hút thuốc" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {features.map((feature, index) => (
        <CardWithMotion
          key={index}
          icon={feature.icon}
          text={feature.text}
        />
      ))}
    </div>
  );
};

export default Features;

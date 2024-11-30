import { ChevronLeft, ChevronRight } from "lucide-react";

export function SlideButton({ direction, onClick }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className="rounded-full p-2 bg-white border border-gray-300 hover:bg-amber-100
                hover:border-transparent transition-all duration-300 ease-in-out transform hover:scale-105"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    >
      <Icon className="h-6 w-6 transition-transform duration-300 ease-in-out text-amber-400"/>
    </button>
  );
}

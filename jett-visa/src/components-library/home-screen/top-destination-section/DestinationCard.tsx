"use client";

import { TopDestinationItem } from "./TopDestinationSection";

interface DestinationCardProps {
  item: TopDestinationItem;
  onClick: (item: TopDestinationItem) => void;
  onVisaBadgeClick?: () => void;
  variant?: "desktop" | "mobile";
}

const DestinationCard = ({ item, onClick, onVisaBadgeClick, variant = "desktop" }: DestinationCardProps) => {
  const isMobile = variant === "mobile";

  const handleVisaBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onVisaBadgeClick) {
      onVisaBadgeClick();
    }
  };

  return (
    <div
      onClick={() => onClick(item)}
      className={
        isMobile
          ? "relative min-w-[160px] h-48 rounded-[20px] overflow-hidden shadow-lg cursor-pointer snap-start flex-shrink-0"
          : "relative h-80 rounded-[20px] overflow-hidden group shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
      }
    >
      <img
        src={item.imageUrl || "https://via.placeholder.com/300"}
        alt={item.name || "Destination"}
        className={
          isMobile
            ? "w-full h-full object-cover"
            : "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      
      {/* Visa Type Badge */}
      <div
        onClick={handleVisaBadgeClick}
        className={
          isMobile
            ? `absolute top-0 left-0
                bg-[#FFFFFF99] backdrop-blur-sm
                border border-white/40
                text-[#3F6B96] text-xs font-medium
                rounded-tl-[20px] rounded-br-[9px]
                pt-[6px] pr-[16px] pb-[6px] pl-[20px]
                gap-[10px]
                opacity-100
                inline-flex items-center whitespace-nowrap
                min-h-[33px]
                cursor-pointer
                hover:bg-white/35
                transition-colors
                `
            : `absolute top-[-3px] left-0
                bg-[#FFFFFF99] backdrop-blur-sm
                border border-white/40
                text-[#3F6B96] text-[10px] font-medium
                rounded-tl-[20px] rounded-br-[9px]
                pt-[6px] pr-[16px] pb-[6px] pl-[20px]
                gap-[10px]
                opacity-100
                inline-flex items-center whitespace-nowrap
                min-h-[33px]
                cursor-pointer
                hover:bg-white/35
                transition-colors
                `
        }
      >
        {item.VisaType || "E-Visa"}
      </div>

      {/* Content */}
      <div className={isMobile ? "absolute bottom-3 left-2 right-2 text-white" : "absolute bottom-4 left-3 right-3 text-white"}>
        <h3 className={isMobile ? "font-bold text-sm mb-1" : "font-bold text-lg mb-1"}>
          {item.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className={isMobile ? "text-[10px] font-medium opacity-90" : "text-xs font-medium opacity-90"}>
            Starts ₹{item.StartingPrice || "N/A"}
          </p>
          <span
            className={
              isMobile
                ? `absolute top-3 right-[-12px]
                    bg-white/25 backdrop-blur-sm
                    border border-white/30
                    text-white text-[10px] font-medium
                    rounded-tl-[20px] rounded-bl-[20px]
                    pt-[6px] pr-[10px] pb-[6px] pl-[14px]
                    inline-flex items-center whitespace-nowrap
                    min-h-[32px]
                    opacity-100`
                : `absolute top-3 right-[-12px]
                    bg-white/25 backdrop-blur-sm
                    border border-white/30
                    text-[#FFFFFF] text-[10px] font-medium
                    rounded-tl-[20px] rounded-bl-[20px]
                    pt-[6px] pr-[10px] pb-[6px] pl-[14px]
                    inline-flex items-center whitespace-nowrap
                    min-h-[32px]
                    opacity-100`
            }
          >
            {item.GetVisaDays} {item.unit || "days"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

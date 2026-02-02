import { DestinationItem } from "./DestinationList";

interface DestinationCardProps {
  item: DestinationItem;
  onClick: (item: DestinationItem) => void;
  variant: "desktop" | "mobile";
}

const DestinationCard = ({
  item,
  onClick,
  variant,
}: DestinationCardProps) => {
  const isDesktop = variant === "desktop";

  return (
    <div
      onClick={() => onClick(item)}
      className={`
        relative overflow-hidden cursor-pointer group
        ${isDesktop
          ? "h-60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          : "min-w-[160px] h-48 rounded-xl shadow-lg snap-start flex-shrink-0"}
      `}
    >
      <img
        src={item.imageUrl || "https://via.placeholder.com/300"}
        alt={item.name || "Destination"}
        className={`
          w-full h-full object-cover
          ${isDesktop ? "transition-transform duration-700 group-hover:scale-110" : ""}
        `}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Visa Type */}
      <div className="absolute top-0 left-0 bg-white/25 backdrop-blur-sm border border-white/40 text-white text-[10px] font-medium rounded-tl-[20px] rounded-br-[9px] px-4 py-1 inline-flex items-center min-h-[33px]">
        {item.VisaType || "E-Visa"}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h3 className={isDesktop ? "font-bold text-lg" : "font-bold text-sm"}>
          {item.name}
        </h3>

        <div className="flex justify-between items-center">
          <p className={isDesktop ? "text-xs" : "text-[10px]"}>
            Starts ₹{item.StartingPrice || "N/A"}
          </p>

          <span className="absolute top-3 right-[-12px] bg-white/25 backdrop-blur-sm border border-white/30 text-white text-[10px] font-medium rounded-tl-[20px] rounded-bl-[20px] px-3 py-1 min-h-[32px] inline-flex items-center">
            {item.GetVisaDays} {item.unit || "days"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DestinationCard;
import React from "react";

type InfoCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
}) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 h-full hover:shadow-lg transition-all duration-300 sm:p-4">
      <div className="flex flex-col items-start gap-4">
        {/* Icon container */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBF2FF] to-[#F8FAFC] flex items-center justify-center shrink-0">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-7 h-7 object-contain"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-[#003B71] font-poppins leading-snug sm:text-base">
            {title}
          </h4>
          <p className="text-sm text-[#4B5563] font-poppins leading-relaxed sm:text-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

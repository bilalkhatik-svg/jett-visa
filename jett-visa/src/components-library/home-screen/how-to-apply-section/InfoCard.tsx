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
    <div className="card bg-base-100 border border-[#DBE9F8] rounded-xl bg-[#FAFAFA] sm:rounded-[25px] p-3 sm:p-4 md:p-5 h-full overflow-hidden">
      <div className="flex items-start gap-3 min-w-0">
        {/* Icon container */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-[#F2F2F8] to-transparent flex items-center justify-center shrink-0 flex-shrink-0">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-6 h-6 sm:w-[31px] sm:h-[31px] object-contain"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
          <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#00366B] font-poppins break-words">
            {title}
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-[#003669] font-poppins leading-relaxed break-words">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

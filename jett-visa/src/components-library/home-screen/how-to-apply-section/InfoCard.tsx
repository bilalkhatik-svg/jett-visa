"use client";

type InfoCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  variant?: "vertical" | "horizontal";
};

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  variant = "vertical",
}) => {
  // Horizontal variant for Why Choose Musafir section
  if (variant === "horizontal") {
    return (
      <div
        className="bg-white border-2 border-[#E5E7EB] rounded-[20px] hover:shadow-lg transition-all duration-300"
        style={{
          padding: '26px',
          width: '544px',
          height: '180px',
          maxWidth: '100%'
        }}
      >
        <div className="flex flex-row items-start h-full" style={{ gap: '20px' }}>
          {/* Icon container */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBF2FF] to-[#F8FAFC] flex items-center justify-center shrink-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-7 h-7 object-contain"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-2 flex-1">
            <h4 className="text-lg font-semibold text-[#003B71] font-poppins leading-snug">
              {title}
            </h4>
            <p
              className="font-poppins font-normal text-[#003669] leading-none align-middle"
              style={{
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default vertical variant
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
        <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
          <h2 className="text-[18px] font-semibold text-[#00366B] font-poppins break-words">
            {title}
          </h2>

          <p className="text-[16px] font-normal text-[#003669] font-poppins leading-relaxed break-words">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

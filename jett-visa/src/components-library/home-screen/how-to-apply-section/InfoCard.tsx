"use client";

type InfoCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  variant?: "vertical" | "horizontal";
  chooseMusafir?: boolean;
};

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  chooseMusafir,
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
        <div className={`flex flex-row h-full ${chooseMusafir ? 'items-center' : 'items-start'}`} style={{ gap: '20px' }}>
          {/* Icon container */}
          <div className="w-[90px] h-[90px] rounded-full  flex items-center justify-center shrink-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-2 flex-1">
          <h4
  className="
    font-poppins font-semibold
    text-[#003B71]
    text-[18px]
    leading-[1]
    tracking-normal
    align-middle
  "
>
              {title}
            </h4>
            <p
  className="
    font-poppins font-normal
    text-[#003669]
    text-[16px]
    leading-[1]
    tracking-normal
    align-middle
  "
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
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-[#003B71] font-poppins leading-snug sm:text-base">
            {title}
          </h4>
          <p 
            className="font-poppins font-normal text-[#003669] leading-none align-middle sm:text-sm"
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
};

export default InfoCard;

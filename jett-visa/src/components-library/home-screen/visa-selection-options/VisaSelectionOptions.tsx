"use client";

import { useState } from "react";
import destinationImage from "@/assets/images/destinationImage.png";
import travelDateImage from "@/assets/images/travelDateImage.png";
import visaModeImage from "@/assets/images/visaModeImage.png";
// import type { ModalTypes } from "@features/home-screen/HomeScreen";
import { useTranslation } from "@/utils/i18nStub";

// Define type locally
export type ModalTypes = "searchDestination" | "visaMode" | "travelDate" | "";

interface VisaModeProps {
  showDestinationModal: (value: boolean, mode: ModalTypes) => void;
}

const VisaMode = ({ showDestinationModal }: VisaModeProps) => {
  const [activeKey, setActiveKey] = useState<string>("destination");
  const { t } = useTranslation();
  const handleButtonClick = (key: string) => {
    switch (key) {
      case "destination":
        showDestinationModal(false, "searchDestination");
        setActiveKey(key);
        break;
      case "visaMode":
        showDestinationModal(false, "visaMode");
        setActiveKey(key);
        break;
      case "travelDate":
        showDestinationModal(false, "travelDate");
        setActiveKey(key);
        break;
    }
  };

  // Convert StaticImageData to string for img src
  const destinationImageSrc = typeof destinationImage === 'string' ? destinationImage : (destinationImage as any)?.src || destinationImage;
  const travelDateImageSrc = typeof travelDateImage === 'string' ? travelDateImage : (travelDateImage as any)?.src || travelDateImage;
  const visaModeImageSrc = typeof visaModeImage === 'string' ? visaModeImage : (visaModeImage as any)?.src || visaModeImage;

  const items = [
    { key: "destination", label: "Destination", img: destinationImageSrc },
    { key: "visaMode", label: "Visa mode", img: visaModeImageSrc },
    { key: "travelDate", label: "Travel date", img: travelDateImageSrc },
  ];

  return (
    <div className="w-full max-w-full flex flex-wrap justify-center gap-6 sm:justify-center sm:gap-5 md:justify-start md:gap-8 lg:gap-4 md:ml-[-0.5%] mt-[2%]">

      {items?.map((item, index) => (
        // <div key={index} className="text-center flex flex-col items-center gap-2">
        //   <button
        //     onClick={() => handleButtonClick(item?.key)}
        //     className={`flex items-center justify-center rounded-[12px] transition-all duration-200 ${
        //       activeKey === item.key 
        //         ? 'bg-[#E8F4F8] shadow-lg' 
        //         : 'bg-[#E8F4F8] hover:bg-[#D0E8F5]'
        //     } w-[72px] h-[72px] sm:w-[72px] sm:h-[72px] md:w-20 md:h-20`}
        //   >
        //     <img src={item.img} alt={item.label} className="block object-contain w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14" />
        //   </button>

        //   <div className={`font-poppins font-medium whitespace-nowrap text-xs sm:text-xs md:text-sm ${
        //     activeKey === item.key ? 'text-[#00366B]' : 'text-[#374151]'
        //   }`}>
        //     {item.label}
        //   </div>
        // </div>
        <div key={index} className="text-center flex flex-col items-center gap-2">
          <button
            onClick={() => handleButtonClick(item?.key)}
            className={`flex items-center justify-center rounded-[12px] transition-all duration-200
      ${activeKey === item.key
                ? 'bg-[#E8F4F8] shadow-lg border-2 border-transparent'
                : 'bg-[#E8F4F8] hover:bg-[#D0E8F5] border-2 border-transparent'
              }
      w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] md:w-20 md:h-20
    `}
          >
            <img
              src={item.img}
              alt={item.label}
              className="block object-contain sm:w-10 sm:h-10 md:w-80 md:h-80"
            />
          </button>

          <div className="font-poppins font-medium whitespace-nowrap text-xs sm:text-xs md:text-sm text-[#00366B]">
            {item.label}
          </div>
        </div>

      ))}
    </div>
  );
};

export default VisaMode;

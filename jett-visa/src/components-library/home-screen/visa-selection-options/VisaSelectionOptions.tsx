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
    { key: "destination", label: t("destination"), img: destinationImageSrc },
    { key: "visaMode", label: t("visa_mode"), img: visaModeImageSrc },
    { key: "travelDate", label: t("travel_date"), img: travelDateImageSrc },
  ];

  return (
    <div className="mt-1 w-full max-w-full flex flex-wrap justify-start gap-8 md:gap-8 lg:gap-4 sm:max-w-[327px] sm:justify-center sm:gap-3">
      {items?.map((item, index) => (
        <div key={index} className="text-center flex flex-col items-center">
          <button
            onClick={() => handleButtonClick(item?.key)}
            className={`flex items-center justify-center rounded-lg transition-all w-20 h-20 md:w-20 md:h-20 sm:w-16 sm:h-16 ${activeKey === item.key ? 'ring-2 ring-blue-500 shadow-md' : 'hover:ring-1 hover:ring-gray-300'}`}
          >
            <img src={item.img} alt={item.label} className="block object-contain w-16 h-16 md:w-16 md:h-16 sm:w-12 sm:h-12" />
          </button>

          <div className="text-base text-[#00366B] mt-1 font-medium whitespace-nowrap md:text-base lg:text-sm sm:text-xs">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default VisaMode;

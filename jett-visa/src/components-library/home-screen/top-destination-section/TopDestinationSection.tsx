"use client";

import { useMemo } from "react";
import { useFetchTopDestinationQuery } from "@/store/visaTopDestinationApi";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "@/utils/i18nStub";
// import type { PendingAction } from "@features/home-screen/HomeScreen";
// import type { TopDestinationItem } from "@/utility/types/top-destination/TopDestinationItem";

// Define types locally
export type PendingAction = {
  type: string;
  url?: string;
  destination?: any;
  [key: string]: any;
};

interface TopDestination {
  VisaType?: string;
  Images?: Array<{ Filename?: string }>;
  Name?: string;
  GetVisaDays?: string | number;
  Order?: number;
  Unit?: string;
  IsoCode2?: string;
  StartingPrice?: string | number;
  Type?: "CITY" | "COUNTRY";
  Status?: string;
  Description?: string;
  ApplyTo?: any[];
}

interface TopDestinationItem {
  VisaType?: string;
  imageUrl: string;
  name?: string;
  GetVisaDays: number;
  order?: number;
  unit?: string;
  currencyCode: string;
  CountryCode?: string;
  StartingPrice?: string | number;
}

// Static test data - will be replaced with API integration later
const staticTopDestinations: TopDestination[] = [
  {
    VisaType: "E-Visa",
    Images: [{ Filename: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop" }],
    Name: "Germany",
    GetVisaDays: "4-5",
    Order: 1,
    Unit: "days",
    IsoCode2: "DE",
    StartingPrice: "6800"
  },
  {
    VisaType: "E-Visa",
    Images: [{ Filename: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" }],
    Name: "France",
    GetVisaDays: "5-7",
    Order: 2,
    Unit: "days",
    IsoCode2: "FR",
    StartingPrice: "7200"
  },
  {
    VisaType: "E-Visa",
    Images: [{ Filename: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop" }],
    Name: "Italy",
    GetVisaDays: "6-8",
    Order: 3,
    Unit: "days",
    IsoCode2: "IT",
    StartingPrice: "7500"
  },
  {
    VisaType: "E-Visa",
    Images: [{ Filename: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop" }],
    Name: "Spain",
    GetVisaDays: "5-7",
    Order: 4,
    Unit: "days",
    IsoCode2: "ES",
    StartingPrice: "7000"
  }
];

interface TopDestinationSectionProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const TopDestinationSection = ({ onPreFlowNavigation }: TopDestinationSectionProps) => {
  const { i18n } = useTranslation();
  const residency = useAppSelector((state) => state.locationSlice.residency);
  
  // Fetch top destinations
  const { data: topDestinationResponse, isLoading: isTopDestinationListPending } = useFetchTopDestinationQuery({
    count: 8,
    language: i18n.language || 'en-US',
  });
  
  const topDestinationList = topDestinationResponse?.Response || staticTopDestinations;

  const mappedDestinations: TopDestinationItem[] = useMemo(() => {
    return (topDestinationList || []).map((dest: TopDestination) => ({
      VisaType: dest.VisaType || "E-Visa",
      imageUrl: dest.Images?.[0]?.Filename || "",
      name: dest.Name || "",
      GetVisaDays: typeof dest.GetVisaDays === 'number' ? dest.GetVisaDays : Number(dest.GetVisaDays) || 0,
      order: dest.Order || 0,
      unit: dest.Unit || "days",
      currencyCode: "",
      CountryCode: dest.IsoCode2 || "",
      StartingPrice: dest.StartingPrice || "0",
    }));
  }, [topDestinationList]);

  const handleCardClick = (item: TopDestinationItem) => {
    // const path = getCountryVisaUrl(residency?.isoCode || "", item.CountryCode || "");
    // Simple path generation for testing
    const path = `/visa/${item.CountryCode || ""}`;

    const action: PendingAction = {
      type: "navigate",
      url: path,
    };

    onPreFlowNavigation(action);
  };

  // Simple TopDestinationList replacement - replace with component when available
  if (isTopDestinationListPending) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-poppins font-semibold text-[#003B71] text-2xl sm:text-xl">Top destinations</h2>
          <button className="text-sm text-[#00366B] font-medium hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-56 bg-gray-200 animate-pulse rounded-2xl sm:h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1120px] mx-auto opacity-100" >
      <div className="flex justify-between items-center mb-6 sm:mb-5">
      <h2
  className="
    font-poppins font-semibold
    text-[#003B71]
    text-[28px]
    leading-[1]
    tracking-normal
    mb-8
  "
>Top destinations</h2>
        <button className="text-sm text-[#00366B] font-medium hover:underline transition-all sm:text-xs">View all</button>
      </div>
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mappedDestinations.map((item, index) => (
          <div
            key={`${item.CountryCode}-${index}`}
            onClick={() => handleCardClick(item)}
            className="relative h-60 rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/300"}
              alt={item.name || "Destination"}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div
  className="
    absolute top-0 left-0
    bg-white/25 backdrop-blur-sm
    border border-white/40
    text-[#3F6B96] text-[10px] font-medium
    rounded-tl-[20px] rounded-br-[9px]
    pt-[6px] pr-[16px] pb-[6px] pl-[20px]
    gap-[10px]
    opacity-100
    inline-flex items-center whitespace-nowrap
    min-h-[33px]
  "
>
              {item.VisaType || "E-Visa"}
            </div>
            <div className="absolute bottom-4 left-3 right-3 text-white">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium opacity-90">
                  Starts ₹{item.StartingPrice || "N/A"}
                </p>
                <span
  className="
    absolute top-3 right-[-12px]
    bg-white/25 backdrop-blur-sm
    border border-white/30
    text-[#FFFFFF] text-[10px] font-medium
    rounded-tl-[20px] rounded-bl-[20px]
    pt-[6px] pr-[10px] pb-[6px] pl-[14px]
    
    inline-flex items-center whitespace-nowrap
    min-h-[32px]
    opacity-100
  "
>
                  {item.GetVisaDays} {item.unit || "days"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Horizontal Scroll */}
      <div className="flex md:hidden overflow-x-auto gap-3 pb-2 snap-x snap-mandatory -mx-5 px-5 scrollbar-hide">
        {mappedDestinations.map((item, index) => (
          <div
            key={`${item.CountryCode}-mobile-${index}`}
            onClick={() => handleCardClick(item)}
            className="relative min-w-[160px] h-48 rounded-xl overflow-hidden shadow-lg cursor-pointer snap-start flex-shrink-0"
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/300"}
              alt={item.name || "Destination"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div
              className="
                absolute top-0 left-0
                bg-white/25 backdrop-blur-sm
                border border-white/40
                text-white text-xs font-medium
                rounded-tl-[20px] rounded-br-[9px]
                pt-[6px] pr-[16px] pb-[6px] pl-[20px]
                gap-[10px]
                opacity-100
                inline-flex items-center whitespace-nowrap
                min-h-[33px]
              "
            >
              {item.VisaType || "E-Visa"}
            </div>
            <div className="absolute bottom-3 left-2 right-2 text-white">
              <h3 className="font-bold text-sm mb-1">{item.name}</h3>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-medium opacity-90">
                  Starts ₹{item.StartingPrice || "N/A"}
                </p>
                <span
                  className="
                    absolute top-3 right-[-12px]
                    bg-white/25 backdrop-blur-sm
                    border border-white/30
                    text-white text-[10px] font-medium
                    rounded-tl-[20px] rounded-bl-[20px]
                    pt-[6px] pr-[10px] pb-[6px] pl-[14px]
                    inline-flex items-center whitespace-nowrap
                    min-h-[32px]
                    opacity-100
                  "
                >
                  {item.GetVisaDays} {item.unit || "days"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDestinationSection;

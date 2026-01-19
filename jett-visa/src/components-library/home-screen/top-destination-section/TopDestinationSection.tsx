import { useMemo } from "react";
import { useFetchTopDestinationQuery } from "@/store/visaTopDestinationApi";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
// import type { PendingAction } from "@pages/home-screen/HomeScreen";
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
      <div className="max-w-[1120px] mx-auto px-6 py-5 bg-white">
        <h3 className="font-poppins font-semibold text-[#00366B] text-2xl md:text-3xl mb-4">Top Destinations</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto px-8 py-5 bg-white md:px-8 md:py-5 sm:px-4 sm:py-4">
      <h3 className="font-poppins font-semibold text-[#00366B] text-3xl mb-4 md:text-3xl md:mb-4 sm:text-xl sm:mb-3">Top Destinations</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4">
        {mappedDestinations.map((item, index) => (
          <div
            key={`${item.CountryCode}-${index}`}
            onClick={() => handleCardClick(item)}
            className="relative h-64 rounded-2xl overflow-hidden group shadow-md cursor-pointer md:h-64 md:rounded-2xl lg:h-56 sm:h-40 sm:rounded-xl"
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/300"}
              alt={item.name || "Destination"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-xs text-white border border-white/30 md:text-xs sm:text-[10px]">
              {item.VisaType || "E-Visa"}
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-bold text-base md:text-base sm:text-sm">{item.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs opacity-80 md:text-xs sm:text-[10px]">
                  Starts ₹{item.StartingPrice || "N/A"}
                </p>
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 md:text-[10px] md:px-2 sm:text-[9px] sm:px-1.5">
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

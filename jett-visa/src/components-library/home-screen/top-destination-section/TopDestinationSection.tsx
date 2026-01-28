"use client";

import { useMemo, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { useIsDesktop } from "@/utils/hooks/useDesktop";
// import type { PendingAction } from "@features/home-screen/HomeScreen";
// import type { TopDestinationItem } from "@/utility/types/top-destination/TopDestinationItem";

// Define types locally
export type PendingAction = {
  type: string;
  url?: string;
  destination?: any;
  [key: string]: any;
};

export interface TopDestinationItem {
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

interface TopDestinationSectionProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
  destinations: TopDestinationItem[];
  isLoading: boolean;
  hideViewAll?: boolean;
  title?: string;
}

const TopDestinationSection = ({
  onPreFlowNavigation,
  destinations,
  isLoading,
  hideViewAll = false,
  title = "Top destinations",
}: TopDestinationSectionProps) => {
  const residency = useAppSelector((state) => state.locationSlice.residency);
  const isDesktop  = useIsDesktop();
  const mappedDestinations: TopDestinationItem[] = useMemo(() => {
    return destinations || [];
  }, [destinations]);

  const handleCardClick = (item?: TopDestinationItem) => {
    if (item?.CountryCode) {
      // Navigate to specific destination visa page
      const residencyIso = (residency as any)?.isoCode || "";
      const path = `/visa?res=${residencyIso}&dest=${item.CountryCode}`;
      
      const action: PendingAction = {
        type: "navigate",
        url: path,
        destination: item,
      };

      onPreFlowNavigation(action);
    } else {
      // Navigate to all destinations page
      const path = "/all-destinations";

      const action: PendingAction = {
        type: "navigate",
        url: path,
      };

      onPreFlowNavigation(action);
    }
  };

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const desktopPageSize = 8;
  const desktopPages = useMemo(() => {
    const pages: TopDestinationItem[][] = [];
    for (let i = 0; i < mappedDestinations.length; i += desktopPageSize) {
      pages.push(mappedDestinations.slice(i, i + desktopPageSize));
    }
    return pages;
  }, [mappedDestinations]);
  const shouldDesktopScroll = desktopPages.length > 1;

  const handleDesktopScroll = (direction: "left" | "right") => {
    const container = desktopScrollRef.current;
    if (!container) {
      return;
    }
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Simple TopDestinationList replacement - replace with component when available
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-poppins font-semibold text-[#003B71] text-2xl sm:text-xl">
            {title}
          </h2>
          {!hideViewAll && (
            <button className="text-sm text-[#00366B] font-medium hover:underline">
              View all
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-56 bg-gray-200 animate-pulse rounded-2xl sm:h-48"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1120px] mx-auto opacity-100">
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
        >
          {title}
        </h2>
        {isDesktop && (
          <button
            className="text-sm text-[#0087FA] font-medium transition-all sm:text-xs font-[16px]"
            onClick={() => handleCardClick()}
          >
            View all
          </button>
        )}
      </div>
      <div className="hidden md:block relative pb-10">
        <div
          ref={desktopScrollRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {desktopPages.map((page, pageIndex) => (
            <div
              key={`desktop-page-${pageIndex}`}
              className="grid grid-cols-4 gap-4 min-w-[1120px] snap-start"
            >
              {page.map((item, index) => (
                <div
                  key={`${item.CountryCode}-${pageIndex}-${index}`}
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
          ))}
        </div>
        {shouldDesktopScroll && (
          <div className="absolute bottom-0 right-0 flex gap-2 z-10">
            <button
              type="button"
              onClick={() => handleDesktopScroll("left")}
              className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
              aria-label="Scroll left"
            >
               <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#00366B]"
                        >
                          <path
                            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                            fill="currentColor"
                          />
                        </svg>
            </button>
            <button
              type="button"
              onClick={() => handleDesktopScroll("right")}
              className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
              aria-label="Scroll right"
            >
              <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#00366B]"
                        >
                          <path
                            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                            fill="currentColor"
                          />
                        </svg>
            </button>
          </div>
        )}
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

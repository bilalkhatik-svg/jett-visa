"use client";

import { useMemo, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { useIsDesktop } from "@/utils/hooks/useDesktop";
import DestinationCard from "./DestinationCard";
import ScrollButtons from "./ScrollButtons";
import SectionHeader from "./SectionHeader";
import LoadingSkeleton from "./LoadingSkeleton";

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
  enableHorizontalScroll?: boolean;
}

const TopDestinationSection = ({
  onPreFlowNavigation,
  destinations,
  isLoading,
  hideViewAll = false,
  title = "Top destinations",
  enableHorizontalScroll = true,
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

  const handleVisaBadgeClick = () => {
    // Navigate to all destinations page when visa badge is clicked
    const path = "/all-destinations";

    const action: PendingAction = {
      type: "navigate",
      url: path,
    };

    onPreFlowNavigation(action);
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

  if (isLoading) {
    return <LoadingSkeleton title={title} showViewAll={!hideViewAll} />;
  }

  // Show "View all" button only when horizontal scroll is enabled and not hidden
  const shouldShowViewAll = enableHorizontalScroll && !hideViewAll;

  return (
    <div className="w-full max-w-[1120px] mx-auto opacity-100">
      <SectionHeader
        title={title}
        showViewAll={shouldShowViewAll}
        onViewAllClick={() => handleCardClick()}
        isDesktop={isDesktop}
      />
      
      {enableHorizontalScroll ? (
        <>
          {/* Desktop Horizontal Scroll */}
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
                <DestinationCard
                  key={`${item.CountryCode}-${pageIndex}-${index}`}
                  item={item}
                  onClick={handleCardClick}
                  onVisaBadgeClick={handleVisaBadgeClick}
                  variant="desktop"
                />
              ))}
                </div>
              ))}
            </div>
            {shouldDesktopScroll && (
              <ScrollButtons
                onScrollLeft={() => handleDesktopScroll("left")}
                onScrollRight={() => handleDesktopScroll("right")}
              />
            )}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="flex md:hidden overflow-x-auto gap-3 pb-2 snap-x snap-mandatory -mx-5 px-5 scrollbar-hide">
            {mappedDestinations.map((item, index) => (
              <DestinationCard
                key={`${item.CountryCode}-mobile-${index}`}
                item={item}
                onClick={handleCardClick}
                onVisaBadgeClick={handleVisaBadgeClick}
                variant="mobile"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop Vertical Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mappedDestinations.map((item, index) => (
              <DestinationCard
                key={`${item.CountryCode}-desktop-${index}`}
                item={item}
                onClick={handleCardClick}
                variant="desktop"
              />
            ))}
          </div>

          {/* Mobile Vertical Grid */}
          <div className="grid grid-cols-2 md:hidden gap-3">
            {mappedDestinations.map((item, index) => (
              <DestinationCard
                key={`${item.CountryCode}-mobile-${index}`}
                item={item}
                onClick={handleCardClick}
                onVisaBadgeClick={handleVisaBadgeClick}
                variant="mobile"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TopDestinationSection;

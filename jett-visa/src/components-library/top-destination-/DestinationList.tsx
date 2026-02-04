"use client";

import { useRef } from "react";
import DestinationCard from "./DestinationCard";
import ScrollButton from "./Button";

export interface DestinationItem {
  CountryCode: string;
  imageUrl: string;
  name: string;
  VisaType?: string;
  StartingPrice?: number;
  GetVisaDays?: number;
  unit?: string;
}

interface DestinationCarouselProps {
  desktopPages: DestinationItem[][];
  mobileItems: DestinationItem[];
  onCardClick: (item: DestinationItem) => void;
  shouldDesktopScroll?: boolean;
}

const DestinationCarousel = ({
  desktopPages,
  mobileItems,
  onCardClick,
  shouldDesktopScroll = false,
}: DestinationCarouselProps) => {
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const handleDesktopScroll = (direction: "left" | "right") => {
    if (!desktopScrollRef.current) return;

    const scrollAmount = 1120;
    desktopScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Desktop */}
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
                  onClick={onCardClick}
                  variant="desktop"
                />
              ))}
            </div>
          ))}
        </div>

        {shouldDesktopScroll && (
          <div className="absolute bottom-0 right-0 flex gap-2 z-10">
            <ScrollButton direction="left" onClick={handleDesktopScroll} />
            <ScrollButton direction="right" onClick={handleDesktopScroll} />
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden overflow-x-auto gap-3 pb-2 snap-x snap-mandatory -mx-5 px-5 scrollbar-hide">
        {mobileItems.map((item, index) => (
          <DestinationCard
            key={`${item.CountryCode}-mobile-${index}`}
            item={item}
            onClick={onCardClick}
            variant="mobile"
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationCarousel;

"use client";

import React from "react";
import { useTopDestination } from "@/utils/hooks/useTopDestination";
// import type { TopDestination } from '@/utility/hooks/useTopDestination';
import { useTranslation } from "@/utils/i18nStub";

interface TopDestination {
  IsoCode2?: string;
  Name?: string;
  Images?: Array<{ Filename?: string }>;
}

interface ScrollingDestinationImagesProps {
  isMobile: boolean;
  isTablet: boolean;
}

// Static test data - will be replaced with API integration later

const ScrollingDestinationImages: React.FC<ScrollingDestinationImagesProps> = ({
  isMobile,
  isTablet,
}) => {
  const { topDestinationList, isTopDestinationListPending } =
    useTopDestination();

  const { i18n } = useTranslation();
  // Safely check RTL - handle SSR case
  const isRTL =
    typeof i18n.dir === "function"
      ? i18n.dir() === "rtl"
      : i18n.language?.startsWith("ar");

  // State to track which column is being hovered
  const [hoveredColumn, setHoveredColumn] = React.useState<number | null>(null);
  // State to track which image is being hovered (for showing country name)
  const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);

  if (
    isMobile ||
    isTablet ||
    isTopDestinationListPending ||
    !topDestinationList ||
    topDestinationList.length === 0
  ) {
    return null;
  }

  const destinationsWithImages = topDestinationList.filter(
    (dest: TopDestination) => dest.Images?.[0]?.Filename,
  );

  const columns: TopDestination[][] = [[], [], []];
  destinationsWithImages.forEach(
    (destination: TopDestination, index: number) => {
      columns[index % 3].push(destination);
    },
  );

  const duplicateItems = (items: TopDestination[]) => [...items, ...items];

  const renderColumn = (columnItems: TopDestination[], columnIndex: number) => {
    const duplicatedItems = duplicateItems(columnItems);
    const isColumnHovered = hoveredColumn === columnIndex;

    return (
      <div
        key={columnIndex}
        className="flex flex-col items-center shrink-0 w-[140px] md:w-[172px]"
        onMouseEnter={() => setHoveredColumn(columnIndex)}
        onMouseLeave={() => setHoveredColumn(null)}
      >
        <div className="overflow-hidden">
          <div
            className={`flex flex-col gap-3 m-2 ${
              isColumnHovered
                ? ""
                : columnIndex % 2 === 0
                  ? "animate-scrollUp"
                  : "animate-scrollDown"
            }`}
          >
            {duplicatedItems.map((destination, itemIndex) => {
              const imageUrl = destination.Images?.[0]?.Filename || "";
              const countryName = destination.Name || "";
              const uniqueKey = `${destination.IsoCode2}-${columnIndex}-${itemIndex}`;
              const isImageHovered = hoveredImage === uniqueKey;

              return (
                <div
                  key={uniqueKey}
                  className="relative w-full h-[172px] md:h-[212px] rounded-[20px] overflow-hidden cursor-pointer border-4 border-white shadow-md hover:scale-[1.03] transition-transform"
                  onMouseEnter={() => setHoveredImage(uniqueKey)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={imageUrl}
                    alt={countryName}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70"
                  />
                  {/* Country name overlay on hover */}
                  {isImageHovered && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity z-10">
                      <span className="text-white text-lg font-semibold text-center px-4 py-2">
                        {countryName}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="
          absolute
          top-[-194px]
          right-[-190px]
          flex
          p-[20px_20px_20px_10px]
          z-[1]
          origin-right
          -rotate-[15deg]
        "
      style={{
        height: "auto",
        zIndex: -1,
        background:"linear-gradient(178deg, rgba(198=, 221, 249, 0.00) 1.87%, #BFE6FD 87.84%)"
        // background:
        //   "linear-gradient(transparent 0%, transparent 85%, rgba(160, 224, 227, 0.3) 100%)",
      }}
    >
      {columns.map((columnItems, columnIndex) =>
        renderColumn(columnItems, columnIndex),
      )}
    </div>
  );
};

export default ScrollingDestinationImages;

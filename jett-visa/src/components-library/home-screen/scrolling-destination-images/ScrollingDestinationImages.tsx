"use client";

import React from 'react';
// import { useTopDestination } from '@/utility/hooks/useTopDestination';
// import type { TopDestination } from '@/utility/hooks/useTopDestination';
import { useTranslation } from '@/utils/i18nStub';

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
const staticTopDestinations: TopDestination[] = [
    {
        IsoCode2: 'DE',
        Name: 'Germany',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'FR',
        Name: 'France',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'IT',
        Name: 'Italy',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'ES',
        Name: 'Spain',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'GB',
        Name: 'United Kingdom',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'JP',
        Name: 'Japan',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'AU',
        Name: 'Australia',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'US',
        Name: 'United States',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop' }]
    },
    {
        IsoCode2: 'CA',
        Name: 'Canada',
        Images: [{ Filename: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=400&fit=crop' }]
    },
];

const ScrollingDestinationImages: React.FC<ScrollingDestinationImagesProps> = ({ isMobile, isTablet }) => {
    // const { topDestinationList, isTopDestinationListPending } = useTopDestination();
    // Using static data for testing - replace with API hook when ready
    const topDestinationList = staticTopDestinations;
    const isTopDestinationListPending = false;

    const { i18n } = useTranslation();
    // Safely check RTL - handle SSR case
    const isRTL = typeof i18n.dir === 'function' ? i18n.dir() === "rtl" : i18n.language?.startsWith('ar');

    if (isMobile || isTablet || isTopDestinationListPending || !topDestinationList || topDestinationList.length === 0) {
        return null;
    }

    const destinationsWithImages = topDestinationList.filter((dest: TopDestination) => dest.Images?.[0]?.Filename);

    const columns: TopDestination[][] = [[], [], []];
    destinationsWithImages.forEach((destination: TopDestination, index: number) => {
        columns[index % 3].push(destination);
    });

    const duplicateItems = (items: TopDestination[]) => [...items, ...items];

    const renderColumn = (columnItems: TopDestination[], columnIndex: number) => {
        const duplicatedItems = duplicateItems(columnItems);
        return (
            <div
                key={columnIndex}
                className="flex flex-col items-center shrink-0 w-[140px] md:w-[172px]"
            >
                <div className="overflow-hidden">
                    <div className={`flex flex-col gap-3 m-2 ${
      columnIndex % 2 === 0 ? 'animate-scrollUp' : 'animate-scrollDown'
    }`}>
                        {duplicatedItems.map((destination, itemIndex) => {
                            const imageUrl = destination.Images?.[0]?.Filename || '';
                            const countryName = destination.Name || '';
                            const uniqueKey = `${destination.IsoCode2}-${columnIndex}-${itemIndex}`;

                            return (
                                <div
                                    key={uniqueKey}

                                    className="relative w-full h-[172px] md:h-[212px] rounded-[20px] overflow-hidden cursor-pointer border-4 border-white shadow-md hover:scale-[1.03] transition-transform ">
                                    <img
                                        src={imageUrl}
                                        alt={countryName}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
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
          top-[-358.39px]
          left-[690px]
          w-full
          flex
          p-[20px_20px_20px_10px]
          z-[1]
          origin-right
          -rotate-[15deg]
        "
            style={{
                height: '738.85px',
                background:
                    'linear-gradient(transparent 0%, transparent 85%, rgba(160, 224, 227, 0.3) 100%)',
            }}
        >
            {columns.map((columnItems, columnIndex) =>
                renderColumn(columnItems, columnIndex)
            )}
        </div>

    );
};

export default ScrollingDestinationImages;


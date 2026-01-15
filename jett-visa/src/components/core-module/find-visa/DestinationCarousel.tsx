'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Types
interface VisaChip {
  type: 'mode' | 'price' | 'processing';
  label: string;
  value: string;
}

interface Destination {
  id: string;
  country: string;
  countryCode: string;
  continent: string;
  image: string;
  chips: VisaChip[];
  active: boolean;
}

interface DestinationCarouselProps {
  destinations: Destination[];
  onCardClick: (destination: Destination) => void;
  onScrollContainerReady?: (node: HTMLDivElement | null) => void;
  isMobile?: boolean;
}

// VisaCard component
interface VisaCardProps {
  destination: Destination;
  onClick: () => void;
  isCenter: boolean;
  showOnlyCountry: boolean;
}

const VisaCard: React.FC<VisaCardProps> = ({ destination, onClick, isCenter, showOnlyCountry }) => {
  const getImageSrc = (img: any) => typeof img === 'string' ? img : (img as any)?.src || img;
  const imageSrc = getImageSrc(destination.image);

  if (showOnlyCountry) {
    return (
      <div
        onClick={onClick}
        className="card bg-base-100 border border-base-300 rounded-lg cursor-pointer hover:shadow-md transition w-[146px] h-[146px] flex items-center justify-center"
      >
        <div className="text-center">
          <span className="text-sm font-medium text-primary">{destination.country}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`card bg-base-100 shadow-xl border border-base-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition ${
        isCenter ? 'scale-105' : ''
      } w-[260px] flex-shrink-0`}
    >
      <figure>
        <Image
          src={imageSrc}
          alt={destination.country}
          width={260}
          height={128}
          className="w-full h-32 object-cover"
        />
      </figure>
      <div className="card-body p-3">
        <h3 className="card-title text-primary font-semibold text-base mb-2">{destination.country}</h3>
        <div className="flex flex-wrap gap-2">
          {destination.chips.map((chip, idx) => (
            <div key={idx} className="badge badge-outline text-xs">
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DestinationCarousel: React.FC<DestinationCarouselProps> = React.memo(
  ({ destinations, onCardClick, onScrollContainerReady, isMobile = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [centerIndex, setCenterIndex] = useState(0);
    const initialScrollDone = useRef(false);

    const handleScroll = useCallback(() => {
      if (!scrollRef.current) return;

      const scrollLeft = scrollRef.current.scrollLeft;
      const containerCenter = scrollLeft + scrollRef.current.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Number.MAX_VALUE;

      Array.from(scrollRef.current.children).forEach((child, index) => {
        const card = child as HTMLElement;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);
    }, []);

    useEffect(() => {
      const el = scrollRef.current;
      if (onScrollContainerReady) {
        onScrollContainerReady(el);
      }

      if (el) el.addEventListener('scroll', handleScroll);

      return () => {
        if (el) el.removeEventListener('scroll', handleScroll);
        if (onScrollContainerReady) {
          onScrollContainerReady(null);
        }
      };
    }, [destinations, handleScroll, onScrollContainerReady]);

    // Center second card on desktop initial load
    useEffect(() => {
      if (isMobile || destinations.length <= 1) {
        setCenterIndex(0);
        return;
      }

      if (initialScrollDone.current || !scrollRef.current) return;

      const scrollToSecondCard = () => {
        const container = scrollRef.current;
        if (!container) return;
        
        const secondCard = container.children[1] as HTMLElement;
        if (!secondCard) return;

        const containerWidth = container.offsetWidth;
        const cardWidth = secondCard.offsetWidth;
        const scrollPosition = secondCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollLeft = scrollPosition;
        setCenterIndex(1);
        initialScrollDone.current = true;
      };

      // Wait for layout, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToSecondCard);
      });
    }, [isMobile, destinations]);

    const carouselClasses = `flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth items-center ${
      isMobile ? '' : 'px-[calc(50%-73px)]'
    } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`;

    if (destinations.length === 1) {
      return (
        <div className="flex justify-center items-center w-full overflow-hidden">
          <VisaCard
            destination={destinations[0]}
            onClick={() => onCardClick(destinations[0])}
            isCenter
            showOnlyCountry={false}
          />
        </div>
      );
    }

    if (destinations.length === 2) {
      return (
        <div
          ref={scrollRef}
          className={carouselClasses}
          style={{
            paddingLeft: 'calc(50% - 73px)',
            paddingRight: 'calc(50% - 73px)',
          }}
        >
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="snap-center flex-shrink-0"
            >
              <VisaCard
                destination={destination}
                onClick={() => onCardClick(destination)}
                isCenter={index === centerIndex}
                showOnlyCountry={index !== centerIndex}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={scrollRef}
        className={carouselClasses}
        style={{
          paddingLeft: 'calc(50% - 73px)',
          paddingRight: 'calc(50% - 73px)',
        }}
      >
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className="snap-center flex-shrink-0"
          >
            <VisaCard
              destination={destination}
              onClick={() => onCardClick(destination)}
              isCenter={index === centerIndex}
              showOnlyCountry={index !== centerIndex}
            />
          </div>
        ))}
      </div>
    );
  }
);

DestinationCarousel.displayName = 'DestinationCarousel';
export default DestinationCarousel;

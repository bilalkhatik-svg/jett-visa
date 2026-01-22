'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Mobile-only styles for center card
const mobileCenterCardStyles = `
  @media (max-width: 768px) {
    .mobile-center-card {
      width: 146px !important;
      height: 212px !important;
      position: relative !important;
      border-radius: 20px !important;
      background: linear-gradient(180deg, rgba(162, 38, 247, 0.12) 0%, rgba(74, 129, 253, 0.18) 100%) !important;
      mix-blend-mode: soft-light !important;
      right: auto !important;
      top: auto !important;
    }
  }
`;

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
        className="flex relative w-[230px] h-[230px] max-md:w-[128px] max-md:h-[128px] max-md:aspect-square flex-col items-start gap-[10px] shrink-0 rounded-[20px] border-[4px] border-[#F2F2F8] cursor-pointer hover:shadow-md transition overflow-hidden bg-cover bg-center bg-no-repeat bg-gray-300"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        {/* <div className="p-[10px]"> */}
        <h3 className="text-white absolute bottom-0 left-0 right-0 p-3 text-center font-poppins text-[20px] max-md:text-[16px] font-medium leading-normal mb-[6px]">
          {destination.country}
        </h3>
        {/* <div className="flex flex-wrap gap-[6px]">
            {destination.chips.map((chip, idx) => (
              <span
                key={idx}
                className="text-[12px] px-[8px] py-[2px] rounded-full border border-[#F2F2F8] bg-white/90"
              >
                {chip.label}
              </span>
            ))}
          </div> */}
        {/* </div> */}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`card bg-base-100 shadow-xl border border-base-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition flex-shrink-0 ${isCenter
        ? 'w-[255px] h-[371px] absolute right-0 top-[-0.5px] max-md:w-[146px] max-md:h-[212px] max-md:relative max-md:right-auto max-md:top-auto max-md:rounded-[20px] mobile-center-card'
        : 'w-[260px] max-md:w-[180px]'
        } relative`}
    >
      {isCenter ? (
        <>
          {/* <figure className="absolute inset-0 rounded-[20px] overflow-hidden">
            <img
              src={imageSrc}
              alt={destination.country}
              className="w-full h-full object-cover rounded-[20px]"
            /> */}
          <figure className="absolute inset-0 rounded-[20px] overflow-hidden border-[4px] border-[#F2F2F8]">
            <img
              src={imageSrc}
              alt={destination.country}
              className="w-full h-full object-cover rounded-[16px]"
            />


            <div
              className="absolute inset-0 max-md:hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 48.78%)',
                backdropFilter: 'blur(4px)',
              }}
            />
          </figure>
          {destination.chips.find(chip => chip.type === 'mode') && (
            <div className="flex py-1.5 px-3.5 max-md:py-1 max-md:px-2.5 justify-center items-center gap-[10px] absolute left-1/2 -translate-x-1/2 top-0 rounded-b-[10px] bg-white/60">
              <span className="text-[#3F6B96] font-poppins text-[14px] max-md:text-[12px] font-normal leading-normal">
                {destination.chips.find(chip => chip.type === 'mode')?.label}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3 max-md:p-2 flex flex-col items-center">
            <h4 className="text-[#FFF] text-center font-poppins text-[20px] max-md:text-[16px] font-medium leading-normal">{destination.country}</h4>
            {destination.chips.filter(chip => chip.type !== 'mode').length > 0 && (
              <div className="flex justify-center items-center gap-[10px] mt-[14px] py-[6px] px-[14px] rounded-[20px] bg-[rgba(255,255,255,0.30)]">
                {destination.chips.filter(chip => chip.type !== 'mode').map((chip, idx) => (
                  <span key={idx} className="text-white text-center font-poppins text-[12px] font-normal leading-normal">
                    In {chip.label} days
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <figure className="relative">
            <img
              src={imageSrc}
              alt={destination.country}
              className="w-full h-32 object-cover"
            />
          </figure>
          <div className="card-body p-3">
            <h3 className="card-title text-primary font-semibold text-base mb-2">{destination.country}</h3>
            <div className="flex flex-wrap gap-2">
              {destination.chips.map((chip, idx) => (
                <div key={idx} className="badge badge-outline text-xs text-white text-center font-poppins text-[12px] font-normal leading-normal">
                  In {chip.label} days
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DestinationCarousel: React.FC<DestinationCarouselProps> = React.memo(
  ({ destinations, onCardClick, onScrollContainerReady, isMobile = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [centerIndex, setCenterIndex] = useState(0);
    const initialScrollDone = useRef(false);

    // Inject mobile styles
    useEffect(() => {
      const styleId = 'mobile-center-card-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = mobileCenterCardStyles;
        document.head.appendChild(style);
      }
      return () => {
        const style = document.getElementById(styleId);
        if (style) {
          document.head.removeChild(style);
        }
      };
    }, []);

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

      // Only update if index actually changed to prevent unnecessary re-renders
      setCenterIndex(prevIndex => {
        if (prevIndex !== closestIndex) {
          return closestIndex;
        }
        return prevIndex;
      });
    }, []);

    useEffect(() => {
      const el = scrollRef.current;
      if (onScrollContainerReady) {
        onScrollContainerReady(el);
      }

      if (el) {
        el.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (el) {
          el.removeEventListener('scroll', handleScroll);
        }
        if (onScrollContainerReady) {
          onScrollContainerReady(null);
        }
      };
    }, [destinations, handleScroll, onScrollContainerReady]);

    // Center second card on desktop initial load
    useEffect(() => {
      if (isMobile || destinations.length <= 1) {
        setCenterIndex(0);
        initialScrollDone.current = true;
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

    const carouselClasses = `flex gap-2 max-md:gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`;

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
          className={`${carouselClasses} ${!isMobile ? 'pl-[calc(50%-73px)] pr-[calc(50%-73px)]' : 'max-md:px-4'}`}
        >
          {destinations.map((destination, index) => (
            <div
              key={`${destination.id}-${index}`}
              className={`snap-center flex-shrink-0 ${isMobile ? 'max-md:min-w-0' : ''}`}
            >
              <VisaCard
                destination={destination}
                onClick={() => onCardClick(destination)}
                isCenter={isMobile ? index === 0 : index === centerIndex}
                showOnlyCountry={isMobile ? index !== 0 : index !== centerIndex}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={scrollRef}
        className={`${carouselClasses} ${!isMobile ? 'pl-[calc(50%-73px)] pr-[calc(50%-73px)]' : 'max-md:px-4'}`}
      >
        {destinations.map((destination, index) => (
          <div
            key={`${destination.id}-${index}`}
            className={`snap-center flex-shrink-0 ${isMobile ? 'max-md:min-w-0' : ''}`}
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

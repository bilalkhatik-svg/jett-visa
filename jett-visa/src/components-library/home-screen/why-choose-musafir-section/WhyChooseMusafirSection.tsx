"use client";

import React from 'react';
import InfoCard from '../how-to-apply-section/InfoCard';
import { useFetchStaticContentQuery, type UniqueValueProposition } from '@/store/visaStaticContentApi';
import ClickIcon from "@/assets/images/icons/clickIcon.png";
import StarShieldIcon from "@/assets/images/icons/starShieldIcon.png";
import PhoneIcon from "@/assets/images/icons/phoneIcon.png";
import HistoryIcon from "@/assets/images/icons/historyIcon.png";
import { useTranslation } from '@/utils/i18nStub';
import { useIsDesktop } from '@/utils/hooks/useDesktop';
const getSrc = (img: any) => (typeof img === "string" ? img : (img?.src ?? ""));
const iconMap: Record<string, string> = {
  "icon-visa-discovery.webp": getSrc(ClickIcon),
  "icon-quick-trusted.webp": getSrc(StarShieldIcon),
  "icon-online-guided.webp": getSrc(PhoneIcon),
  "icon-transparent-pricing.webp": getSrc(HistoryIcon),
};

const WhyChooseMusafirSection = React.memo(() => {
   const { t, i18n } = useTranslation();
 const isDesktop = useIsDesktop();
   const { data, isLoading } = useFetchStaticContentQuery({
     language: i18n.language || "en-US",
   });
 
   const apiContent = data?.response?.[0];
   console.log("uniqueValuePropositions apiContent", apiContent);
   const uniqueValuePropositions = apiContent?.uniqueValuePropositions ?? [];
   console.log("uniqueValuePropositions", uniqueValuePropositions);
 
   if (isLoading || !uniqueValuePropositions.length) return null;
 
   const cards = uniqueValuePropositions.map(
     (step: UniqueValueProposition, index: number) => ({
       ...step,
       imageSrc: iconMap[step.icon] || getSrc(step.icon),
       imageAlt: step.title || "Musafir Advantage",
       key: `${step.title}-${index}`,
     }),
   );

  return (
    <section className="w-full max-w-[1120px] mx-auto opacity-100" >
      <h2
  className="
    font-poppins font-semibold
    text-[#003B71]
    text-[28px]
    leading-[1]
    tracking-normal
    mb-8
  "
>{"Why choose musafir?"}</h2>

      {/* Desktop: Horizontal cards in 2 columns */}
      <div className="hidden md:grid md:grid-cols-2" style={{ gap: '20px' }}>
        {cards.map((item: typeof cards[0], index: number) => (
          <InfoCard
            key={item.imageAlt + index}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            description={item.description}
            chooseMusafir={true}
            variant="horizontal"
          />
        ))}
      </div>

      {/* Mobile: Vertical cards */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {cards.map((item: typeof cards[0], index: number) => (
          <div key={item.imageAlt + index} className="h-full">
            <InfoCard
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
              variant="vertical"
            />
          </div>
        ))}
      </div>
    </section>
  );
});

export default WhyChooseMusafirSection;

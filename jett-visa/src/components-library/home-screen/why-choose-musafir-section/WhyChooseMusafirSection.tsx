"use client";

import React from 'react';
import InfoCard from '../how-to-apply-section/InfoCard';
import { useFetchStaticContentQuery, type UniqueValueProposition } from '@/store/visaStaticContentApi';
import ClickIcon from "@/assets/images/icons/clickIcon.png";
import StarShieldIcon from "@/assets/images/icons/starShieldIcon.png";
import PhoneIcon from "@/assets/images/icons/phoneIcon.png";
import HistoryIcon from "@/assets/images/icons/historyIcon.png";
import { useTranslation } from '@/utils/i18nStub';

// Static fallback data
const staticUniqueValuePropositions: UniqueValueProposition[] = [
  {
    icon: "icon-visa-discovery.png",
    title: "Easy Visa Discovery",
    description: "Find the right visa for your destination quickly and easily with our intuitive search."
  },
  {
    icon: "icon-quick-trusted.png",
    title: "Quick & Trusted",
    description: "Fast processing times with trusted service backed by years of experience."
  },
  {
    icon: "icon-online-guided.png",
    title: "Online Guided Process",
    description: "Step-by-step guidance throughout your visa application journey."
  },
  {
    icon: "icon-transparent-pricing.png",
    title: "Transparent Pricing",
    description: "No hidden fees. Clear pricing with all costs upfront."
  },
  {
    icon: "icon-encryption.png",
    title: "Secure & Encrypted",
    description: "Your personal information is protected with bank-level encryption."
  }
];

const WhyChooseMusafirSection = React.memo(() => {
  const { t, i18n } = useTranslation();
  
  // Fetch static content from API
  const { data: staticContentResponse, isLoading } = useFetchStaticContentQuery({
    language: i18n.language || 'en-US',
  });
  
  // Use API data if available, otherwise fall back to static data
  const apiContent = staticContentResponse?.response?.[0];
  const uniqueValuePropositions = apiContent?.uniqueValuePropositions || staticUniqueValuePropositions;

  // Convert StaticImageData to string for iconMap
  const clickIconSrc = typeof ClickIcon === 'string' ? ClickIcon : (ClickIcon as any)?.src || ClickIcon;
  const starShieldIconSrc = typeof StarShieldIcon === 'string' ? StarShieldIcon : (StarShieldIcon as any)?.src || StarShieldIcon;
  const phoneIconSrc = typeof PhoneIcon === 'string' ? PhoneIcon : (PhoneIcon as any)?.src || PhoneIcon;
  const historyIconSrc = typeof HistoryIcon === 'string' ? HistoryIcon : (HistoryIcon as any)?.src || HistoryIcon;

  const iconMap: Record<string, string> = {
    "icon-visa-discovery.png": clickIconSrc,
    "icon-quick-trusted.png": starShieldIconSrc,
    "icon-online-guided.png": phoneIconSrc,
    "icon-transparent-pricing.png": historyIconSrc,
    "icon-encryption.png": historyIconSrc,
  };

  const stepsWithIcons = uniqueValuePropositions.map((step: UniqueValueProposition) => ({
    ...step,
    imageSrc: iconMap[step.icon] || clickIconSrc,
    imageAlt: step.title || "Musafir Advantage",
  }));

  return (
    <section className="w-full max-w-[1120px] mx-auto opacity-100" >
      <h2 className="font-poppins font-semibold text-[#003B71] text-2xl mb-8 sm:text-xl sm:mb-6">{t('why_choose_musafir')}</h2>

      {/* Desktop: Horizontal cards in 2 columns */}
      <div className="hidden md:grid md:grid-cols-2" style={{ gap: '20px' }}>
        {stepsWithIcons.map((item: typeof stepsWithIcons[0], index: number) => (
          <InfoCard
            key={item.imageAlt + index}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            description={item.description}
            variant="horizontal"
          />
        ))}
      </div>

      {/* Mobile: Vertical cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {stepsWithIcons.map((item: typeof stepsWithIcons[0], index: number) => (
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

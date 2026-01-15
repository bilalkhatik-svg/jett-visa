import React from 'react';
import InfoCard from '../how-to-apply-section/InfoCard';
// import { useVisaStaticContent } from '@utility/hooks/useVisaStaticContent';
import ClickIcon from "@/assets/images/icons/clickIcon.png";
import StarShieldIcon from "@/assets/images/icons/starShieldIcon.png";
import PhoneIcon from "@/assets/images/icons/phoneIcon.png";
import HistoryIcon from "@/assets/images/icons/historyIcon.png";
import { useTranslation } from 'react-i18next';

// Define type locally
interface UniqueValueProposition {
  icon: string;
  title: string;
  description: string;
}

// Static test data - will be replaced with API integration later
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
  const { t } = useTranslation();
  // const { uniqueValuePropositions } = useVisaStaticContent();
  // Using static data for testing - replace with API hook when ready
  const uniqueValuePropositions = staticUniqueValuePropositions;

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
    <section className="max-w-[1120px] mx-auto px-8 py-5 bg-white md:px-8 md:py-5 sm:px-4 sm:py-4">
      <h3 className="font-poppins font-semibold text-[#00366B] text-3xl mb-4 md:text-3xl md:mb-4 sm:text-xl sm:mb-3">{t('why_choose_musafir')}</h3>

<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-6 md:grid-cols-3 md:gap-6 lg:grid-cols-3 sm:grid-cols-1 sm:gap-3">
=======
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
        {stepsWithIcons.map((item: typeof stepsWithIcons[0], index: number) => (
          <div key={item.imageAlt + index} className="min-w-0 w-full">
            <InfoCard
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

export default WhyChooseMusafirSection;

"use client";

// import React from "react";
// import InfoCard from "./InfoCard";
// import FavoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
// import BookMarkIcon from "@/assets/images/icons/bookmark.png";
// import PencilIcon from "@/assets/images/icons/pencil.png";
// import OptionDoneIcon from "@/assets/images/icons/option-done.png";
// import { useTranslation } from "@/utils/i18nStub";

// interface HowToApplyStep {
//   step: string;
//   icon: string;
//   title: string;
//   description: string;
// }

// const HowToApplySection = React.memo(() => {
//   const { t } = useTranslation();

//   const howToApplySteps: HowToApplyStep[] = [
//     {
//       step: "1",
//       icon: "favorite-location.png",
//       title: t("choose_destination") || "Choose Destination",
//       description:
//         t("select_your_desired_country") ||
//         "Select your desired country and visa type.",
//     },
//     {
//       step: "2",
//       icon: "bookmark.png",
//       title: t("upload_documents") || "Upload Documents",
//       description:
//         t("securely_upload_documents") ||
//         "Securely upload all required documents online.",
//     },
//     {
//       step: "3",
//       icon: "pencil.png",
//       title: t("review_apply") || "Review & Apply",
//       description:
//         t("experts_review_application") ||
//         "Our experts review your application before submission.",
//     },
//     {
//       step: "4",
//       icon: "option-done.png",
//       title: t("get_visa") || "Get Visa",
//       description:
//         t("receive_visa_prepare") ||
//         "Receive your visa and prepare for your trip.",
//     },
//   ];

//   // normalize icon src (Next.js StaticImageData safe)
//   const getSrc = (img: any) => (typeof img === "string" ? img : img?.src);

//   const iconMap: Record<string, string> = {
//     "favorite-location.png": getSrc(FavoriteLocationIcon),
//     "bookmark.png": getSrc(BookMarkIcon),
//     "pencil.png": getSrc(PencilIcon),
//     "option-done.png": getSrc(OptionDoneIcon),
//   };

//   const stepsWithIcons = howToApplySteps.map((step) => ({
//     ...step,
//     icon: iconMap[step.icon] || getSrc(FavoriteLocationIcon),
//   }));

//   return (
//     <section className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       {/* Heading */}
//       <h3 className="font-poppins font-semibold text-primary text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 lg:mb-6">
//         {t("how_to_apply")}
//       </h3>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//         {stepsWithIcons.map((step, index) => (
//           <div key={`${step.step}-${index}`} className="h-full">
//             <InfoCard
//               imageSrc={step.icon}
//               imageAlt={step.title}
//               title={step.title}
//               description={step.description}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// });

// export default HowToApplySection;
import React from 'react';
import InfoCard from '../howToApplySection/InfoCard';
import { useFetchStaticContentQuery } from '@/store/visaStaticContentApi';
import ClickIcon from "@/assets/images/icons/clickIcon.png";
import StarShieldIcon from "@/assets/images/icons/starShieldIcon.png";
import PhoneIcon from "@/assets/images/icons/phoneIcon.png";
import HistoryIcon from "@/assets/images/icons/historyIcon.png";
import { useTranslation } from '@/utils/i18nStub';

// Define type locally
interface UniqueValueProposition {
  icon: string;
  title: string;
  description: string;
}

// Static test data - will be replaced with API integration later
const staticUniqueValuePropositions: UniqueValueProposition[] = [
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
      
];

const HowToApplySection = React.memo(() => {
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
    <section className="max-w-[1120px] mx-auto px-8 py-5  md:px-8 md:py-5 sm:px-4 sm:py-4">
      <h3 className="font-poppins font-semibold text-[#00366B] text-3xl mb-4 md:text-3xl md:mb-4 sm:text-xl sm:mb-3">{t('how_to_apply')}</h3>

      <div className="grid grid-cols-3 gap-6 md:grid-cols-3 md:gap-6bg-white lg:grid-cols-3 sm:grid-cols-1 sm:gap-3">
        {stepsWithIcons.map((item: typeof stepsWithIcons[0], index: number) => (
          <div key={item.imageAlt + index}>
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

export default HowToApplySection;

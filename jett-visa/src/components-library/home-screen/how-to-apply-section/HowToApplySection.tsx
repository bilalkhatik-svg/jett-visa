// import React from "react";
// import InfoCard from "./InfoCard";
// import FavoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
// import BookMarkIcon from "@/assets/images/icons/bookmark.png";
// import PencilIcon from "@/assets/images/icons/pencil.png";
// import OptionDoneIcon from "@/assets/images/icons/option-done.png";
// import { useTranslation } from "react-i18next";

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
import InfoCard from '../how-to-apply-section/InfoCard';
import { useFetchStaticContentQuery, type HowToApplyStep } from '@/store/visaStaticContentApi';
import FavoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
import BookMarkIcon from "@/assets/images/icons/bookmark.png";
import PencilIcon from "@/assets/images/icons/pencil.png";
import OptionDoneIcon from "@/assets/images/icons/option-done.png";
import { useTranslation } from 'react-i18next';

// Static fallback data
const staticHowToApplySteps: HowToApplyStep[] = [
  {
    step: 1,
    icon: "favorite-location.png",
    title: "Choose Destination",
    description: "Select your desired country and visa type."
  },
  {
    step: 2,
    icon: "bookmark.png",
    title: "Upload Documents",
    description: "Securely upload all required documents online."
  },
  {
    step: 3,
    icon: "pencil.png",
    title: "Review & Apply",
    description: "Our experts review your application before submission."
  },
  {
    step: 4,
    icon: "option-done.png",
    title: "Get Visa",
    description: "Receive your visa and prepare for your trip."
  }
];

const HowToApplySection = React.memo(() => {
  const { t, i18n } = useTranslation();
  
  // Fetch static content from API
  const { data: staticContentResponse, isLoading } = useFetchStaticContentQuery({
    language: i18n.language || 'en-US',
  });
  
  // Use API data if available, otherwise fall back to static data
  const apiContent = staticContentResponse?.response?.[0];
  const howToApplySteps = apiContent?.howToApply || staticHowToApplySteps;

  // Convert StaticImageData to string for iconMap
  const getSrc = (img: any) => typeof img === 'string' ? img : img?.src || img;
  
  const favoriteLocationIconSrc = getSrc(FavoriteLocationIcon);
  const bookMarkIconSrc = getSrc(BookMarkIcon);
  const pencilIconSrc = getSrc(PencilIcon);
  const optionDoneIconSrc = getSrc(OptionDoneIcon);

  const iconMap: Record<string, string> = {
    "favorite-location.png": favoriteLocationIconSrc,
    "bookmark.png": bookMarkIconSrc,
    "pencil.png": pencilIconSrc,
    "option-done.png": optionDoneIconSrc,
  };

  const stepsWithIcons = howToApplySteps.map((step: HowToApplyStep) => ({
    ...step,
    imageSrc: iconMap[step.icon] || favoriteLocationIconSrc,
    imageAlt: step.title || "How to Apply Step",
  }));

  return (
    <section className="w-full max-w-[1120px] mx-auto opacity-100" style={{minHeight:'324px'}}>
      <h2 className="font-poppins font-semibold text-[#003B71] text-2xl mb-8 sm:text-xl sm:mb-6">{t('how_to_apply')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-y-8">
  {stepsWithIcons.map((item, index) => (
    <div key={index} className="w-[256px] h-[240px]">
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

"use client";

import React from "react";
import InfoCard from "../how-to-apply-section/InfoCard";
import { useFetchStaticContentQuery } from "@/store/visaStaticContentApi";
import { useTranslation } from "@/utils/i18nStub";

import PencilIcon from "@/assets/images/icons/pencil.png";
import OptionDoneIcon from "@/assets/images/icons/option-done.png";
import FavoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
import BookMarkIcon from "@/assets/images/icons/bookmark.png";

const getSrc = (img: any) =>
  typeof img === "string" ? img : img?.src ?? "";

const iconMap: Record<string, string> = {
  "step1.webp": getSrc(FavoriteLocationIcon),
  "step2.webp": getSrc(BookMarkIcon),
  "step3.webp": getSrc(PencilIcon),
  "step4.webp": getSrc(OptionDoneIcon),
};

interface UniqueValueProposition {
  icon: string;
  title: string;
  description: string;
}

const HowToApplySection = React.memo(() => {
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useFetchStaticContentQuery({
    language: i18n.language || "en-US",
  });

  const apiContent = data?.response?.[0];
  console.log("uniqueValuePropositions apiContent", apiContent);
  const uniqueValuePropositions = apiContent?.howToApply ?? [];
  console.log("uniqueValuePropositions", uniqueValuePropositions);

  if (isLoading || !uniqueValuePropositions.length) return null;

   const cards = uniqueValuePropositions.map((step: UniqueValueProposition, index: number) => ({
    ...step,
    imageSrc: iconMap[step.icon] || getSrc(step.icon),
    imageAlt: step.title || "Musafir Advantage",
    key: `${step.title}-${index}`,
  }));

  // const cards = uniqueValuePropositions.map((item, index) => ({
  //   imageSrc: iconMap[item.icon] || getSrc(item.icon),
  //   imageAlt: item.title,
  //   title: item.title,
  //   description: item.description,
  //   key: `${item.title}-${index}`,
  // }));
console.log("uniqueValuePropositions cards", cards);
  return (
    <section className="max-w-[1120px] mx-auto px-8 py-5 sm:px-4">
      <h3 className="font-poppins font-semibold text-[#00366B] text-3xl mb-4 sm:text-xl">
       {/* how to apply need to add i-18n transition */}
       how to apply
      </h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <InfoCard
            key={card.key}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
});

export default HowToApplySection;

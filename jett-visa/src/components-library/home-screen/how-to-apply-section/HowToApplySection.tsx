"use client";

import React from "react";
import InfoCard from "../how-to-apply-section/InfoCard";
import { useFetchStaticContentQuery } from "@/store/visaStaticContentApi";
import { useTranslation } from "@/utils/i18nStub";

import PencilIcon from "@/assets/images/icons/pencil.png";
import OptionDoneIcon from "@/assets/images/icons/option-done.png";
import FavoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
import BookMarkIcon from "@/assets/images/icons/bookmark.png";
import { useIsDesktop } from "@/utils/hooks/useDesktop";

const getSrc = (img: any) => (typeof img === "string" ? img : (img?.src ?? ""));

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
const isDesktop = useIsDesktop();
  const { data, isLoading } = useFetchStaticContentQuery({
    language: i18n.language || "en-US",
  });

  const apiContent = data?.response?.[0];
  const uniqueValuePropositions = apiContent?.howToApply ?? [];

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
    <section
      className="w-full max-w-[1120px] mx-auto opacity-100"
      style={{ minHeight: "324px" }}
    >
      <h2 className="font-poppins font-semibold text-[#003B71] text-2xl mb-4 sm:text-xl sm:mb-6">
        {/* {t("how_to_apply")} */}
        How to apply
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-y-8 place-items-center md:place-items-stretch">
    {cards.map((item, index) => (
      <div key={index} className={`h-full flex ${isDesktop ? 'w-[240px]' : 'w-full'} justify-center`}>
        <InfoCard
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          title={item.title}
          description={item.description}
          // variant={isDesktop ? "horizontal" : "vertical"}

        />
      </div>
    ))}
  </div>
    </section>
  );
});

export default HowToApplySection;

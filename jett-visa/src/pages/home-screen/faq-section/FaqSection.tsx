import React, { useState } from "react";
import DownArrowIcon from "@/assets/images/icons/downArrowIcon.png";
import { useTranslation } from "react-i18next";
import { useFetchStaticContentQuery } from "@/store/visaStaticContentApi";

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { t, i18n } = useTranslation();

  // Fetch static content from API
  const { data: staticContentResponse } = useFetchStaticContentQuery({
    language: i18n.language || 'en-US',
  });

  const toggleExpand = (index: number) =>
    setExpanded(expanded === index ? null : index);

  // Use API data if available, otherwise fall back to static data
  const apiContent = staticContentResponse?.response?.[0];
  const apiFaqs = apiContent?.faqs || [];
  
  const staticFaqs: FaqItem[] = [
    {
      question: t("what_is_visa") || "What is a visa?",
      answer:
        t("visa_explanation") ||
        "A visa is an endorsement by the issuing country, usually stamped or bound into a passport, that allows the bearer to enter the country.",
    },
    {
      question: t("how_long_visa") || "How long does it take to get a visa?",
      answer:
        t("visa_processing_time") ||
        "Processing times vary by country and visa type, typically ranging from a few days to several weeks.",
    },
    {
      question:
        t("what_documents_required") || "What documents are required?",
      answer:
        t("required_documents") ||
        "Commonly required documents include a passport, application form, photos, and proof of funds/accommodation.",
    },
    {
      question: t("visa_validity") || "How long is a visa valid?",
      answer:
        t("visa_validity_explanation") ||
        "Visa validity depends on the type and country. Tourist visas typically range from 30 days to 10 years.",
    },
    {
      question: t("can_extend_visa") || "Can I extend my visa?",
      answer:
        t("visa_extension") ||
        "Visa extension policies vary by country. Some allow extensions, while others require you to leave and reapply.",
    },
  ];
  
  // Use API FAQs if available, otherwise use static FAQs
  const faqs: FaqItem[] = apiFaqs.length > 0 
    ? apiFaqs.map((faq: any) => ({
        question: faq.question || '',
        answer: faq.answer || '',
      }))
    : staticFaqs;

  const downArrowIconSrc =
    typeof DownArrowIcon === "string"
      ? DownArrowIcon
      : (DownArrowIcon as any)?.src || DownArrowIcon;

  return (
    <div className="max-w-[1120px] mx-auto bg-white px-8 py-5 sm:px-4 sm:py-4">
      {/* Title */}
      <h3 className="font-poppins font-semibold text-[#00366B] text-[28px] sm:text-[20px] mb-4 sm:mb-3">
        {t("faqs")}
      </h3>

      {faqs.map((faq, index) => {
        const isExpanded = expanded === index;

        return (
          <div key={index} className="border-b border-[#F2F2F2]">
            {/* Question row */}
            <button
              type="button"
              onClick={() => toggleExpand(index)}
              aria-expanded={isExpanded}
              className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
            >
              <span className="font-poppins font-medium text-[#00366B] text-[18px] sm:text-[14px] leading-[18px]">
                {faq.question}
              </span>

              <img
                src={downArrowIconSrc}
                alt="expand"
                className={`w-6 h-6 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded
                  ? "max-h-[300px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-3 font-poppins text-[#707478] text-[16px] sm:text-[12px] leading-[18px]">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqSection;

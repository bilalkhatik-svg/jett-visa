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
    <div className="w-full">
      {/* Title */}
      <h2 className="font-poppins font-semibold text-[#003B71] text-2xl mb-6 sm:text-xl sm:mb-5">
        {t("faqs")}
      </h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isExpanded = expanded === index;

          return (
            <div key={index} className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden hover:shadow-sm transition-all">
              {/* Question row */}
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors sm:px-4 sm:py-3"
              >
                <span className="font-poppins font-medium text-[#003B71] text-base leading-relaxed pr-4 sm:text-sm">
                  {faq.question}
                </span>

                <img
                  src={downArrowIconSrc}
                  alt="expand"
                  className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 sm:w-4 sm:h-4 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[400px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-4 font-poppins text-[#6B7280] text-sm leading-relaxed sm:px-4 sm:pb-3 sm:text-xs">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;

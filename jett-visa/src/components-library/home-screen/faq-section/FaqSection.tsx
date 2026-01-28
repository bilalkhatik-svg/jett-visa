"use client";

import React, { useState } from "react";
import DownArrowIcon from "@/assets/images/icons/downArrowIcon.png";
import { useTranslation } from "@/utils/i18nStub";
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
    language: i18n.language || "en-US",
  });

  const toggleExpand = (index: number) =>
    setExpanded(expanded === index ? null : index);

  // Use API data if available, otherwise fall back to static data
  const apiContent = staticContentResponse?.response?.[0];
  const apiFaqs = apiContent?.faqs || [];

  // Use API FAQs if available, otherwise use static FAQs
  const faqs: FaqItem[] =
    apiFaqs.length > 0
      ? apiFaqs.map((faq: any) => ({
          question: faq.question || "",
          answer: faq.answer || "",
        }))
      : [];

  return (
    // <section className="w-full max-w-[1120px] mx-auto opacity-100" style={{minHeight:'324px'}}>
    <div className="w-full max-w-[1120px] mx-auto opacity-100">
      {/* Title */}
      <h2
        className="
    font-poppins font-semibold
    text-[#003B71]
    text-[28px]
    leading-[1]
    tracking-normal
    mb-6
    sm:text-[28px] sm:mb-5
  "
      >
        {"FAQs"}
      </h2>

      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isExpanded = expanded === index;

          return (
            <div key={index}>
              {/* Question row */}
              <button
                type="button"
                onClick={() => toggleExpand(index)}
                aria-expanded={isExpanded}
                className="w-full h-[52px] flex items-center justify-between px-5 text-left focus:outline-none hover:bg-gray-50 transition-colors sm:px-4 sm:py-3"
              >
                <span
                  className="
    font-poppins font-medium
    text-[#003B71]
    text-[18px]
    leading-[1]
    tracking-normal
    pr-4
  "
                >
                  {faq.question}
                </span>

                <svg
                  className={`w-4 h-4 ml-auto transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }` }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-4 font-poppins text-[#6B7280] text-sm leading-relaxed sm:px-4 sm:pb-3 sm:text-xs">
                  {faq.answer}
                </p>
              </div>
              <span className="block w-auto h-px bg-[#F2F2F2] mx-auto"></span>
            </div>
          );
        })}
      </div>
    </div>
    // </section>
  );
};

export default FaqSection;

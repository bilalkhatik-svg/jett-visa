"use client";

import React from 'react';
type TestimonialCardProps = {
  content: string;
  author: string;
  rating?: number;
  starIcon?: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  author,
  rating = 5,
  starIcon = '@assets/images/icons/ratingStarIcon.png',
}) => {
  return (
    <div className="min-w-[200px] sm:min-w-[230px] md:min-w-[300px] bg-white rounded-lg border border-dashed border-[#E4E4E4] p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3">
      <p className="text-xs sm:text-sm md:text-lg font-medium text-[#00366B] leading-5 sm:leading-6 flex-1">{content}</p>

      <div className="flex items-center justify-between mt-1 sm:mt-2">
        <div className="text-xs sm:text-sm md:text-base text-[#00366B]">{author}</div>
        <div className="flex gap-0.5 sm:gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <img key={index} src={starIcon} alt="star" width={12} height={12} className="w-3 h-3 sm:w-[13px] sm:h-[12px] object-contain" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

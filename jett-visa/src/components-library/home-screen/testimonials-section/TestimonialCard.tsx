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
    <div 
      className="bg-white flex flex-col opacity-100"
      style={{
        width: '352px',
        height: '172px',
        borderRadius: '16px',
        border: '1.5px dashed #E4E4E4',
        paddingTop: '20px',
        paddingRight: '30px',
        paddingBottom: '20px',
        paddingLeft: '30px',
        top: '3736px',
        left: '160px',
        gap: '30px',
      }}
    >
      <p 
        className="font-poppins font-medium text-[#003669] leading-none flex-1"
        style={{ 
          fontSize: '18px',
          lineHeight: '100%',
          letterSpacing: '0%'
        }}
      >
        {content}
      </p>

      <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3">
        <div className="text-sm font-semibold text-[#003B71]">{author}</div>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <img key={index} src={starIcon} alt="star" className="w-4 h-4 object-contain" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

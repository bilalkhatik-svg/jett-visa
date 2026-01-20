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
    <div className="min-w-[280px] sm:min-w-[260px] md:min-w-[320px] lg:min-w-[340px] bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all sm:p-5">
      <p className="text-sm font-normal text-[#374151] leading-relaxed flex-1 sm:text-xs">{content}</p>

      <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3">
        <div className="text-sm font-semibold text-[#003B71] sm:text-xs">{author}</div>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <img key={index} src={starIcon} alt="star" className="w-4 h-4 object-contain sm:w-3 sm:h-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

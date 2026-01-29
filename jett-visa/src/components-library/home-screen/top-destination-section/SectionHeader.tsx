"use client";

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  isDesktop?: boolean;
}

const SectionHeader = ({ 
  title, 
  showViewAll = false, 
  onViewAllClick,
  isDesktop = false 
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6 sm:mb-5">
      <h2
        className="
          font-poppins font-semibold
          text-[#003B71]
          text-[28px]
          leading-[1]
          tracking-normal
          mb-8
        "
      >
        {title}
      </h2>
      {isDesktop && showViewAll && (
        <button
          className="text-sm text-[#0087FA] font-medium transition-all sm:text-xs font-[16px]"
          onClick={onViewAllClick}
        >
          View all
        </button>
      )}
    </div>
  );
};

export default SectionHeader;

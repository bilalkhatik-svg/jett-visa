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
    <div className="flex justify-between items-center mb-8">
      <div
        className="
          font-poppins font-semibold
          text-[#003B71]
          text-[28px]
          leading-[1]
          tracking-normal
        "
      >
        {title}
      </div>
      {isDesktop && showViewAll && (
        <button
          className="text-[#0087FA] font-medium transition-all font-[16px]"
          onClick={onViewAllClick}
        >
          View all
        </button>
      )}
    </div>
  );
};

export default SectionHeader;

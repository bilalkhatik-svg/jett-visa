"use client";

interface ScrollButtonsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const ScrollButtons = ({ onScrollLeft, onScrollRight }: ScrollButtonsProps) => {
  return (
    <div className="absolute bottom-0 right-0 flex gap-2 z-10">
      <button
        type="button"
        onClick={onScrollLeft}
        className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
        aria-label="Scroll left"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#00366B]"
        >
          <path
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={onScrollRight}
        className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
        aria-label="Scroll right"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#00366B]"
        >
          <path
            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollButtons;

const ScrollButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: (direction: "left" | "right") => void;
}) => (
  <button
    type="button"
    onClick={() => onClick(direction)}
    className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
    aria-label={`Scroll ${direction}`}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={
          direction === "left"
            ? "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
            : "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
        }
        fill="currentColor"
      />
    </svg>
  </button>
);
export default ScrollButton;
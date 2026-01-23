"use client";

import SearchIcon2 from "@/assets/images/icons/search.png";

type SearchFieldProps = {
  value: string
  placeholder?: string
  label?: string
  readOnly?: boolean
  onClick?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  leadingIconSrc?: string
  leadingIconAlt?: string
}

const SearchField = ({
  value,
  placeholder,
  label,
  readOnly = false,
  onClick,
  onChange,
  leadingIconSrc,
  leadingIconAlt = "",
}: SearchFieldProps) => {

  const searchIcon2Src =
    typeof SearchIcon2 === "string"
      ? SearchIcon2
      : (SearchIcon2 as any)?.src || SearchIcon2
  const inputPaddingClass = leadingIconSrc ? "pl-12" : "pl-4"

  return (
    <div className="mb-4">
      {label && (
        <span className="block mb-2 text-sm font-medium text-[#003669]">
          {label}
        </span>
      )}

      {/* 🔑 relative wrapper */}
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onClick={onClick}
          onChange={onChange}
          className={`
            w-full cursor-pointer
            rounded-xl border border-gray-200
            ${inputPaddingClass} py-3 pr-10 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-100
          `}
        />

        {leadingIconSrc && (
          <img
            src={leadingIconSrc}
            alt={leadingIconAlt}
            className="
              pointer-events-none
              absolute left-4 top-1/2
              h-5 w-5 -translate-y-1/2 rounded-full object-cover
            "
          />
        )}

        <img
          src={searchIcon2Src}
          alt="search icon"
          className="
            pointer-events-none
            absolute right-4 top-1/2
            h-4 w-4 -translate-y-1/2
          "
        />
      </div>
    </div>
  )
}

export default SearchField

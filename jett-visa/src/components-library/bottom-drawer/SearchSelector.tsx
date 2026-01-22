'use client';

import React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/images/icons/search.png';

export interface SelectorItem {
  id: string;
  label: string;
  flag?: string;
}

interface SearchSelectorProps {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  items: SelectorItem[];
  onSelect: (item: SelectorItem) => void;
}

const SearchSelector = ({
  title,
  searchValue,
  onSearchChange,
  items,
  onSelect,
}: SearchSelectorProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-[#003669] mb-4">
        {title}
      </h2>

      {/* Search */}
      <div className="relative mb-5">
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full h-12 rounded-xl border border-gray-200 pl-4 pr-10 text-sm"
        />
        <Image
          src={SearchIcon}
          alt="search"
          width={16}
          height={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
        />
      </div>

      {/* List */}
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex items-center py-3 cursor-pointer active:bg-gray-100"
          >
            {item.flag ? (
              <img
                src={item.flag}
                className="w-6 h-6 rounded-full mr-3"
                alt=""
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 mr-3" />
            )}

            <span className="flex-1 text-sm font-medium text-[#003669]">
              {item.label}
            </span>

            <span className="text-lg text-[#003669]">↗</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchSelector;

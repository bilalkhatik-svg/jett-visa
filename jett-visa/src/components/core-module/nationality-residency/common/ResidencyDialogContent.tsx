import MobileBottomDrawer from '@/components-library/bottom-drawer/BottomDrawer';
import SearchDestination from '@/components-library/home-screen/search-destination/SearchDestination';
import React, { useState, useCallback, useMemo } from 'react';

interface ResidencyDialogContentProps {
    label?: string | React.ReactNode;
    value?: any;
    onChange?: (value: any) => void;
    onClick?: (value: any) => void;
    placeholder?: string;
}
const dummyCountries = [
  {
    id: 'US',
    name: 'United States',
    residency: 'United States',
    nationality: 'American',
    isoCode: 'US',
    IsoCode2: 'US',
    flag: 'https://flagcdn.com/us.svg',
    popularCities: ['New York'],
    currencyCode: 'USD',
    continent: 'North America',
    acronyms: ['USA'],
  },
  {
    id: 'AE',
    name: 'UAE',
    residency: 'UAE',
    nationality: 'UAEN',
    isoCode: 'US',
    IsoCode2: 'US',
    flag: 'https://flagcdn.com/us.svg',
    popularCities: ['New York'],
    currencyCode: 'USD',
    continent: 'North America',
    acronyms: ['USA'],
  },
  
];

// Mock SearchableSelectField component
const SearchableSelectField = ({ label, value, onClick, placeholder } : ResidencyDialogContentProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>

    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-3 border rounded-lg flex justify-between items-center"
    >
      {value ? (
        <div className="flex items-center gap-2">
          <img src={value.flag} className="w-5 h-5 rounded-full" />
          <span>{value.displayName || value.residency}</span>
        </div>
      ) : (
        <span className="text-gray-400">{placeholder}</span>
      )}
      ⌄
    </button>
  </div>
);
// Main ResidencyDialogContent component
const ResidencyDialogContent = () => {
  const [selectedNationality, setSelectedNationality] = useState<any>(null);
  const [selectedResidency, setSelectedResidency] = useState<any>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeField, setActiveField] = useState<'nationality' | 'residency' | null>(null);

  const openSearch = (field: 'nationality' | 'residency') => {
    setActiveField(field);
    setDrawerOpen(true);
  };

  const handlePreFlowNavigation = useCallback(
    ({ destination }:any) => {
      if (activeField === 'nationality') {
        setSelectedNationality(destination);
      } else if (activeField === 'residency') {
        setSelectedResidency(destination);
      }

      setDrawerOpen(false);
      setActiveField(null);
      return true;
    },
    [activeField]
  );

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Update Nationality & Residency
        </h2>
        <SearchableSelectField
          label="Select your nationality"
          value={selectedNationality}
          placeholder="Choose nationality"
          onClick={() => openSearch('nationality')}
        />

        <SearchableSelectField
          label="Select your residency"
          value={selectedResidency}
          placeholder="Choose residency"
          onClick={() => openSearch('residency')}
        />

        <button
          disabled={!selectedNationality || !selectedResidency}
          className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white disabled:bg-gray-300"
        >
          Save
        </button>
      </div>

      <MobileBottomDrawer
        modalOpen={drawerOpen}
        setModalOpen={setDrawerOpen}
        height="75%"
      >
        <SearchDestination
          countryList={dummyCountries}
          onPreFlowNavigation={handlePreFlowNavigation}
          label="Search Country"
        />
      </MobileBottomDrawer>
    </>
  );
};

export default ResidencyDialogContent;
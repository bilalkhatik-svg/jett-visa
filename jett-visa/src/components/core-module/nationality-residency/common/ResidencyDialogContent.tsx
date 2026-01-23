"use client";

import MobileBottomDrawer from "@/components-library/bottom-drawer/BottomDrawer";
import SearchDestination from "@/components-library/home-screen/search-destination/SearchDestination";
import SearchField from "@/components-library/search-field/SearchField";
import { useFetchCountryListQuery } from "@/store/visaCountryListApi";
import countryIcon from "@/assets/images/country.png";
import React, { useState, useCallback, useMemo } from "react";

type FieldType = "nationality" | "residency";

const FIELD_LABELS: Record<FieldType, string> = {
  nationality: "Select your nationality",
  residency: "Select your residency",
};

const ResidencyDialogContent = () => {
  const getSrc = (img: any) => (typeof img === "string" ? img : (img?.src ?? ""));
  const [selectedNationality, setSelectedNationality] = useState<any>(null);
  const [selectedResidency, setSelectedResidency] = useState<any>(null);
  console.log("selectedNationality", selectedNationality);
  const { data, isLoading } = useFetchCountryListQuery("en-US");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeField, setActiveField] = useState<FieldType | null>(null);

  const countryList = useMemo(() => {
    if (!data?.response) return [];
    return data.response;
  }, [data]);

  const searchCountryList = useMemo(() => {
    if (!activeField || countryList.length === 0) return countryList;
    if (activeField === "nationality") {
      return countryList.map((country: any) => ({
        ...country,
        // Use nationality as the display/search label in the list.
        residency: country.nationality,
      }));
    }
    return countryList;
  }, [activeField, countryList]);

  const openSearch = (field: FieldType) => {
    setActiveField(field);
    setDrawerOpen(true);
  };

 const handleSelect = useCallback(
  ({ destination }: any) => {
    if (!activeField) return false;

    const displayNameByField =
      activeField === "nationality" ? destination.nationality : destination.residency;

    const normalized = {
      ...destination,
      displayName:
        displayNameByField ||
        destination.name ||
        destination.countryName ||
        destination.label ||
        destination.residency ||
        destination.nationality ||
        "",
    };

    if (activeField === "nationality") {
      setSelectedNationality(normalized);
    } else {
      setSelectedResidency(normalized);
    }

    setDrawerOpen(false);
    setActiveField(null);
    return true;
  },
  [activeField],
);


  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBF2FF] to-[#F8FAFC] flex items-center justify-center shrink-0">
    <img
      src={getSrc(countryIcon)}
      alt="update nationality residency"
      className="w-7 h-7"
    />
  </div>
       <div className="flex gap-4 items-start">
  {/* Icon */}
 

  {/* Text */}
  <div className="flex flex-col gap-2">
    <h4 className="font-poppins font-semibold text-[#003B71] text-[24px] leading-[28px] p-1">
      Update your nationality and Residency
    </h4>

    <p className="font-poppins text-[#003669] text-[12px] leading-[24px] p-1">
      Get accurate visa info, pricing and privileges based on your nationality
      and residency
    </p>
  </div>
</div>

       
       <SearchField
  value={selectedNationality?.displayName ?? ""}
  onClick={() => openSearch("nationality")}
  placeholder="Select an option"
  label="Select your nationality"
  leadingIconSrc={selectedNationality?.flag}
  leadingIconAlt={selectedNationality?.displayName ?? ""}
  readOnly
/>

        <SearchField
          value={selectedResidency?.displayName ?? ""}
          onClick={() => openSearch("residency")}
          onChange={() => {}}
          placeholder="Select an option"
          label={FIELD_LABELS.residency}
          leadingIconSrc={selectedResidency?.flag}
          leadingIconAlt={selectedResidency?.displayName ?? ""}
          readOnly
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
          key={`${activeField ?? "none"}-${drawerOpen ? "open" : "closed"}`}
          countryList={searchCountryList}
          onPreFlowNavigation={handleSelect}
          label={activeField}
        />
      </MobileBottomDrawer>
    </>
  );
};

export default ResidencyDialogContent;

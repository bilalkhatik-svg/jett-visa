"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import TopBar from "@/components/core-module/navbar/TopBar";
import FooterSection from "@/components-library/home-screen/footer-section/FooterSection";
import { useFetchDestinationsQuery, type Destination as ApiDestination } from "@/store/visaDestinationsApi";
import { getApiLanguageCode } from "@/utils/helper";

interface Destination {
  id: string;
  countryName: string;
  isoCode2: string;
  image: string;
  startingPrice: number;
  symbol: string;
  getVisaDays: number;
  visaMode: string;
  visaModeName: string;
}

const VisaModePageContent = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const mode = searchParams?.get("mode") || "";
  const nat = searchParams?.get("nat") || "";
  const res = searchParams?.get("res") || "";
  
  const nationality = useAppSelector((state) => state.locationSlice.nationality);
  const residency = useAppSelector((state) => state.locationSlice.residency);
  
  const [selectedContinent, setSelectedContinent] = useState<string>("Asia");
  
  // Get API language
  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);

  // Fetch destinations from API
  const { data: destinationsResponse, isLoading, isError } = useFetchDestinationsQuery(
    {
      continent: selectedContinent,
      isoCode2: nat || (nationality as any)?.isoCode || "",
      language: apiLanguage,
    },
    {
      skip: !nat && !(nationality as any)?.isoCode,
    }
  );

  // Filter destinations by the selected visa mode
  const filteredDestinations = useMemo(() => {
    if (!destinationsResponse?.response) return [];
    
    return destinationsResponse.response
      .filter((dest: ApiDestination) => {
        // Match visa mode (case-insensitive)
        return dest.visaMode?.toLowerCase() === mode.toLowerCase() ||
               dest.visaModeName?.toLowerCase().includes(mode.toLowerCase());
      })
      .map((dest: ApiDestination) => ({
        id: dest.id,
        countryName: dest.countryName,
        isoCode2: dest.isoCode2,
        image: dest.images?.[0]?.filename || "",
        startingPrice: dest.startingPrice,
        symbol: dest.symbol,
        getVisaDays: dest.getVisaDays,
        visaMode: dest.visaMode,
        visaModeName: dest.visaModeName,
      }));
  }, [destinationsResponse, mode]);

  // Capitalize mode name for display
  const modeDisplayName = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();

  // Available continents for filtering
  const continents = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania"];

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F5F7FA] to-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 w-full h-[60px]">
        <TopBar
          variant="inner"
          onBackClick={handleBack}
          onLogoClick={handleBack}
          extraText={`${modeDisplayName} Visa`}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#003669] mb-4">
            {modeDisplayName} Visa Destinations
          </h1>
          
          {nationality && residency && (
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Nationality:</span>
                  {(nationality as any)?.flag && (
                    <img 
                      src={(nationality as any).flag} 
                      alt="" 
                      className="w-6 h-4 rounded object-cover"
                    />
                  )}
                  <span>{(nationality as any)?.nationality || (nationality as any)?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Residency:</span>
                  {(residency as any)?.flag && (
                    <img 
                      src={(residency as any).flag} 
                      alt="" 
                      className="w-6 h-4 rounded object-cover"
                    />
                  )}
                  <span>{(residency as any)?.residency || (residency as any)?.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Continent Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedContinent === continent
                    ? "bg-[#003669] text-white"
                    : "bg-white text-[#003669] border border-gray-300 hover:border-[#003669]"
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {!isLoading && (
            <p className="text-sm text-gray-600">
              Showing {filteredDestinations.length} {modeDisplayName.toLowerCase()} visa destination{filteredDestinations.length !== 1 ? 's' : ''} in {selectedContinent}
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-xl h-64"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-24 w-24 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error loading destinations
            </h3>
            <p className="text-gray-500 mb-6">
              There was an error fetching visa destinations. Please try again.
            </p>
            <button
              onClick={handleBack}
              className="bg-[#003669] text-white px-6 py-2 rounded-lg hover:bg-[#002147] transition-colors"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {modeDisplayName.toLowerCase()} visas found
            </h3>
            <p className="text-gray-500 mb-6">
              No destinations found with {modeDisplayName} visas in {selectedContinent}. Try selecting a different continent.
            </p>
          </div>
        )}

        {/* Destinations Grid */}
        {!isLoading && !isError && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => router.push(`/visa?res=${res}&dest=${destination.isoCode2}`)}
              >
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={destination.countryName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#003669] mb-2">
                    {destination.countryName}
                  </h3>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div>
                      <span className="text-gray-600">From </span>
                      <span className="font-bold text-[#D536F6]">
                        {destination.symbol} {destination.startingPrice}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {destination.getVisaDays} days
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block bg-[#E7F5FF] text-[#003669] text-xs px-2 py-1 rounded">
                      {destination.visaModeName || destination.visaMode}
                    </span>
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                      {destination.isoCode2}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

const VisaModePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#003669]" />
      </div>
    }>
      <VisaModePageContent />
    </Suspense>
  );
};

export default VisaModePage;


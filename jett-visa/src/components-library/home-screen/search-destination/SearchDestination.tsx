import React, { useEffect, useState } from 'react';
import SearchIcon2 from "@/assets/images/icons/search.png";
// import DestinationList from '@components/core-module/destination-list/DestinationList';
// import { useCountry } from '@utility/hooks/useCountry';
// import type { Country, ExtendedCountry } from '@utility/types/country/Country';
// import MobileBottomDrawer from '@components/core-module/custom-drawer/MobileBottomDrawer';
import CantFindDestinationForm from './CantFindDestinationForm';
import { useTranslation } from 'react-i18next';
// import type { PendingAction } from "@pages/home-screen/HomeScreen";
// import { useMediaQuery } from '@mui/material';

// Define types locally
export type PendingAction = {
  type: string;
  destination?: any;
  [key: string]: any;
};

interface Country {
  isoCode?: string;
  IsoCode2?: string;
  name?: string;
  residency?: string;
  nationality?: string;
  popularCities?: string[];
  acronyms?: string[];
  flag?: string;
}

interface ExtendedCountry extends Country {
  matchedCity?: string | null;
  displayName?: string;
}

// Static test data - will be replaced with API integration later
const staticCountries: Country[] = [
  { isoCode: 'US', name: 'United States', residency: 'United States', nationality: 'American', popularCities: ['New York', 'Los Angeles', 'Chicago'] },
  { isoCode: 'GB', name: 'United Kingdom', residency: 'United Kingdom', nationality: 'British', popularCities: ['London', 'Manchester', 'Birmingham'] },
  { isoCode: 'DE', name: 'Germany', residency: 'Germany', nationality: 'German', popularCities: ['Berlin', 'Munich', 'Frankfurt'] },
  { isoCode: 'FR', name: 'France', residency: 'France', nationality: 'French', popularCities: ['Paris', 'Lyon', 'Marseille'] },
  { isoCode: 'IT', name: 'Italy', residency: 'Italy', nationality: 'Italian', popularCities: ['Rome', 'Milan', 'Venice'] },
  { isoCode: 'ES', name: 'Spain', residency: 'Spain', nationality: 'Spanish', popularCities: ['Madrid', 'Barcelona', 'Valencia'] },
  { isoCode: 'JP', name: 'Japan', residency: 'Japan', nationality: 'Japanese', popularCities: ['Tokyo', 'Osaka', 'Kyoto'] },
  { isoCode: 'AU', name: 'Australia', residency: 'Australia', nationality: 'Australian', popularCities: ['Sydney', 'Melbourne', 'Brisbane'] },
  { isoCode: 'CA', name: 'Canada', residency: 'Canada', nationality: 'Canadian', popularCities: ['Toronto', 'Vancouver', 'Montreal'] },
  { isoCode: 'IN', name: 'India', residency: 'India', nationality: 'Indian', popularCities: ['Mumbai', 'Delhi', 'Bangalore'] },
  { isoCode: 'AE', name: 'United Arab Emirates', residency: 'United Arab Emirates', nationality: 'Emirati', popularCities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
  { isoCode: 'SG', name: 'Singapore', residency: 'Singapore', nationality: 'Singaporean', popularCities: ['Singapore'] },
];

interface SearchDestinationProps {
    onPreFlowNavigation: (action: PendingAction) => boolean;
}




const SearchDestination = React.memo(({ onPreFlowNavigation }: SearchDestinationProps) => {
    const [search, setSearch] = useState("");
    const [filteredCountries, setFilteredCountries] = useState<ExtendedCountry[]>([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { t, i18n } = useTranslation();
    // const isMobile = useMediaQuery("(max-width:600px)");
    // Using window.innerWidth for mobile detection - replace with useMediaQuery when MUI is available
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // const { refetchCountryList: fetchCountryList, countryListData } = useCountry();
    // Using static data for testing - replace with API hook when ready
    const countryListData = { response: staticCountries };

    // useEffect(() => {
    //     const callCountryListApi = async () => {
    //         if (!countryListData) await fetchCountryList()
    //     }
    //     callCountryListApi()
    // }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const searchTerm = search.toLocaleLowerCase().trim();
        if (!countryListData?.response) return;
        if (searchTerm.length > 0 && searchTerm.length < 2) return;

        const countries = countryListData?.response ?? [];

        // Filter for matches
        const updatedCountries: ExtendedCountry[] = (countryListData.response || [])
            .map((country: Country) => {
                const matchCity = country?.popularCities?.find((city: string) =>
                    city?.toLocaleLowerCase().includes(searchTerm)
                );

                const matchCountry =
                    country?.residency?.toLocaleLowerCase().includes(searchTerm) ||
                    country?.nationality?.toLocaleLowerCase().includes(searchTerm) ||
                    country?.isoCode?.toLocaleLowerCase().includes(searchTerm) ||
                    country?.IsoCode2?.toLocaleLowerCase().includes(searchTerm) ||
                    country?.acronyms?.some((a: string) =>
                        a?.toLocaleLowerCase().includes(searchTerm)
                    );

                if (matchCity) {
                    return {
                        ...country,
                        matchedCity: matchCity,
                        displayName: `${matchCity}, ${country.residency}`,
                    };
                } else if (matchCountry) {
                    return {
                        ...country,
                        matchedCity: null,
                        displayName: country?.residency,
                    };
                }
                return null;
            })
            .filter(Boolean) as ExtendedCountry[];

        const sortedCountries = updatedCountries.sort((a, b) =>
            (a?.nationality || "").localeCompare(b?.nationality || "")
        );

        setFilteredCountries(sortedCountries);
    }, [search, countryListData]);

    // Convert StaticImageData to string for img src
    const searchIcon2Src = typeof SearchIcon2 === 'string' ? SearchIcon2 : (SearchIcon2 as any)?.src || SearchIcon2;

    // Simple DestinationList replacement
    const renderDestinationList = () => {
        if (filteredCountries.length === 0 && search.trim().length > 0) {
        return (
            <div className="flex-1 overflow-y-auto py-4 px-2">
                <div className="text-center text-gray-500 mb-4 text-sm sm:text-base">{t("no_destinations_found")}</div>
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-full text-[#0066CC] text-xs sm:text-sm font-medium hover:underline py-2"
                >
                    {t("cant_find_your_destination")}
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto py-2">
            {filteredCountries.map((country, index) => (
                <div
                    key={`${country.isoCode}-${index}`}
                    onClick={() => onPreFlowNavigation({ type: "search", destination: country })}
                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                    {country.flag && (
                        <img src={country.flag} alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-[#003669] truncate">
                            {country.displayName || country.residency || country.name}
                        </div>
                        {country.matchedCity && (
                            <div className="text-xs text-gray-500 truncate">{country.matchedCity}</div>
                        )}
                    </div>
                </div>
            ))}
            {search.trim().length > 0 && filteredCountries.length > 0 && (
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="w-full text-[#0066CC] text-xs sm:text-sm font-medium hover:underline mt-2 py-2 px-2"
                >
                    {t("cant_find_your_destination")}
                </button>
            )}
        </div>
        );
    };

    return (
        <div className="flex flex-col h-full overflow-hidden px-3 sm:px-4">
            <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#003669] mb-2">{t("search_destination")}</h3>
            </div>

            <div className="relative my-3">
                <input
                    className="w-full rounded-lg border border-gray-200 h-10 sm:h-11 px-3 pr-10 bg-white text-sm sm:text-base"
                    placeholder={t("search_by_country_or_city")}
                    value={search}
                    onChange={handleSearch}
                />
                <img src={searchIcon2Src} width={14} height={14} alt='searchIcon' className="absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {renderDestinationList()}

            {/* Simple drawer replacement - replace with MobileBottomDrawer when component is available */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={() => setDrawerOpen(false)}>
                    <div className="bg-white w-full rounded-t-lg" style={{ height: '78%' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end p-2">
                            <button onClick={() => setDrawerOpen(false)} className="text-gray-500 text-xl">✕</button>
                        </div>
                        <div className="overflow-y-auto" style={{ height: 'calc(78% - 40px)' }}>
                            <CantFindDestinationForm
                                searchTerm={search}
                                onClose={() => setDrawerOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
})

export default SearchDestination

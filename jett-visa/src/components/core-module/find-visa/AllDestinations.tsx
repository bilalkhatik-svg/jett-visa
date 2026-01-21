'use client';

import { useEffect, useMemo, useState, Suspense } from "react";
import { useTranslation } from "@/utils/i18nStub";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Mock data
const continents = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];

// Types
interface DestinationItem {
  name: string;
  image: string;
  price?: number;
  currency?: string;
  time?: number;
  isEarliest?: boolean;
}

interface NationalityResidency {
  flag?: string;
  text?: string;
}

// Simple ModeSelection placeholder component
const ModeSelection = ({ 
  title, 
  nationality, 
  residency, 
  renderItems, 
  isLoading 
}: {
  title: string;
  nationality?: NationalityResidency;
  residency?: NationalityResidency;
  renderItems: DestinationItem[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="skeleton h-8 w-64 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-64 w-full rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
      
      {(nationality || residency) && (
        <div className="flex gap-4 mb-6">
          {nationality && (
            <div className="flex items-center gap-2">
              {nationality.flag && (
                <Image
                  src={nationality.flag}
                  alt={nationality.text || 'Nationality'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-base-content">{nationality.text}</span>
            </div>
          )}
          {residency && (
            <div className="flex items-center gap-2">
              {residency.flag && (
                <Image
                  src={residency.flag}
                  alt={residency.text || 'Residency'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-base-content">{residency.text}</span>
            </div>
          )}
        </div>
      )}

      {renderItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="card bg-base-100 shadow-xl">
              <figure>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary">{item.name}</h2>
                <div className="flex gap-2 flex-wrap">
                  {item.price && (
                    <div className="badge badge-primary">
                      {item.currency}{item.price}
                    </div>
                  )}
                  {item.time && (
                    <div className="badge badge-outline">
                      {item.time} days
                    </div>
                  )}
                  {item.isEarliest && (
                    <div className="badge badge-success">Earliest</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          <span>No destinations found</span>
        </div>
      )}
    </div>
  );
};

interface Country {
  id?: string;
  isoCode?: string;
  name?: string;
  nationality?: string;
  residency?: string;
  flag?: string;
}

interface ApiDestination {
  id: string;
  countryName: string;
  images?: Array<{ filename: string }>;
  startingPrice?: number;
  symbol?: string;
  getVisaDays?: number;
  isEarliest?: boolean;
}

const AllDestinationsContent = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const passedContinent = searchParams?.get('continent') || null;
  const DEFAULT_CONTINENT = passedContinent || continents[0] || "Asia";
  const [selectedContinent, setSelectedContinent] = useState<string>(DEFAULT_CONTINENT);
  
  // Local state for nationality and residency
  const [nationality, setNationality] = useState<Country | null>(null);
  const [residency, setResidency] = useState<Country | null>(null);
  const [destinations, setDestinations] = useState<ApiDestination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (passedContinent) {
      setSelectedContinent(passedContinent);
    }
  }, [passedContinent]);

  // Mock API call - replace with actual API call when available
  useEffect(() => {
    if (!nationality?.isoCode) return;
    
    setIsLoading(true);
    setIsError(false);
    
    // Simulate API call
    const fetchDestinations = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/destinations?continent=${selectedContinent}&isoCode=${nationality.isoCode}`);
        // const data = await response.json();
        // setDestinations(data);
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDestinations([]);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, [selectedContinent, nationality?.isoCode]);

  // Convert API data → card items used by ModeSelection
  const renderItems = useMemo<DestinationItem[]>(() => {
    if (isError) return [];
    if (!destinations || destinations.length === 0) return [];
    
    return destinations.map((item: ApiDestination) => ({
      name: item.countryName,
      image: item.images?.[0]?.filename || '/assets/images/germany-card-img.webp',
      price: item.startingPrice,
      currency: item.symbol,
      time: item.getVisaDays,
      isEarliest: item.isEarliest || false,
    }));
  }, [destinations, isError]);

  return (
    <ModeSelection
      title={t("all_destinations") || "All Destinations"}
      nationality={{
        flag: nationality?.flag,
        text: nationality?.nationality || nationality?.name,
      }}
      residency={{
        flag: residency?.flag,
        text: residency?.residency || residency?.name,
      }}
      renderItems={renderItems}
      isLoading={isLoading}
    />
  );
};

const AllDestinationsPage = () => {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="skeleton h-8 w-64 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-64 w-full rounded-lg"></div>
          ))}
        </div>
      </div>
    }>
      <AllDestinationsContent />
    </Suspense>
  );
};

export default AllDestinationsPage;

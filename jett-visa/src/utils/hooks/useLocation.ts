import { useAppSelector } from "@/store/hooks";

export const useLocation = () => {
  const nationality = useAppSelector((state) => state.locationSlice.nationality);
  const residency = useAppSelector((state) => state.locationSlice.residency);
  const ip = useAppSelector((state) => state.locationSlice.ip);
  const countryIsoCode = useAppSelector((state) => state.locationSlice.countryIsoCode);
  const locationResponse = useAppSelector((state) => state.locationSlice.locationResponse);

  return {
    nationality,
    residency,
    ip,
    countryIsoCode,
    locationResponse,
  };
};


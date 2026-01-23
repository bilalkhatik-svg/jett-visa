import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationResponse } from "@/store/locationApi";
import type { ICountry } from '@/utils/types/nationality-residency/Country';

interface LocationState {
  ip: string;
  country: ICountry | null;
  residency: ICountry | null;  
  nationality: ICountry | null;
  countryIsoCode: string;
  locationResponse: any;
}

const initialState: LocationState = {
  ip: "",
  country: null,
  residency: null,
  nationality: null,
  countryIsoCode: "",
  locationResponse: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setNationality: (state, action: PayloadAction<ICountry | null>) => {
      state.nationality = action.payload;
    },
    setResidency: (state, action: PayloadAction<ICountry | null>) => {
      state.residency = action.payload;
    },
    setLocationData: (state, action: PayloadAction<LocationResponse>) => {
      state.ip = action.payload.ip;
      state.country = null; 
      state.residency = null; 
      state.locationResponse = action.payload;
      state.countryIsoCode = action.payload.countryIsoCode;
    },
    setCountryIsoCode: (state, action) => {
      state.countryIsoCode = action.payload;
    }
  },
});

export const { setNationality, setResidency, setLocationData, setCountryIsoCode } = locationSlice.actions;
export default locationSlice.reducer;

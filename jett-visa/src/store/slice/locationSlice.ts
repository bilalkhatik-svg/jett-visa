import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationResponse } from "@/store/locationApi";
<<<<<<< HEAD
import type { Country } from '@/utils/types/nationality-residency/Country';
=======
import type { Country } from '@/utility/types/nationality-residency/Country';
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54

interface LocationState {
  ip: string;
  country: Country | null;
  residency: Country | null;  
  nationality: Country | null;
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
    setNationality: (state, action: PayloadAction<Country | null>) => {
      state.nationality = action.payload;
    },
    setResidency: (state, action: PayloadAction<Country | null>) => {
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

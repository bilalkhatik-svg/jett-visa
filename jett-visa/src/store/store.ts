import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "@/store/slice/loginSlice";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { visaCountryListApi } from "@/store/visaCountryListApi";
import { visaModesApi } from "@/store/visaModesListApi";
import { ipApi, locationApi } from "@/store/locationApi";
import { visaTopDestinationApi } from "@/store/visaTopDestinationApi";
import { visaStaticContentApi } from "@/store/visaStaticContentApi";
import { visaDestinationsApi } from "@/store/visaDestinationsApi"; 
import { authorizationApi } from "@/store/authorizationApi"; 
import { languageSlice } from '@/store/slice/languageSlice';
import { locationSlice } from '@/store/slice/locationSlice';
import { notificationSlice } from '@/store/slice/notificationSlice';
import { visaTicketApi } from "./contactFormApi";

const appReducer = combineReducers({
  [visaCountryListApi.reducerPath]: visaCountryListApi.reducer,
  [visaModesApi.reducerPath]: visaModesApi.reducer,
  [ipApi.reducerPath]: ipApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [visaTopDestinationApi.reducerPath]: visaTopDestinationApi.reducer,
  [visaStaticContentApi.reducerPath]: visaStaticContentApi.reducer,
  [visaDestinationsApi.reducerPath]: visaDestinationsApi.reducer,
  [authorizationApi.reducerPath]: authorizationApi.reducer,
  [visaTicketApi.reducerPath]: visaTicketApi.reducer,
  loginSlice: loginSlice.reducer,
  locationSlice: locationSlice.reducer,
  languageSlice: languageSlice.reducer,
  notificationSlice: notificationSlice.reducer,


})

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: [
    'loginSlice',
    'locationSlice',
    'notificationSlice',
    'languageSlice',
  ]
}

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: { type: string }
) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(
    visaCountryListApi.middleware,
    visaModesApi.middleware,
    ipApi.middleware,
    locationApi.middleware,
    visaTopDestinationApi.middleware,
    visaStaticContentApi.middleware,
    visaDestinationsApi.middleware,
    authorizationApi.middleware,
    visaTicketApi.middleware
  )
})

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

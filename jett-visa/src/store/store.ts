import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "@/store/slice/loginSlice";
<<<<<<< HEAD
=======
import { locationSlice } from "@/store/slice/locationSlice";
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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
<<<<<<< HEAD
import { locationSlice } from '@/store/slice/locationSlice';
// import { notificationSlice } from '@/store/slice/notificationSlice';
=======
import { notificationSlice } from '@/store/slice/notificationSlice';
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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
<<<<<<< HEAD
//   notificationSlice: notificationSlice.reducer,
=======
  notificationSlice: notificationSlice.reducer,
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54


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
<<<<<<< HEAD
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(
=======
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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

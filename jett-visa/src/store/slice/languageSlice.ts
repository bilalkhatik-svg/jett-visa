import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Language, LanguageState, SaveLanguagePayload } from '@utility/types/language/Language';
import type { RootState } from '@/store/store';
import USflagIcon from '@/assets/images/icons/usflagicon.webp'
import UAEflagIcon from '@/assets/images/icons/uaeflagicon.webp'


const STORAGE_KEY = 'appLanguage';

const defaultLanguage: Language = {
  code: 'en-US',
  name: 'English',
  nativeName: 'English',
  region: 'US',
  flag: USflagIcon,
  direction: 'ltr',
};

export const availableLanguages: Language[] = [
  { code: 'en-US', name: 'English', nativeName: 'English', region: 'US', flag: USflagIcon, direction: 'ltr' },
  { code: 'ar-AE', name: 'Arabic', nativeName: 'العربية', region: 'AE', flag: UAEflagIcon, direction: 'rtl' },
];

const initialState: LanguageState = {
  currentLanguage: defaultLanguage,
  availableLanguages,
  loading: false,
  error: null,
};

export const loadLanguageFromStorage = createAsyncThunk(
  'language/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const languageCode = stored;
        const language = availableLanguages.find(lang => lang.code === languageCode);
        return language || defaultLanguage;
      }
      return defaultLanguage;
    } catch (error) {
      return rejectWithValue('Failed to load language from storage');
    }
  }
);


export const saveLanguage = createAsyncThunk(
  'language/save',
  async (payload: SaveLanguagePayload, { rejectWithValue }) => {
    try {
      const { userId, languageCode } = payload;

      const language = availableLanguages.find(lang => lang.code === languageCode);
      if (!language) {
        return rejectWithValue('Invalid language code');
      }

      localStorage.setItem(STORAGE_KEY, languageCode);

      return language;
    } catch (error) {
      return rejectWithValue('Failed to save language');
    }
  }
);


export const syncLanguageFromBackend = createAsyncThunk(
  'language/syncFromBackend',
  async (userId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with real API call
      // const response = await api.getUserLanguage(userId);
      // const languageCode = response.languageCode;

      const languageCode = localStorage.getItem(STORAGE_KEY) || defaultLanguage.code;

      const language = availableLanguages.find(lang => lang.code === languageCode);
      if (language) {
        localStorage.setItem(STORAGE_KEY, languageCode);
        return language;
      }
      return defaultLanguage;
    } catch (error) {
      return rejectWithValue('Failed to sync language from backend');
    }
  }
);

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguageFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLanguageFromStorage.fulfilled, (state, action) => {
        state.currentLanguage = action.payload;
        state.loading = false;
      })
      .addCase(loadLanguageFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(saveLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLanguage.fulfilled, (state, action) => {
        state.currentLanguage = action.payload;
        state.loading = false;
      })
      .addCase(saveLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(syncLanguageFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncLanguageFromBackend.fulfilled, (state, action) => {
        state.currentLanguage = action.payload;
        state.loading = false;
      })
      .addCase(syncLanguageFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLanguage, setLoading, setError } = languageSlice.actions;

export const selectCurrentLanguage = (state: RootState) => state.languageSlice.currentLanguage;
export const selectAvailableLanguages = (state: RootState) => state.languageSlice.availableLanguages;
export const selectLanguageLoading = (state: RootState) => state.languageSlice.loading;
export const selectLanguageError = (state: RootState) => state.languageSlice.error;

export default languageSlice.reducer;
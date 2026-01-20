import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
export type NotificationPermissionState = 'granted' | 'denied' | 'default' | 'unsupported';

export interface NotificationState {
  enabled: boolean; 
  systemPermission: NotificationPermissionState; 
  loading: boolean;
  error: string | null;
}

export interface SaveNotificationPayload {
  userId?: string;
  enabled: boolean;
}

const STORAGE_KEY = 'appNotifications';
const DEFAULT_ENABLED = true; 


export const getBrowserPermissionStatus = (): NotificationPermissionState => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission as NotificationPermissionState;
};

export const requestNotificationPermission = async (): Promise<NotificationPermissionState> => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission as NotificationPermissionState;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return Notification.permission as NotificationPermissionState;
  }
};

export const loadNotificationFromStorage = createAsyncThunk(
  'notification/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const stored = localStorage.getItem(STORAGE_KEY);
      const enabled = stored !== null ? stored === 'true' : DEFAULT_ENABLED;
      const systemPermission = getBrowserPermissionStatus();

      return { enabled, systemPermission };
    } catch (error) {
      return rejectWithValue('Failed to load notification settings');
    }
  }
);

export const saveNotification = createAsyncThunk(
  'notification/save',
  async (payload: SaveNotificationPayload, { rejectWithValue }) => {
    try {
      const { enabled, userId } = payload;

      localStorage.setItem(STORAGE_KEY, String(enabled));

      
      await new Promise((resolve) => setTimeout(resolve, 200));

      return { enabled, systemPermission: getBrowserPermissionStatus() };
    } catch (error) {
      return rejectWithValue('Failed to save notification settings');
    }
  }
);


export const syncNotificationFromBackend = createAsyncThunk(
  'notification/syncFromBackend',
  async (userId: string, { rejectWithValue }) => {
    try {

      const stored = localStorage.getItem(STORAGE_KEY);
      const enabled = stored !== null ? stored === 'true' : DEFAULT_ENABLED;

      await new Promise((resolve) => setTimeout(resolve, 300));

      localStorage.setItem(STORAGE_KEY, String(enabled));
      const systemPermission = getBrowserPermissionStatus();

      return { enabled, systemPermission };
    } catch (error) {
      return rejectWithValue('Failed to sync notification settings from backend');
    }
  }
);

export const refreshPermissionStatus = createAsyncThunk(
  'notification/refreshPermission',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const currentEnabled = state.notificationSlice.enabled;
    const systemPermission = getBrowserPermissionStatus();

    return { enabled: currentEnabled, systemPermission };
  }
);

const initialState: NotificationState = {
  enabled: DEFAULT_ENABLED,
  systemPermission: 'default',
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
      state.error = null;
    },
    setSystemPermission: (state, action: PayloadAction<NotificationPermissionState>) => {
      state.systemPermission = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotificationFromStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadNotificationFromStorage.fulfilled, (state, action) => {
        state.enabled = action.payload.enabled;
        state.systemPermission = action.payload.systemPermission;
        state.loading = false;
      })
      .addCase(loadNotificationFromStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(saveNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveNotification.fulfilled, (state, action) => {
        state.enabled = action.payload.enabled;
        state.systemPermission = action.payload.systemPermission;
        state.loading = false;
      })
      .addCase(saveNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(syncNotificationFromBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncNotificationFromBackend.fulfilled, (state, action) => {
        state.enabled = action.payload.enabled;
        state.systemPermission = action.payload.systemPermission;
        state.loading = false;
      })
      .addCase(syncNotificationFromBackend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(refreshPermissionStatus.fulfilled, (state, action) => {
        state.systemPermission = action.payload.systemPermission;
      });
  },
});

export const {
  setNotificationEnabled,
  setSystemPermission,
  setLoading,
  setError,
  clearError,
} = notificationSlice.actions;

export const selectNotificationEnabled = (state: RootState) => state.notificationSlice.enabled;
export const selectSystemPermission = (state: RootState) => state.notificationSlice.systemPermission;
export const selectNotificationLoading = (state: RootState) => state.notificationSlice.loading;
export const selectNotificationError = (state: RootState) => state.notificationSlice.error;

export default notificationSlice.reducer;

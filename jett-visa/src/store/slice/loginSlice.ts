import { createSlice } from '@reduxjs/toolkit';

interface AuthTokens {
  ConsumerKey?: string;
  ConsumerSecret?: string;
  AccessToken?: string;
  ExpiryAt?: string;
}

interface LoginState {
  userLoginInfo: Record<string, unknown>;
  token: Record<string, unknown>;
  tokenObj: Record<string, unknown>;
  authShareToken?: string;
  authorizationTokens?: AuthTokens;
}

const initialState: LoginState = {
  userLoginInfo: {},
  token: {},
  tokenObj: {},
  authShareToken: '',
  authorizationTokens: undefined,
};

export const loginSlice = createSlice({
  initialState,
  name: 'loginSlice',
  reducers: {
    logout: (state) => {
      state.token = {};
      state.tokenObj = {};
      state.authShareToken = '';
      state.userLoginInfo = {};
      state.authorizationTokens = undefined;
    },
    setAuthTokens: (state, action) => {
      state.token = action.payload;
      state.tokenObj = action.payload;
    },
    setAuthShareToken: (state, action) => {
      state.authShareToken = action.payload;
    },
    setAuthorizationTokens: (state, action) => {
      state.authorizationTokens = action.payload;
    },
  },
});


export const { logout, setAuthTokens, setAuthShareToken, setAuthorizationTokens } = loginSlice.actions;

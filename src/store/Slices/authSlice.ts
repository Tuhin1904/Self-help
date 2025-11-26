import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthDetails {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: AuthDetails = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    // Set both tokens after login / refresh
    setTokens: (
      state,
      action: PayloadAction<{ token: string; refreshToken?: string }>
    ) => {
      state.token = action.payload.token;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },

    // Store logged-in user data
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },

    // Logout
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { setToken, setTokens, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

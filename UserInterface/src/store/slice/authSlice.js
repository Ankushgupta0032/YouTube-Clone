import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  status: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        userData
      );

      console.log("Signup response:", response.data);

      return response.data.data;
    } catch (error) {
      console.log("Signup status:", error.response?.status);
      console.log("Signup backend error:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userData
      );

      return response.data.data;

      // ADD THIS
      localStorage.setItem("accessToken", data.accessToken);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout");

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;

        state.user = action.payload?.user || null;
        state.accessToken = action.payload?.accessToken || null;
        state.refreshToken = action.payload?.refreshToken || null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;

        state.user = action.payload?.user || null;
        state.accessToken = action.payload?.accessToken || null;
        state.refreshToken = action.payload?.refreshToken || null;

        // Save token in localStorage
        localStorage.setItem("accessToken", action.payload?.accessToken);
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.payload;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("accessToken");

        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = false;
      })

      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

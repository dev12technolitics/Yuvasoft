import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { dispatch } from "../store";

const initialState = {
  isLoadingLogin: false,
  isLoading: false,
  error: null,
  registerUser: {},
  loginUser: {},
  userAccessToken: null,
};

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const header = {
  "Content-Type": "multipart/form-data",
  "x-access-token": accessToken,
};

const jsonheader = {
  "Content-Type": "application/json",
  "x-access-token": accessToken,
};

const Slice = createSlice({
  name: "loginRegister",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startLoadingLogin(state) {
      state.isLoadingLogin = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // POST RAGISTER
    getRegisterSuccess(state, action) {
      state.isLoading = false;
      state.registerUser = action.payload;
    },

    // LOGIN RAGISTER
    getLoginSuccess(state, action) {
      state.isLoading = false;
      state.isLoadingLogin = false;
      state.loginUser = action.payload;
    },

    // ACCESS TOKEN
    getLoginAccessTokenSuccess(state, action) {
      state.isLoadingLogin = false;
      state.userAccessToken = action.payload;
    },
  },
});

export default Slice.reducer;

// POST RAGISTER
export function postRegisterUser(formData, toast, reset, setUserExist) {
  return async () => {
    dispatch(Slice.actions.startLoading());
    try {
      const response = await axios.post("/adminuser/signup", formData, {
        headers: jsonheader,
      });
      dispatch(Slice.actions.getRegisterSuccess(response.data));
      if (response.data.status == true) {
        reset();
        setUserExist(true);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(Slice.actions.hasError(error));
      toast.error(error?.message);
    }
  };
}

// LOGIN RAGISTER
export function postLoginUser(formData, toast, reset) {
  return async () => {
    dispatch(Slice.actions.startLoadingLogin());
    try {
      const response = await axios.post("/adminuser/login", formData, {
        headers: jsonheader,
      });
      dispatch(Slice.actions.getLoginSuccess(response.data.user));
      dispatch(
        Slice.actions.getLoginAccessTokenSuccess(response.data.accessToken)
      );
      if (response.data.status == true) {
        reset();
        toast.success(response?.data?.message);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("accessToken", response.data.accessToken);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      dispatch(Slice.actions.hasError(error));
      toast.error(error?.message);
      dispatch(Slice.actions.getLoginSuccess(null));
      dispatch(Slice.actions.getLoginAccessTokenSuccess(null));
    }
  };
}

// USER LOG OUT
export function postLogoutUser() {
  return async (dispatch) => {
    dispatch(Slice.actions.startLoading());
    try {
      dispatch(Slice.actions.getLoginSuccess(null));
      dispatch(Slice.actions.getLoginAccessTokenSuccess(null));
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } catch (error) {
      dispatch(Slice.actions.hasError(error));
    }
  };
}

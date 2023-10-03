import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { dispatch } from "../store";

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  deleteStatus: false,
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
  name: "User",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ALL USER
    getAlluserSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    //DELETE USER
    deleteUserSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default Slice.reducer;

// GET ALL USER
export function getAlluser() {
  return async (dispatch) => {
    dispatch(Slice.actions.startLoading());
    try {
      const response = await axios.get("//all");
      dispatch(Slice.actions.getAlluserSuccess(response.data));
    } catch (error) {
      dispatch(Slice.actions.hasError(error));
    }
  };
}

// ADD USER
export function postUsers(payload, toast, setIsLoading) {
  return async () => {
    try {
      const response = await axios.post("//add", payload, { headers: header });
      if (response.data?.status) {
        setIsLoading(false);
        toast.success(response.data?.message);
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}

// EDIT USER
export function putUsers(id, payload, toast, setIsLoading) {
  return async () => {
    try {
      const response = await axios.put("//update/" + id, payload, {
        headers: header,
      });
      if (response.data?.status) {
        setIsLoading(false);
        toast.success(response.data?.message);
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}

//DELETE USER
export function deleteUser(id, toast) {
  return async () => {
    dispatch(Slice.actions.startLoading());
    try {
      const response = await axios.delete("//delete/" + id, {
        headers: header,
      });
      dispatch(Slice.actions.deleteUserSuccess(response.data));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(Slice.actions.hasError(error));
    }
  };
}

import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Actions
  // Load User
  const loadUser = () => {
    console.log("Load User");
  };
  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.res.data.msg });
    }
  };

  // Login User
  const login = () => {
    console.log("login");
  };
  // Logout
  const logout = () => {
    console.log("logout");
  };
  // Clear Errors
  const clearErrors = () => {
    console.log("Clear Errors");
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        logout,
        clearErrors,
        loadUser,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

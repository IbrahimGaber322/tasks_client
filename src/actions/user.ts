import { SIGNUP, SIGNIN, SIGNOUT } from "../constants/actionTypes";

import * as api from "../api";

export const signOut = (navigate: Function) => async (dispatch: Function) => {
  try {
    dispatch({ type: SIGNOUT });
    navigate("/posts?page=1");
  } catch (error) {
    console.log(error);
  }
};

export const signUp =
  (user: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.signUp(user);
      if (data.token) {
        dispatch({ type: SIGNUP, payload: data });

        navigate("/posts?page=1");
      } else {
        navigate("/confirmEmail");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const confirmEmail =
  (token: string, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.confirmEmail(token);
      dispatch({ type: SIGNUP, payload: data });

      navigate("/posts?page=1");
    } catch (error) {
      console.log(error);
    }
  };

export const signIn =
  (user: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.signIn(user);
      if (data?.confirmed) {
        dispatch({ type: SIGNIN, payload: data });

        navigate("/posts?page=1");
      } else {
        navigate("/confirmEmail");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const forgotPassword =
  (userEmail: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.forgotPassword(userEmail);
      if (data.message === "success") {
        navigate("/resetpassword");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const resetPassword =
  (userData: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.resetPassword(userData);

      if (data) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

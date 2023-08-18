import { SIGNUP, SIGNIN, SIGNOUT } from "../constants/actionTypes";

import * as api from "../api";


export const signOut:any = (navigate: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: SIGNOUT });
    navigate("/?page=1");
  } catch (error) {
    console.log(error);
  }
};

export const signUp:any =
  (user: any, navigate: Function)  => async (dispatch: Function) =>  {
  
    try {
      const { data } = await api.signUp(user);
      if (data.token) {
        dispatch({ type: SIGNUP, payload: data });

        navigate("/?page=1");
      } else {
        navigate("/confirm");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const confirm:any =
  (token: string, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.confirm(token);
      dispatch({ type: SIGNUP, payload: data });

      navigate("/?page=1");
    } catch (error) {
      console.log(error);
    }
  };

export const signIn:any =
  (user: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.signIn(user);
      console.log(data);
      if (data?.confirmed) {
        dispatch({ type: SIGNIN, payload: data });

        navigate("/?page=1");
      } else {
        dispatch({ type: SIGNIN, payload: data });
        navigate("/confirm");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const forget:any =
  (userEmail: any,setSent:Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.forget(userEmail);
      if (data.message === "success") {
        setSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const reset:any =
  (userData: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.reset(userData);

      if (data) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const sendConfirm:any = (token:any, setSent:Function) => async () => {
    console.log(token);
    try {
      await api.sendConfirm(token);
      setSent(true);
      
    } catch (error) {
      console.log(error);
    }
  } 

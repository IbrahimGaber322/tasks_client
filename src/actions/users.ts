// Import action type constants and API functions
import { SIGNUP, SIGNIN, SIGNOUT } from "../constants/actionTypes";
import * as api from "../api";

// Action creator for signing out
export const signOut: any = (navigate: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: SIGNOUT });
    navigate("/?page=1"); // Navigate to the specified page after signing out
  } catch (error) {
    console.log(error);
  }
};

// Action creator for user sign up
export const signUp: any =
  (user: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.signUp(user); // Call the signUp API function

      if (data.token) {
        dispatch({ type: SIGNUP, payload: data }); // Dispatch action to update state with user data
        navigate("/?page=1"); // Navigate to the specified page after successful sign up
      } else {
        navigate("/confirm"); // Navigate to the confirmation page if token is not received
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for confirming user registration
export const confirm: any =
  (token: string, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.confirm(token); // Call the confirm API function
      dispatch({ type: SIGNUP, payload: data }); // Dispatch action to update state with user data
      navigate("/?page=1"); // Navigate to the specified page after confirming registration
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for user sign in
export const signIn: any =
  (user: any, navigate: Function, setError: Function) =>
  async (dispatch: Function) => {
    try {
      const { data } = await api.signIn(user); // Call the signIn API function

      if (data?.confirmed) {
        dispatch({ type: SIGNIN, payload: data }); // Dispatch action to update state with user data
        navigate("/?page=1"); // Navigate to the specified page after successful sign in
      } else {
        dispatch({ type: SIGNIN, payload: data });
        navigate("/confirm"); // Navigate to the confirmation page if user is not confirmed
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

// Action creator for sending a forget password request
export const forget: any =
  (userEmail: any, setSent: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.forget(userEmail); // Call the forget API function
      if (data.message === "success") {
        setSent(true); // Update the state to indicate that the reset link was sent
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for resetting user password
export const reset: any =
  (userData: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.reset(userData); // Call the reset API function

      if (data) {
        navigate("/sign-in"); // Navigate to the sign-in page after successful password reset
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for sending a confirmation email
export const sendConfirm: any = (token: any, setSent: Function) => async () => {
  console.log(token);
  try {
    await api.sendConfirm(token); // Call the sendConfirm API function
    setSent(true); // Update the state to indicate that the confirmation email was sent
  } catch (error) {
    console.log(error);
  }
};

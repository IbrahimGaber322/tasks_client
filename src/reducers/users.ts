// Import action type constants
import { SIGNIN, SIGNUP, SIGNOUT, EDITPROFILE } from "../constants/actionTypes";

// Define the structure of the User object
interface User {
  token: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

// Get initial user data from local storage, if available
const initialUser = localStorage.getItem("user");
const initialState = initialUser ? JSON.parse(initialUser) : {};

// Update user data in local storage
const updateUserInLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Define the userReducer
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Handle cases for editing profile, signing up, and signing in
    case EDITPROFILE:
    case SIGNUP:
    case SIGNIN:
      // Check if payload is available and update local storage
      if (action.payload) {
        updateUserInLocalStorage(action.payload);
        return action.payload;
      }
      return state;
    // Handle the case for signing out
    case SIGNOUT:
      // Remove user data from local storage
      localStorage.removeItem("user");
      return {};
    // Default case: return current state
    default:
      return state;
  }
};

// Export the userReducer
export default userReducer;

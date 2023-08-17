import { SIGNIN, SIGNUP, SIGNOUT, EDITPROFILE } from "../constants/actionTypes";

interface User {
    token:string;
    name:string;
    firstName:string|null;
    lastName:string|null;
    email:string;
}
const initialUser = localStorage.getItem("user");
const initialState = initialUser ? JSON.parse(initialUser) : {};

const updateUserInLocalStorage = (user:User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case EDITPROFILE:
        case SIGNUP:
        case SIGNIN:
            console.log(action.payload)
            if (action.payload) {
                updateUserInLocalStorage(action.payload);
                return action.payload;
            }
            return state;
        case SIGNOUT:
            localStorage.removeItem("user");
            return {};
        default:
            return state;
    }
};

export default userReducer;

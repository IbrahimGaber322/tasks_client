import {SIGNIN,SIGNUP,SIGNOUT, EDITPROFILE} from "../constants/actionTypes";


const userReducer = (user=JSON.parse(localStorage.getItem("user")||'{}') ,action:any) =>{
    
    switch(action.type){
        case EDITPROFILE:
        case SIGNUP:
        case SIGNIN:
            localStorage.setItem("user",JSON.stringify(action?.payload));
        return user=JSON.parse(localStorage.getItem("user")||'{}');
        case SIGNOUT:
            localStorage.removeItem("user");
        return user=JSON.parse(localStorage.getItem("user")||'{}');
        default: 
        return user;
    } 
    

}

export default userReducer;
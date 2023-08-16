import axios from "axios";
import store from "../store/store";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const API = axios.create({baseURL:SERVER_URL});
const GetUser = ()=>{
     const user = store.getState().user;
    return user;
}
API.interceptors.request.use((req)=>{
    const user = GetUser();
    if(user?.token){
        req.headers.Authorization = `Bearer ${user?.token}`
    }
  
    return req ;
});

export const fetchTasks = (page:any) => API.get(`/tasks/getTasks?page=${page}`); 
export const fetchTask = (id:any) => API.get(`/tasks/task/${id}`); 
export const getTasksBySearch = (search:any,page:any) => API.get(`/tasks/search?searchQuery=${search.searchQuery}&searchTags=${search.searchTags}&page=${page}`); 
export const createTask = (newTask:any) => API.post("/tasks", newTask);
export const updateTask = (id:any, updatedTask:any) => API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id:any) => API.delete(`/tasks/task/${id}`);
export const deleteComment = (taskId:any,commentId:any) => API.delete(`/tasks/comment/${taskId}/${commentId}`);
export const comment = (comment:any,id:any) => API.patch(`/tasks/${id}/comment`, comment);



//User api
export const signUp = (newUser:any) => API.post(`/user/signUp`, newUser);
export const signIn = (user:any) => API.post(`/user/signIn`, user);
export const confirmEmail = (token:any) => API.get(`/user/confirmEmail/${token}`);
export const forgotPassword = (userEmail:any) => API.post('user/forgotPassword', userEmail);
export const resetPassword = (userData:any) => API.post('user/resetPassword', userData);


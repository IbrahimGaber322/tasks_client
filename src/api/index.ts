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

export const fetchTasks = (page:any, sort:string) => API.get(`/tasks/?page=${page}&sort=${sort}`); 
export const fetchTask = (id:any) => API.get(`/tasks/${id}`); 
export const fetchTasksBySearch = (search:any,page:any,sort:string) => API.get(`/tasks/search/search?searchQuery=${search.searchQuery}&searchTags=${search.searchTags}&page=${page}&sort=${sort}`); 
export const createTask = (newTask:any) => API.post("/tasks", newTask);
export const updateTask = (id:any, updatedTask:any) => API.patch(`/tasks/${id}`, updatedTask);
export const deleteTask = (id:any) => API.delete(`/tasks/${id}`);
export const deleteComment = (taskId:any,commentId:any) => API.delete(`/tasks/${taskId}/comments/${commentId}`);
export const comment = (comment:any,id:any) => API.patch(`/tasks/${id}/comments`, comment);



//User api
export const signUp = (newUser:any) => API.post(`/users/sign-up`, newUser);
export const signIn = (user:any) => API.post(`/users/sign-in`, user);
export const confirm = (token:any) => API.get(`/users/confirm/${token}`);
export const forget = (userEmail:any) => API.post('users/forget', userEmail);
export const reset = (userData:any) => API.post('users/reset', userData);
export const sendConfirm = (token:any) => API.post('users/send-confirm', token);

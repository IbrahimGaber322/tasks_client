import { FETCH_ALL,FETCH_BY_SEARCH , CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_TASK} from "../constants/actionTypes";
const tasksReducer = (state = {isLoading:true}as{tasks:[];isLoading:boolean;task:{};}, action:any) =>{
    const pL = action?.payload;
    switch(action.type){
        case START_LOADING:
        return {...state, isLoading:true};
        case END_LOADING:
        return {...state, isLoading:false};
        case FETCH_ALL:
        return {...state,task:null, tasks:pL?.tasks, currentPage: pL?.currentPage, numberOfPages: pL?.numberOfPages, isLoading:false};
        case FETCH_TASK:
        return {...state, task: pL, isLoading:false, currentPage:null};
        case FETCH_BY_SEARCH:
        return {...state, tasks: pL?.tasks, currentPage: pL?.currentPage, numberOfPages: pL?.numberOfPages, isLoading:false};
        case CREATE:
        return {...state, tasks:[...state.tasks, pL]};
        case UPDATE:
        return {...state, task:pL?.creator?pL:state?.task ,tasks:state.tasks.map((task:{_id:string})=> task?._id === pL?._id? pL : task), isLoading:false};
        case DELETE:
        return {...state, tasks:state.tasks.filter((task:{_id:string})=> task?._id !== action.payload)};
        default: 
        return state;
    } 
}

export default tasksReducer;
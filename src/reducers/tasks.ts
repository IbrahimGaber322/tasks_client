// Import action type constants
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_TASK,
} from "../constants/actionTypes";

// Define the types for Comment, Content, and Data
type Comment = {
  creator: string;
  text: string;
  createdAt: Date;
  _id: string;
};

type Content = {
  text: string;
  done: boolean;
};

type Data = {
  createdAt: Date;
  _id: string;
  title: string;
  creator: string;
  content: Content[];
  comments: Comment[];
  name: string;
  dueDate: Date;
  isCompleted: boolean;
};

// Define the initial state for the tasksReducer
const initialState = {
  tasks: [] as Data[],
  isLoading: true as boolean,
  task: {} as Data,
  currentPage: 1 as number,
  numberOfPages: null as number | null,
};

// Define the tasksReducer
const tasksReducer = (state = initialState, action: any) => {
  const pL = action.payload;
  switch (action.type) {
    // Start loading state
    case START_LOADING:
      return { ...state, isLoading: true };
    // End loading state
    case END_LOADING:
      return { ...state, isLoading: false };
    // Fetch all tasks
    case FETCH_ALL:
      return {
        ...state,
        tasks: pL.tasks,
        currentPage: pL.currentPage ? pL.currentPage : 1,
        numberOfPages: pL.numberOfPages,
        isLoading: false,
      };
    // Fetch a single task
    case FETCH_TASK:
      return { ...state, task: pL, isLoading: false };
    // Fetch tasks by search query
    case FETCH_BY_SEARCH:
      return {
        ...state,
        tasks: pL.tasks,
        currentPage: pL.currentPage ? pL.currentPage : 1,
        numberOfPages: pL.numberOfPages,
        isLoading: false,
      };
    // Create a new task
    case CREATE:
      let updatedTasks;

      // Update tasks list with new task while maintaining a limit of 10 tasks
      if (state.tasks.length >= 10) {
        updatedTasks = [pL, ...state.tasks.slice(0, 9)];
        return { ...state, tasks: updatedTasks, numberOfPages: 2 };
      } else {
        // Simply add the new task at the beginning
        updatedTasks = [pL, ...state.tasks];
        return { ...state, tasks: updatedTasks };
      }
    // Update an existing task
    case UPDATE:
      return {
        ...state,
        task: pL.creator ? pL : state.task,
        tasks: state.tasks.map((task) => (task._id === pL._id ? pL : task)),
        isLoading: false,
      };
    // Delete a task
    case DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    // Default case: return current state
    default:
      return state;
  }
};

// Export the tasksReducer
export default tasksReducer;

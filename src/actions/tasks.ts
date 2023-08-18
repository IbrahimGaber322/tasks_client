// Import action type constants and API functions
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  FETCH_TASK,
  SIGNOUT,
} from "../constants/actionTypes";
import * as api from "../api";

// Define types for content and data
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
  comments: Comment[]; // Assuming Comment is a type that is defined elsewhere
  name: string;
  dueDate: Date;
  isCompleted: boolean;
  tags: string[];
};

// Action creator for fetching all tasks
export const fetchTasks: any =
  (page: string, sort: string) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.fetchTasks(page, sort); // Call the fetchTasks API function
      dispatch({ type: FETCH_ALL, payload: data }); // Dispatch action to update state with fetched data
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for fetching a single task
export const fetchTask: any = (id: string) => async (dispatch: Function) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchTask(id); // Call the fetchTask API function
    dispatch({ type: FETCH_TASK, payload: data }); // Dispatch action to update state with fetched task
  } catch (error) {
    console.log(error);
  }
};

// Action creator for fetching tasks by search
export const fetchTasksBySearch: any =
  (search: any, page: any, sort: string) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.fetchTasksBySearch(search, page, sort); // Call the fetchTasksBySearch API function
      dispatch({ type: FETCH_BY_SEARCH, payload: data }); // Dispatch action to update state with fetched data
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for creating a new task
export const createTask: any = (task: Data) => async (dispatch: Function) => {
  try {
    const { data } = await api.createTask(task); // Call the createTask API function
    console.log(data);
    if (data) {
      dispatch({ type: CREATE, payload: data }); // Dispatch action to update state with new task
    } else {
      dispatch({ type: SIGNOUT }); // Dispatch action to sign out if data is not received
    }
  } catch (error) {
    console.log(error);
  }
};

// Action creator for updating a task
export const updateTask: any =
  (id: any, task: any) => async (dispatch: Function) => {
    try {
      const { data } = await api.updateTask(id, task); // Call the updateTask API function
      if (data) {
        dispatch({ type: UPDATE, payload: data }); // Dispatch action to update state with updated task
      } else {
        dispatch({ type: SIGNOUT }); // Dispatch action to sign out if data is not received
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for deleting a task
export const deleteTask: any =
  (id: any, navigate: Function) => async (dispatch: Function) => {
    try {
      const { data } = await api.deleteTask(id); // Call the deleteTask API function
      if (data) {
        dispatch({ type: DELETE, payload: id }); // Dispatch action to update state and delete task
        navigate("/"); // Navigate to the specified page after successful deletion
      } else {
        dispatch({ type: SIGNOUT }); // Dispatch action to sign out if data is not received
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for deleting a comment
export const deleteComment: any =
  (taskId: any, commentId: any) => async (dispatch: Function) => {
    try {
      const { data } = await api.deleteComment(taskId, commentId); // Call the deleteComment API function
      if (data) {
        dispatch({ type: UPDATE, payload: data }); // Dispatch action to update state with modified data
      } else {
        dispatch({ type: SIGNOUT }); // Dispatch action to sign out if data is not received
      }
    } catch (error) {
      console.log(error);
    }
  };

// Action creator for adding a comment
export const comment: any =
  (comment: string, id: string) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.comment(comment, id); // Call the comment API function
      if (data) {
        dispatch({ type: UPDATE, payload: data }); // Dispatch action to update state with modified data
      } else {
        dispatch({ type: SIGNOUT }); // Dispatch action to sign out if data is not received
      }
    } catch (error) {
      console.log(error);
    }
  };

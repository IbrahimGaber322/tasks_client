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

type Content = {
  text:string;
  done:boolean;
}

type Data = {
  title:string;
  creator:string;
  content: Content[];
};


export const fetchTasks:any = (page: string) => async (dispatch: Function) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchTasks(page);
    dispatch({ type: FETCH_ALL, payload: data });
    console.log(`fetchtasks action ${data.tasks[0].title}`)
  } catch (error) {
    console.log(error);
  }
};

export const fetchTask:any = (id:string) => async (dispatch: Function) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchTask(id);
    dispatch({ type: FETCH_TASK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTasksBySearch:any =
  (search: any, page: any) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.fetchTasksBySearch(search, page);
      dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


export const createTask:any = (task: Data) => async (dispatch: Function) => {
  try {
    const { data } = await api.createTask(task);
    console.log(data);
    if (data) {
      dispatch({ type: CREATE, payload: data });
    } else {
      dispatch({ type: SIGNOUT });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask:any =
  (id: any, task: any) => async (dispatch: Function) => {
    try {
      const { data } = await api.updateTask(id, task);
      if (data === "Unauthinticated") {
        dispatch({ type: SIGNOUT });
      } else {
        dispatch({ type: UPDATE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteTask = (id: any) => async (dispatch: Function) => {
  try {
    const { data } = await api.deleteTask(id);
    if (data === "Unauthinticated") {
      dispatch({ type: SIGNOUT });
    } else {
      dispatch({ type: DELETE, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment =
  (postId: any, commentId: any) => async (dispatch:Function) => {
    try {
      const { data } = await api.deleteComment(postId, commentId);
      if (data === "Unauthinticated") {
        dispatch({ type: SIGNOUT });
      } else {
        dispatch({ type: UPDATE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const comment =
  (comment: any, id: any) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.comment(comment, id);
      if (data === "Unauthinticated") {
        dispatch({ type: SIGNOUT });
      } else {
        dispatch({ type: UPDATE, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

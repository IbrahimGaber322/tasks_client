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

export const getTasks = (page: any) => async (dispatch: Function) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchTasks(page);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTask = (id:any) => async (dispatch: Function) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchTask(id);
    dispatch({ type: FETCH_TASK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getTasksBySearch =
  (search: any, page: any) => async (dispatch: Function) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await api.getTasksBySearch(search, page);
      dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const createTask = (task: any) => async (dispatch: Function) => {
  try {
    const { data } = await api.createTask(task);

    if (data === "Unauthinticated") {
      dispatch({ type: SIGNOUT });
    } else {
      dispatch({ type: CREATE, payload: data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePost =
  (id: any, post: any) => async (dispatch: Function) => {
    try {
      const { data } = await api.updateTask(id, post);
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

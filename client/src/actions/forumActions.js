import axios from "axios";

import {
  ADD_FORUM,
  FORUM_LOADING,
  GET_FORUMS,
  DELETE_FORUM,
  GET_FORUM,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "./types";

// Add Forum
export const addForum = (forumData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/forums", forumData)
    .then((res) =>
      dispatch({
        type: ADD_FORUM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// GET Forum
export const getForum = (id) => (dispatch) => {
  dispatch(setForumLoading());
  axios
    .get(`/api/forums/${id}`)
    .then((res) =>
      dispatch({
        type: GET_FORUM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FORUM,
        payload: null,
      })
    );
};

// GET Forums
export const getForums = () => (dispatch) => {
  dispatch(setForumLoading());
  axios
    .get("/api/forums")
    .then((res) =>
      dispatch({
        type: GET_FORUMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FORUMS,
        payload: null,
      })
    );
};

//Delete Forum
export const deleteForum = (id) => (dispatch) => {
  axios
    .delete(`/api/forums/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_FORUM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Add Vote
export const addVote = (id) => (dispatch) => {
  axios
    .post(`/api/forums/vote/${id}`)
    .then((res) => dispatch(getForums()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Remove like
export const removeVote = (id) => (dispatch) => {
  axios
    .post(`/api/forums/unvote/${id}`)
    .then((res) => dispatch(getForums()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Add Thread
export const addThread = (forumId, threadData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/forums/thread/${forumId}`, threadData)
    .then((res) =>
      dispatch({
        type: GET_FORUM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Delete Thread
export const deleteThread = (forumId, threadId) => (dispatch) => {
  axios
    .delete(`/api/forums/thread/${forumId}/${threadId}`)
    .then((res) =>
      dispatch({
        type: GET_FORUM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Set loading state
export const setForumLoading = () => {
  return {
    type: FORUM_LOADING,
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

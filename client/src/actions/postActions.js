import axios from "axios";

import {
  GET_ERRORS,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  CLEAR_ERRORS,
} from "./types";

// GET Post
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/blog/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

// GET Posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/blog")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

//Delete Post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/blog/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
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
//Add like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/blog/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Remove like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/blog/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Add Comment
export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/blog/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
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
//Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/blog/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
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
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

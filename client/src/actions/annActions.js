import axios from "axios";

import {
  ANN_LOADING,
  GET_ANNS,
  DELETE_ANN,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "./types";

// Add Ann
export const addAnn = (annData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/announcement", annData)
    .then((res) => history.push("/announcement"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// GET Anns
export const getAnns = () => (dispatch) => {
  dispatch(setAnnLoading());
  axios
    .get("/api/announcement")
    .then((res) =>
      dispatch({
        type: GET_ANNS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ANNS,
        payload: null,
      })
    );
};

//Delete Post
export const deleteAnn = (id) => (dispatch) => {
  axios
    .delete(`/api/announcement/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ANN,
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

//Set loading state
export const setAnnLoading = () => {
  return {
    type: ANN_LOADING,
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

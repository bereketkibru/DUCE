import axios from "axios";

import {
  ADD_QANDA,
  QANDA_LOADING,
  GET_QANDAS,
  DELETE_QANDA,
  GET_QANDA,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "./types";

// Add Questions
export const addQuestion = (qData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/qandas", qData)
    .then((res) =>
      dispatch({
        type: ADD_QANDA,
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
// GET Question
export const getQanda = (id) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get(`/api/qandas/${id}`)
    .then((res) =>
      dispatch({
        type: GET_QANDA,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_QANDA,
        payload: null,
      })
    );
};

// GET Qandas
export const getQandas = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/qandas")
    .then((res) =>
      dispatch({
        type: GET_QANDAS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_QANDAS,
        payload: null,
      })
    );
};

//Delete Question
export const deleteQanda = (id) => (dispatch) => {
  axios
    .delete(`/api/qandas/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_QANDA,
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
//Lock question
export const lockQuestion = (id) => (dispatch) => {
  axios
    .post(`/api/qandas//lock/${id}`)
    .then((res) => dispatch(getQandas()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add Ansewer
export const addAnswer = (qandaId, answerData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/qandas/answer/${qandaId}`, answerData)
    .then((res) =>
      dispatch({
        type: GET_QANDA,
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
//Delete Answer
export const deleteAnswer = (qandaId, answerId) => (dispatch) => {
  axios
    .delete(`/api/qandas/answer/${qandaId}/${answerId}`)
    .then((res) =>
      dispatch({
        type: GET_QANDA,
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
    type: QANDA_LOADING,
  };
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

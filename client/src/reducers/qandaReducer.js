import {
  ADD_QANDA,
  QANDA_LOADING,
  GET_QANDAS,
  DELETE_QANDA,
  GET_QANDA,
} from "../actions/types";

const initialState = {
  qandas: [],
  qanda: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_QANDA:
      return {
        ...state,
        qandas: [action.payload, ...state.qandas],
      };
    case QANDA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_QANDAS:
      return {
        ...state,
        qandas: action.payload,
        loading: false,
      };
    case GET_QANDA:
      return {
        ...state,
        qanda: action.payload,
        loading: false,
      };
    case DELETE_QANDA:
      return {
        ...state,
        qandas: state.qandas.filter((qanda) => qanda._id !== action.payload),
      };

    default:
      return state;
  }
}

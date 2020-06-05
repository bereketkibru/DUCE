import { ADD_ANN, ANN_LOADING, GET_ANNS, DELETE_ANN } from "../actions/types";

const initialState = {
  anns: [],
  ann: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ANN:
      return {
        ...state,
        anns: [action.payload, ...state.anns],
      };
    case ANN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ANNS:
      return {
        ...state,
        anns: action.payload,
        loading: false,
      };

    case DELETE_ANN:
      return {
        ...state,
        anns: state.anns.filter((ann) => ann._id !== action.payload),
      };

    default:
      return state;
  }
}

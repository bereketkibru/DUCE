import {
  ADD_FORUM,
  FORUM_LOADING,
  GET_FORUMS,
  DELETE_FORUM,
  GET_FORUM,
} from "../actions/types";

const initialState = {
  forums: [],
  forum: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FORUM:
      return {
        ...state,
        forums: [action.payload, ...state.forums],
      };
    case FORUM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FORUMS:
      return {
        ...state,
        forums: action.payload,
        loading: false,
      };
    case GET_FORUM:
      return {
        ...state,
        forum: action.payload,
        loading: false,
      };
    case DELETE_FORUM:
      return {
        ...state,
        forums: state.forums.filter((forum) => forum._id !== action.payload),
      };

    default:
      return state;
  }
}

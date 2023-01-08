import {CHECK_USER_FAIL, CHECK_USER_SUCCESS, LOGOUT, SIGN_IN_FAIL, SIGN_IN_SUCCESS} from "./actionTypes";

const INIT_STATE = {
  userDetails: {},
  loading: true,
  error: {}
};

function userReducer(state = INIT_STATE, action) {
  switch (action.type) {

    case SIGN_IN_SUCCESS:
      localStorage.setItem("user", JSON.stringify({...action.payload}));
      return {
        ...state,
        userDetails: action.payload,
        loading: false
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case CHECK_USER_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        loading: false
      };

    case CHECK_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };

    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        userDetails: {}
      };

    default:
      return state;
  }
}

export default userReducer;
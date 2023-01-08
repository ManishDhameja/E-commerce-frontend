import {
  CHECK_USER_FAIL,
  CHECK_USER_SUCCESS,
  LOGOUT,
  REGISTER,
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS
} from "./actionTypes";

const INIT_STATE = {
  userDetails: {},
  loading: false,
  error: {}
};

function userReducer(state = INIT_STATE, action) {
  switch (action.type) {

    case SIGN_IN:
    case REGISTER:
      return {
        ...state,
        loading: true
      }

    case SIGN_IN_SUCCESS:
      localStorage.setItem("user", JSON.stringify({...action.payload}));
      window.location.replace("/");
      return {
        ...state,
        userDetails: action.payload,
        loading: false
      };

    case SIGN_IN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
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
        error: action.payload,
        loading: false
      };

    case LOGOUT:
      localStorage.removeItem("user");
      window.location.replace("/");
      return {
        ...state,
        userDetails: {},
        loading: false
      };

    default:
      return state;
  }
}

export default userReducer;
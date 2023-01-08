import {ADD_TO_CART, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, HIDE_FEEDBACK} from "./actionTypes";

const INIT_STATE = {
  adding: false,
  showFeedback: false,
  err: {}
};

function cartReducer(state = INIT_STATE, action) {
  switch (action.type) {

    case ADD_TO_CART:
      return {
        ...state,
        adding: true
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        adding: false,
        showFeedback: true
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        err: action.payload
      };

    case HIDE_FEEDBACK:
      return {
        ...state,
        showFeedback: false
      };

    default:
      return state;
  }
}

export default cartReducer;
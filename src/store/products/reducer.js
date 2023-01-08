import {
    UPDATE_CURRENT_PRODUCT_FAIL, UPDATE_CURRENT_PRODUCT_SUCCESS,
    UPDATE_NEW_ARRIVALS_FAIL,
    UPDATE_NEW_ARRIVALS_SUCCESS
  } from "./actionTypes";
  
  const INIT_STATE = {
    new_arrivals: {
      new_arrivals: [],
      loading: true
    },
    current_product: {
      current_product: {},
      loading: true
    },
    error: {}
  };
  
  function productReducer(state = INIT_STATE, action) {
    switch (action.type) {
  
      case UPDATE_NEW_ARRIVALS_SUCCESS:
        return {
          ...state,
          new_arrivals: {
            new_arrivals: action.payload,
            loading: false
          }
        };
  
      case UPDATE_NEW_ARRIVALS_FAIL:
        return {
          ...state,
          error: action.payload
        };
  
      case UPDATE_CURRENT_PRODUCT_SUCCESS:
        return {
          ...state,
          current_product: {
            current_product: action.payload,
            loading: false
          }
        };
  
      case UPDATE_CURRENT_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload
        };
  
      default:
        return state;
    }
  }
  
  export default productReducer;
import {ADD_TO_CART, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, HIDE_FEEDBACK} from "./actionTypes";

export const addToCart = payload => ({
  type: ADD_TO_CART,
  payload,
});

export const addToCartSuccess = () => ({
  type: ADD_TO_CART_SUCCESS,
});

export const addToCartFail = err => ({
  type: ADD_TO_CART_FAIL,
  payload: err
});

export const hideFeedback = () => ({
  type: HIDE_FEEDBACK
});
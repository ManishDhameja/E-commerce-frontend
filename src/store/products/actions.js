import {
    UPDATE_CURRENT_PRODUCT, UPDATE_CURRENT_PRODUCT_FAIL, UPDATE_CURRENT_PRODUCT_SUCCESS,
    UPDATE_NEW_ARRIVALS,
    UPDATE_NEW_ARRIVALS_FAIL,
    UPDATE_NEW_ARRIVALS_SUCCESS
  } from "./actionTypes";
  
  export const updateNewArrivals = () => ({
    type: UPDATE_NEW_ARRIVALS,
  });
  
  export const updateNewArrivalsSuccess = newArrivals => ({
    type: UPDATE_NEW_ARRIVALS_SUCCESS,
    payload: newArrivals
  });
  
  export const updateNewArrivalsFail = error => ({
    type: UPDATE_NEW_ARRIVALS_FAIL,
    payload: error
  });
  
  export const updateCurrentProduct = payload => ({
    type: UPDATE_CURRENT_PRODUCT,
    payload
  });
  
  export const updateCurrentProductSuccess = productDetails => ({
    type: UPDATE_CURRENT_PRODUCT_SUCCESS,
    payload: productDetails
  });
  
  export const updateCurrentProductFail = error => ({
    type: UPDATE_CURRENT_PRODUCT_FAIL,
    payload: error
  });
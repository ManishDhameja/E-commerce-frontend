import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    PLACE_ORDER, PLACE_ORDER_FAIL,
    // PLACE_ORDER_SUCCESS,
    UPDATE_ORDER_HISTORY
  } from "./actionTypes";
  
  export const getOrders = uid => ({
    type: GET_ORDERS,
    payload: uid
  });
  
  export const getOrdersSuccess = orders => ({
    type: GET_ORDERS_SUCCESS,
    payload: orders
  });
  
  export const getOrdersFail = err => ({
    type: GET_ORDERS_FAIL,
    payload: err
  });
  
  export const updateOrderHistory = payload => ({
    type: UPDATE_ORDER_HISTORY,
    payload
  });
  
  export const placeOrder = payload => ({
    type: PLACE_ORDER,
    payload
  });
  
  // export const placeOrderSuccess = payload => ({
  //   type: PLACE_ORDER_SUCCESS,
  //   payload
  // })
  
  export const placeOrderFail = payload => ({
    type: PLACE_ORDER_FAIL,
    payload
  });
import {GET_ORDERS_FAIL, GET_ORDERS_SUCCESS, PLACE_ORDER, UPDATE_ORDER_HISTORY} from "./actionTypes";

const INIT_STATE = {
  orderHistory: [],
  loading: true,
  processing: false,
  err: {}
}

function orderHistoryReducer(state=INIT_STATE, action) {
  switch (action.type) {

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orderHistory: action.payload,
        loading: false,
      }

    case GET_ORDERS_FAIL:
      return {
        ...state,
        err: action.payload,
        loading: false
      }

    case PLACE_ORDER:
      return {
        ...state,
        processing: true,
      }

    case UPDATE_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
        processing: false
      }

    default:
      return state
  }
}

export default orderHistoryReducer;
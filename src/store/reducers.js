import productReducer from "./products/reducer";
import {combineReducers} from "redux";
import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import orderHistoryReducer from "./orderHistory/reducer";
import notificationReducer from "./notifications/reducer";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  orderHistory: orderHistoryReducer,
  notifications: notificationReducer
});

export default rootReducer;
import axios from "axios";
import {server} from "../App";
import {polo_inflation, VARIANTS} from "../components/ProductDescription/productDescription";

export const placeOrder = async payload => {
  try {
    return await axios
      .post( server + "orders/addOrder", {...payload})
      .then(({ data }) => {
        return true;
      });

  } catch (err) {
    console.log(err);
  }
}

export const fetchOrderHistory = async (uid) => {
  try {
    return await axios
      .get(server + "orders/getAll?uid=" + uid)
      .then(({ data }) => {
        const orders = [];
        data.forEach((item, i) => {
          JSON.parse(item.cart).forEach((itm, i) => {
            orders.push(itm);
          });
        });
        return orders;
      });
  } catch (err) {
    console.log(err);
  }
}

export const addToCart = async (details) => {
  const {uid, pid, qty, color, size, variant} = details;
  if (
    localStorage.getItem("cart_" + uid) === null
  ) {
    let cart = [];
    return await axios
      .get(server + "product/findById?pid=" + pid)
      .then(({data}) => {
        const [item] = data;
        delete item.colors;
        delete item.sizes;
        delete item._id;

        item.id = 0;
        item.quantity = qty;
        item.color = color;
        item.size = size;
        item.variant = variant;

        if (variant === VARIANTS.POLO) {
          item.price += polo_inflation;
        }

        item.total = qty * item.price;

        cart.push(item);
        localStorage.setItem(
          "cart_" + uid,
          JSON.stringify(cart)
        );
        return true;
      });
  } else {
    const cart = JSON.parse(
      localStorage.getItem("cart_" + uid)
    );
    return await axios
      .get(
        server + "product/findById?pid=" +
        pid
      )
      .then(({data}) => {
        const [item] = data;
        delete item.colors;
        delete item.sizes;
        delete item._id;

        item.id = cart.length;
        item.quantity = qty;
        item.color = color;
        item.size = size;
        item.variant = variant;

        if (variant === VARIANTS.POLO) {
          item.price += polo_inflation;
        }

        item.total = qty * item.price;

        cart.push(item);
        localStorage.setItem(
          "cart_" + uid,
          JSON.stringify(cart)
        );
        return true;
      });
  }
};

export const findProductById = async (pid) => {
  try {
    return await axios
      .get(server + "product/findById?pid=" + pid)
      .then(({data}) => data[0]);
  } catch (error) {
    if (error) {
      console.log("Cannot fetch products: ");
      console.error(error);
      throw error;
    }
  }
};

export const fetchProducts = async () => {
  try {
    return await axios.get(server + "product/getAll").then(({data}) => data);
  } catch (error) {
    if (error) {
      console.log("Cannot fetch products: ");
      console.error(error);
      throw error;
    }
  }
};

export const signIn = async (formdata) => {
  try {
    return await axios
      .post(server + "auth/signin", formdata)
      .then(({data}) => {
        return {status: 'success', ...data};
      });
  } catch (error) {
    if (error) {
      console.log("Unable to reach server: ");
      return {status: "failed", ...error};
    }
  }
};

export const register = async (formdata) => {
  try {
    return await axios
      .post(server + "auth/signup", formdata)
      .then(({data}) => {
        return data;
      });
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const checkIfUserDetailsExist = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    if (error) {
      console.log("Unable to reach server ");
      console.error(error);
      throw error;
    }
  }
};
import MainSection from "./components/MainSection/mainSection";
import { Box } from "@mui/material";
import "./App.css";
import NewArrivals from "./components/NewArrivals/newArrivals";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Header from "./components/Header/header";
import Cart from "./components/Cart/cart";
import Footer from "./components/Footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {checkUser} from "./store/actions";
import { useDispatch } from "react-redux";
import {updateNewArrivals} from "./store/actions";
import ProductDescription from "./components/ProductDescription/productDescription";
import OrderConfirmed from "./components/OrderConfirmed/orderConfirmed";
import OrderHistory from "./components/OrderHistory/orderHistory";
import ConfirmOrder from "./components/ConfirmOrder/confirmOrder";
import NotificationContainer from "./components/Notifications/notification";


const Home = () => (
  <>
    <MainSection />
    <NewArrivals />
  </>
);

export const server = 'http://localhost:8000/'; 

function App() {
  const [transparent, setTransparent] = useState(true);
  const { pathname } = useLocation();
  const dispatch_action = useDispatch();

  useEffect(() => {
    function handleHeader() {
      if (pathname === "/" && window.scrollY < 100) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    }
    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    }

  }, [pathname, dispatch_action]);

  useEffect(() => {
    dispatch_action(updateNewArrivals())
    dispatch_action(checkUser());
  }, [dispatch_action])

  return (
    <Box>
      <Header transparentBg={transparent} />
      <Box sx={{minHeight: "100vh"}} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buynow/:pid" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmOrder/:cart" element={<ConfirmOrder />} />
        <Route path="/orderConfirmed" element={<OrderConfirmed />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
      </Routes>
      <NotificationContainer />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
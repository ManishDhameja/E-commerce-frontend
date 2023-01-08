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

const Home = () => (
  <>
    <MainSection />
    <NewArrivals />
    <Footer />
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
    dispatch_action(checkUser());
  }, [dispatch_action])

  return (
    <Box>
      <Header transparentBg={transparent} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Box>
  );
}

export default App;
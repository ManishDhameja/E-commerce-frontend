import MainSection from "./components/MainSection";
import "./App.css";
import NewArrivals from "./components/NewArrivals";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => (
  <>
    <Header />
    <MainSection />
    <NewArrivals />
    <Footer />
  </>
);

export const server = 'http://localhost:8000/'; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  );
}

export default App;
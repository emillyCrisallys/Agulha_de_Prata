import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RegisterForm from "./pages/Cadastro";
import Cart from "./pages/Cart";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Cadastro" element={<RegisterForm />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
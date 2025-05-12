import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RegisterForm from "./pages/Cadastro";
import Cart from "./pages/Cart";
//import About from './pages/About'; // Importe o componente da página Sobre
//import Contact from './pages/Contact.tsx'; // Importe o componente da página Contato
//import Cart from './pages/Cart';

import { CartProvider } from "./pages/Cart";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Cadastro" element={<RegisterForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;

// <style>
//   {`

//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

//     body {
//       font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//     }
//   `}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import RegisterForm  from './pages/Cadastro'
//import About from './pages/About'; // Importe o componente da página Sobre
//import Contact from './pages/Contact.tsx'; // Importe o componente da página Contato
//import Cart from './pages/Cart';

const App: React.FC = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      </style>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Cadastro" element={<RegisterForm />} />
          <Route path="/Home" element={<Home />} />
         {/* <Route path="/about" element={<About />} /> {/* Rota da página Sobre */}
       {/*} <Route path="/contact" element={<Contact />} /> {/* Rota da página Contato */}
        {/*<Route path="/cart" element={<Cart />} /> {/* Rota do carrinho */}
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Router>
    </>
  );
};

export default App;

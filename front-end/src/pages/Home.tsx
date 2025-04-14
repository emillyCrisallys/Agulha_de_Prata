import React, { useEffect, useState } from "react";
import api from "../utils/api"; // Ajuste o caminho conforme necessário
import "../styles/HomeLay.css";
import logo from "../img/Logo_site.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error(
            "Erro: Dados recebidos não são uma lista de produtos.",
            response.data
          );
          setProducts([]);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao buscar produtos. Tente novamente mais tarde.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <a href="/Home">Home</a>
          <a href="/Contact">Contato</a>
          <a href="/About">Sobre</a>
          <a href="/Cart">
            <img
              src="/src/img/carrinho.png"
              alt="Carrinho"
              className="cart-icon"
            />
          </a>
        </div>
      </nav>
      
      <h1>Bem-vindo à melhor loja de Vinil do ano!</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button>Comprar</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível no momento.</p>
        )}
      </div>
    </main>
  );
};

export default Home;

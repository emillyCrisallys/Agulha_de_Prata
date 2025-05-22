import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Cart.css";

interface Product {
  id: number;
  userId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartReturn {
  id: number;
  userId: number;
  ProductModel: Product;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const idLocalStorage = localStorage.getItem("userId");

        const { data } = await api.get(`/cart/${idLocalStorage}`); // Recebe todos os dados do backend

        // Obtém o userId do localStorage

        if (!idLocalStorage) {
          setError("Você precisa estar logado para acessar o carrinho.");
          return;
        }

        // Filtra os produtos do carrinho com base no userId
        // const filteredCart = data.filter(async (product: Product) => {
        //   if (product.userId === parseInt(idLocalStorage, 10)) {
        //     return await api.get(`/product/${product.userId}`);
        //   }
        // });

        setCart(data.map((product: CartReturn) => product.ProductModel)); // Atualiza o estado com os produtos filtrados
        console.log("retorno da busca do cart by userid", data);
      } catch (error) {
        console.error("Erro ao buscar produtos do carrinho:", error);
        setError(
          "Erro ao buscar produtos do carrinho. Tente novamente mais tarde."
        );
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (id: number) => {
    try {
      await api.delete(`/cart/${id}`);
      setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Erro ao remover produto do carrinho:", err);
      alert("Erro ao remover produto do carrinho. Tente novamente mais tarde.");
    }
  };

  const handleIncreaseQuantity = async (id: number) => {
    try {
      await api.put(`/cart/increase/${id}`);
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } catch (err) {
      console.error("Erro ao aumentar a quantidade do produto:", err);
      alert("Erro ao aumentar a quantidade. Tente novamente mais tarde.");
    }
  };

  const handleDecreaseQuantity = async (id: number) => {
    try {
      await api.put(`/cart/decrease/${id}`);
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === id && product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    } catch (err) {
      console.error("Erro ao diminuir a quantidade do produto:", err);
      alert("Erro ao diminuir a quantidade. Tente novamente mais tarde.");
    }
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Carrinho de Compras</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div
              key={product.id}
              id={String(product.userId)}
              className="cart-item"
            >
              <img src={product.image} alt={product.name} />
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p>R${product.price}</p>
                <p>Quantidade: {product.quantity}</p>
                <div className="quantity">
                  <button onClick={() => handleIncreaseQuantity(product.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecreaseQuantity(product.id)}>
                    -
                  </button>
                </div>
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: R${getCartTotal()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

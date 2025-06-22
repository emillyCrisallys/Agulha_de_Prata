import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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
  quantity: number;
  ProductModel: Product;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const idLocalStorage = localStorage.getItem("userId");

        const { data } = await api.get(`/cart/${idLocalStorage}`);
        console.log("Dados retornados pelo backend:", data);

        if (!idLocalStorage) {
          setError("Você precisa estar logado para acessar o carrinho.");
          return;
        }

        // Mapeia os dados para garantir que quantity seja inicializado
        const mappedCart = data.map((item: CartReturn) => ({
          id: item.id,
          userId: item.userId,
          name: item.ProductModel.name,
          price: item.ProductModel.price,
          image: item.ProductModel.image,
          quantity: item.quantity || 0,
        }));

        setCart(mappedCart);
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

  const incrementQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const getCartTotal = () => {
    return cart
      .reduce(
        (total, product) => total + Number(product.price) * product.quantity,
        0
      )
      .toFixed(2);
  };
  console.log("Dados do carrinho:", cart);

  return (
    <div className="cart">
      {/* Seta para voltar */}
      <Link to="/home" className="back-home">
        <FaArrowLeft /> Voltar para Home{" "}
      </Link>

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
                <div className="quantity">
                  <button
                    className="quantity-button"
                    onClick={() => incrementQuantity(product.id)}
                  >
                    +
                  </button>
                  <button
                    className="quantity-button"
                    onClick={() => decrementQuantity(product.id)}
                  >
                    -
                  </button>

                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remover
                  </button>
                </div>

                <p> {product.quantity}.Unid</p>
                <p>R${Number(product.price).toFixed(2)}</p>
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

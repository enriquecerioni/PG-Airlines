import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const productosLocalStorage = localStorage.getItem("cartProducts");
      return productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
    console.log(products);
    // const cartProductArray = localStorage.getItem("cartProducts");
  }, [products]);

  const addProductToCart = (product) => {
    const inCart = products.find((p) => p.id === product.id);

    //console.log("inCart: ", inCart);
    if (inCart) {
      setProducts(
        products.map((p) => {
          if (p.id === product.id) {
            return { ...inCart, amount: inCart.amount + 1 };
          } else return p;
        })
      );
    } else {
      setProducts((products) => [...products, { ...product, amount: 1 }]);
    }
  };

  const deleteProductCart = (product) => {
    const inCart = products.find((p) => p.id === product.id);

    if (inCart.amount === 1) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
    if (inCart.amount > 1) {
      setProducts(
        products.map((p) => {
          if (p.id === product.id) {
            return { ...inCart, amount: inCart.amount - 1 };
          }
          return p;
        })
      );
    }

  };

  return (
    <CartContext.Provider
      value={{ addProductToCart, deleteProductCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

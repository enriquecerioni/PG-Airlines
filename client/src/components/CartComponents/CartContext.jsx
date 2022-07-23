import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // console.log(children)
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
    // console.log(products)
    // const cartProductArray = localStorage.getItem("cartProducts");
  }, [products]);

  const addProductToCart = ({id, origin, price, logo, airline, arrivalHour, departureHour}) => {
    let inCart = products && products.filter((p) => p.id === id);
    // console.log(inCart)

    if (inCart.length > 0) {
      setProducts(
        products.map((p) => {
          if (p.id === id) {
            return { ...p, amount: p.amount + 1 };
          } else return p;
        })
      );
    } else {      
      setProducts( [...products, { id, origin, price, logo, airline, arrivalHour, departureHour, amount: 1}] )
    }
  };

  const substractdProductFromCart = ({id}) => {
    let inCart = products && products.filter((p) => p.id === id);

    if (inCart.length > 0) {
      setProducts(
        products.map((p) => {
          if (p.id === id && p.amount > 1) {
            return { ...p, amount: p.amount - 1 };
          } else return p;
        })
      );
    } 
  };

  const deleteProductFromCart = ({id}) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ addProductToCart, substractdProductFromCart, deleteProductFromCart, products }}
    >
      {children}
    </CartContext.Provider>
  );
}; 

export default CartProvider;

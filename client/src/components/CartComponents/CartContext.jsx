import { createContext, useEffect, useState } from "react";
import { addToCart } from "../../redux/actions";
import {store} from '../../redux/store/index'

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

  const addProductToCart = async ({id, origin, price, logo, airline, arrivalHour, departureHour}) => {

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
      await store.dispatch(addToCart({id,origin,price,logo,airline,arrivalHour,departureHour,amount: 1}))
    }
  };

  function substractdProductFromCart (id)  {
    
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

  function deleteProductFromCart  (id)  {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ addProductToCart,substractdProductFromCart,products,deleteProductFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}; 

export default CartProvider;

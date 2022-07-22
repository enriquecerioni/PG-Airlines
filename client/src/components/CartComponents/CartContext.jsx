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
    console.log(localStorage)
    console.log(products)
    // console.log(products.products[0].product);

    // const cartProductArray = localStorage.getItem("cartProducts");
  }, [products]);

  const addProductToCart = (logo, airline, id) => {
    console.log(products)
    console.log((products.length))
    // const inCart = products.products.find((p) => p.id === product.id);
    // const inCart = products.map(p=>p)
    //console.log(inCart)

    //console.log("inCart: ", inCart);
    //this always adds amount +1 because the ID remains the same, without changing the array or adding any more items
    if (false) {
      setProducts(
        products.map((p) => {
          if (p.id === id) {
            // return { ...inCart, amount: inCart.amount + 1 };
          } else return p;
        })
      );
    } else {      
      setProducts( [...products, { logo, airline, id, amount: 1}] )
    }
  };

  // const deleteProductCart = (product) => {
  //   const inCart = products.find((p) => p.id === product.id);

  //   if (inCart.amount === 1) {
  //     setProducts(products.filter((p) => p.id !== product.id));
  //   }
  //   if (inCart.amount > 1) {
  //     setProducts(
  //       products.map((p) => {
  //         if (p.id === product.id) {
  //           return { ...inCart, amount: inCart.amount - 1 };
  //         }
  //         return p;
  //       })
  //     );
  //   }
  // };

  return (
    <CartContext.Provider
      value={{ addProductToCart, /*deleteProductCart*/ }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

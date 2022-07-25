import { createContext, useEffect, useState } from "react";
import { addToCart } from "../../redux/actions";
import {store} from '../../redux/store/index'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  // console.log(children)
  const [pay,setPay] =useState(false);

  const [products, setProducts] = useState(() => {
    try {
      const productosLocalStorage = localStorage.getItem("cartProducts");
      return productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
    } catch (error) {
      return [];
    

  }
});

  // useEffect(()=>{
  //   console.log(pay)
  //   if(pay){
  //     setProducts([])
  //     localStorage.setItem("cartProducts" ,JSON.stringify([]))
  //   }
  //   },[pay])

  useEffect(() => {
    console.log("sera este el problema",products)
    if(!pay)localStorage.setItem("cartProducts", JSON.stringify(products))
    setPay(false)
    if(pay && products!==[]){
      setTimeout(() => {
        setProducts([])
      }, "1500")
      
    }
    // else localStorage.setItem("cartProducts", JSON.stringify([]))
    
  
    // console.log(products)
    // const cartProductArray = localStorage.getItem("cartProducts");
  }, [products]);


  const addProductToCart = async ({id, origin, price, logo, airline, arrivalHour, departureHour,stock}) => {
    //console.log("productos actuales",products.id)
    //console.log(products)
    let inCart = products && products.filter((p) => p.id === id);
    //console.log(inCart)

    if (inCart.length > 0) {
      setProducts(
        products.map((p) => {
          if (p.id === id) {
            return { ...p, 
              amount: p.amount + 1 };
          } else return p;
        })
      );
    } else {      
      setProducts( [...products, { id, origin, price, logo, airline, arrivalHour, departureHour,stock, amount: 1}] )
      await store.dispatch(addToCart({id,origin,price,logo,airline,arrivalHour,departureHour,stock,amount: 1}))
    }
  };

  function substractdProductFromCart (id, operacion)  {
    // let inCart = products && products.filter((p) => p.id === id);
// p.id === id 


      setProducts(
        products.map((p) => {
         
          if(p.id === id && p.amount > 1 && operacion === 'resta') {
           
            return { 
              ...p, 
              amount: p.amount - 1 
            };
          } else if(p.id === id && operacion === 'suma') {
            if (p.stock > p.amount) {
              console.log("este es tu stock",p.stock)
            return { 
              ...p, 
              amount: p.amount + 1 
            }} else 
            {alert("no flaco no tenes stock");
            return p
          }
          } else {
            return p;
          }
        })
      )
      localStorage.removeItem("cartProducts")
  };

  function deleteProductFromCart  (id)  {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ addProductToCart, substractdProductFromCart, products, setProducts, deleteProductFromCart ,setPay}}
    >
      {children}
    </CartContext.Provider>
  );
}; 

export default CartProvider;

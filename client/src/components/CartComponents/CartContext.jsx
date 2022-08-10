import { createContext, useEffect, useState } from "react";
import { addToCart } from "../../redux/actions";
import { store } from "../../redux/store/index";
import Swal from "sweetalert2";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // console.log(children)
  const [pay, setPay] = useState(false);

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
    // console.log("sera este el problema",products)
    if (!pay) localStorage.setItem("cartProducts", JSON.stringify(products));
    setPay(false);
    if (pay && products !== []) {
      setTimeout(() => {
        setProducts([]);
      }, "3000");
    }
    // else localStorage.setItem("cartProducts", JSON.stringify([]))

    // console.log(products)
    // const cartProductArray = localStorage.getItem("cartProducts");
  }, [products, pay]);

  const addProductToCart = async ({
    id,
    airlineId,
    origin,
    price,
    logo,
    arrivalHour,
    departureHour,
    tickets,
    destination,
  }) => {
   // console.log("tickets", tickets);
    //console.log("esto es el products", products); //
    let inCart = Array.isArray(products) && products.filter((p) => p.id === id);
    //console.log(inCart)

    if (inCart.length > 0) {
      setProducts(
        products.map((p) => {
          if (p.id === id) {
            if (p.tickets > p.amount) {

              return { ...p, amount: p.amount + 1 };
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can't buy more tickets, there's not enough in stock " + p.amount,
              })
              return{
                ...p,
              }
            }
          } else return {
            ...p,
          }
        })
      );
    } else {
      setProducts([
        ...products,
        {
          id,
          airlineId,
          origin,
          price,
          logo,
          arrivalHour,
          departureHour,
          tickets,
          destination,
          amount: 1,
        },
      ]);
      await store.dispatch(
        addToCart({
          id,
          airlineId,
          origin,
          price,
          logo,
          arrivalHour,
          departureHour,
          tickets,
          destination,
          amount: 1,
        })
      );
    }
  };


  function substractdProductFromCart(id, operacion) {
    // let inCart = products && products.filter((p) => p.id === id);
    // p.id === id

    setProducts(
      products.map((p) => {
        if (p.id === id && p.amount > 1 && operacion === "resta") {
          return {
            ...p,
            amount: p.amount - 1,
          };
        } else if (p.id === id && operacion === "suma") {
          if (p.tickets > p.amount) {
            console.log("este es tu stock", p.tickets);
            return {
              ...p,
              amount: p.amount + 1,
            };
          } else {
            Swal.fire({
              icon: "error",
              title: "Opps...",
              text: "No stock available",
              confirmButtonColor: "#3085d6",
            })
            return {
              ...p,
            }
          }
        } else {
          return {
            ...p,
          }
        }
      })
    );
    localStorage.removeItem("cartProducts");
  }

  function deleteProductFromCart(id) {
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        substractdProductFromCart,
        products,
        setProducts,
        deleteProductFromCart,
        setPay,
      }}
    >
      {children}
    </CartContext.Provider>
  );
    }
export default CartProvider;

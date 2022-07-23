import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };
  const totalAmount = cart.reduce(addition, 0);

  return (
    <div className="cartcontainer">
      <Link to="/">
        <button>Go to home</button>
      </Link>
      <div className="cart">
        {cart.map((item) => {
          return (
            <div className="cartcad" key={item.id}>
              <div>
                
                <img src={item.image} alt="cart" />
                <h4>{item.origin}</h4>
                <p> price: $ {item.price}</p>
                <p>amount : ${item.price * item.quantity}</p>
                <button
                  onClick={() => dispatch({ type: "REMOVE", payload: item })}
                >
                  Remove
                </button>
              </div>
              <div>
                <button
                  onClick={() => dispatch({ type: "INCREASE", payload: item })}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      dispatch({ type: "DECREASE", payload: item });
                    } else {
                      dispatch({ type: "REMOVE", payload: item });
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {totalAmount > 0 && <h2>total:{totalAmount}</h2>}
    </div>
  );
  
};

export default Cart;

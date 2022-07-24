import React, { useState, useEffect } from 'react'
import style from './styles/Ticket.module.css'
import css from './styles/Cart.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './CartComponents/CartContext'
import { deleteFromCart } from '../redux/actions/index'
import { useDispatch } from 'react-redux'

function Cart() {
  //  const cart = useSelector(state => console.log(state.shoppingCart))
    
  const dispatch = useDispatch()

    const { products, addProductToCart, substractdProductFromCart , deleteProductFromCart} = useContext(CartContext)
   // console.log(products)

    // useEffect(() => {
    //   // localStorage.setItem("cartProducts", JSON.stringify(products));
    //   // console.log(products)
  
    //   localStorage.getItem("cartProducts");
    // }, [products]);
    
    // function removeItem(i) {
    //     let data = [...cart]
    //     data.splice(i, 1);
    //     dispatch(deleteFromCart(data));
    //   }  
  function handleDelete(id){
    console.log(id)
    dispatch(deleteFromCart(id));
    deleteProductFromCart(id);
  }

  function handleSum(id) {
    substractdProductFromCart(id, 'suma')
    // console.log('no llego')
  }

  function handleRest(id) {
    // console.log('no llego')
    substractdProductFromCart(id, 'resta')
  }

  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    if (products.length>0) {
      setSubTotal(products.map(p => p.price * p.amount).reduce((previousValue, currentValue) => previousValue + currentValue))            
    }    
  }, [handleSum, handleRest])

    return (
        <div className={css.cart_container}>
            <Link to='/'>
            Keep shopping
            </Link>
            { products.length ? 
            products.map(c => {
              return (<div className={style.cards} key={c.id}>
                <li className={style.cards_item}>
                <div className={style.card}>
                    <div className="card_image"><img src={c.logo} alt='#' width='100px' height='100px'/></div>
                    <div className={style.card_content}>
                    <h2 className={style.card_title}>{c.airline}</h2>
                    <h5>Origin: {c.origin} | Destination: {c.destination} </h5>
                    <p className="card_text">{c.departureHour} / {c.arrivalHour}</p>
                    </div>
                    <div>
                    <p className={style.card_text}>${c.price} | price | price</p>
                    <Link to={`/ticket/${c.id}`} >
                      <button className={style.btn}>View Deal</button> 
                    </Link>
                    </div>
                    <button onClick={()=>handleDelete(c.id)}>X</button>
                </div>
                <span>{c.amount}</span>
                </li>
                <div>
                  <button onClick={() => handleSum(c.id)}>+</button>
                    {c.amount}
                  <button onClick={() => handleRest(c.id)}>-</button>
                </div>
                {/* <button onClick={removeItem}>DELETE</button> */}

            </div>)      
            })
            :
            <h1>Add tickets to your cart!</h1>
            }     
            
            <div>
                <h1>Order Summary</h1>
                <h5>Subtotal</h5><span> $ {subTotal}</span>
                <h5>Fees</h5><span>fees</span>
                <h5>Total</h5><span>subtotal + fees</span>
            </div>          
        </div>
      )
}

export default Cart
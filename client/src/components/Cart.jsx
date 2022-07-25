import React, { useState, useEffect } from 'react'
import style from './styles/Ticket.module.css'
import css from './styles/Cart.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './CartComponents/CartContext'
import { deleteFromCart } from '../redux/actions/index'
import { useDispatch } from 'react-redux'


import firebase from 'firebase'

function Cart() {
  //  const cart = useSelector(state => console.log(state.shoppingCart))

  const history = useHistory()  
  const dispatch = useDispatch()

    const { products, addProductToCart, substractdProductFromCart , deleteProductFromCart} = useContext(CartContext)
    const [subTotal, setSubTotal] = useState(0)

    // console.log(products)

    // useEffect(() => {
    //   // localStorage.setItem("cartProducts", JSON.stringify(products));
    //   // console.log(products)
  
    //   localStorage.getItem("cartProducts");
    // }, [products]);
    
  function handleDelete(id){
    // console.log(id)
    let productToDelete= products.filter((p)=>p.id===id)
    setSubTotal(subTotal-productToDelete[0].amount*productToDelete[0].price)
    dispatch(deleteFromCart(id));
    deleteProductFromCart(id);
    
  }

  function handleSum(id) {
    substractdProductFromCart(id, 'suma')
  }

  function handleRest(id) {
    substractdProductFromCart(id, 'resta')
  }


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
                    <p className={style.card_text}>${c.price}</p>
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

            </div>)      
            })
            :
            <h1>Add tickets to your cart!</h1>
            }     
            

          {subTotal && <div>
                <h1>Order Summary</h1>
                <h5>Subtotal</h5>{ subTotal && <span>${subTotal}</span>}
                <h5>Fees</h5>{ subTotal && <span>${(subTotal*0.1)/100}</span>} 
                <h5>Total</h5>{subTotal && <span>${(subTotal + ((subTotal*0.1)/100))}</span>}
               <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
             </div>    
          }    
          
        </div>
      )
}

export default Cart
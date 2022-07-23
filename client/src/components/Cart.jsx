import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/Ticket.module.css'
import css from './styles/Cart.module.css'
import { Link } from 'react-router-dom'
import { deleteFromCart } from '../redux/actions/index'
import {useContext} from 'react'
import { CartContext } from './CartComponents/CartContext'

function Cart() {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.shoppingCart)
    // console.log(cart)

    const { products } = useContext(CartContext)
    console.log(products)

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
                </div>
                </li>
                {/* <button onClick={removeItem}>DELETE</button> */}
            </div>)      
            })
            :
            <h1>Add tickets to your cart!</h1>
            }   
            <div>
                <h1>Order Summary</h1>
                <h5>Subtotal</h5><span>subtotal</span>
                <h5>Fees</h5><span>fees</span>
                <h5>Total</h5><span>subtotal + fees</span>
            </div>            
        </div>
      )
}

export default Cart
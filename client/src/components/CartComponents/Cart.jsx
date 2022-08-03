import React, { useState, useEffect } from 'react'
import style from '../styles/Ticket.module.css'
import css from '../styles/Cart.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from './CartContext'
import { deleteFromCart } from '../../redux/actions/index'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { Button, IconButton, Card, CardContent } from '@mui/material';
import vacio from '../styles/assets/test1.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import firebase from 'firebase'

function Cart() {
  //  const cart = useSelector(state => console.log(state.shoppingCart))
  const auth = firebase.auth();
  const history = useHistory()  
  const dispatch = useDispatch()

    const { products, addProductToCart, substractdProductFromCart , deleteProductFromCart} = useContext(CartContext)
    const [subTotal, setSubTotal] = useState(0)
    
  function handleDelete(id){
    // console.log(id)
    let productToDelete= products.filter((p)=>p.id===id)
    setSubTotal(subTotal-productToDelete[0].amount*productToDelete[0].price)
    dispatch(deleteFromCart(id));
    deleteProductFromCart(id);
    toast.error("Deleted from cart", {
      icon: "❌",
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

  function handleCheckout(){
    auth.onAuthStateChanged(user=>{
      if(user){
        if(user.emailVerified){
          history.push('/payment')
        }else{
          // alert("You need to verify you email")
          Swal.fire({
          icon: 'question',
          title: 'Oops...',
          text: 'You need to verify you email',
          confirmButtonColor: '#10408F'
        })
          history.push("/")
        }
      }
      else {
        // alert("You need to be logged to buy")
        Swal.fire({
          icon: 'question',
          title: 'Oops...',
          text: 'You need to be logged to buy',
          confirmButtonColor: '#10408F'
        })
        history.push('/login')
      }
    })
  }
 
    return (
        <div className={css.cart_container}>
            <Link to='/'>
              <Button variant="outlined" size="large">Keep shopping</Button>
            </Link>
            { products.length ? 
            products.map(c => {
              return (<div className={css.card} key={c.id}>
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
                    {/* <Link to={`/ticket/${c.id}`} >
                      <button className={style.btn}>View Deal</button> 
                    </Link> */}
                    </div>
                    <IconButton size='large' onClick={()=>handleDelete(c.id)}><DeleteIcon/></IconButton>
                </div>
                </li>
                <div>
                  <Button 
                  onClick={() => handleSum(c.id)}>
                  <AddIcon /></Button>
                    <h5 className={css.amount_display}>{c.amount}</h5>
                  <Button 
                  onClick={() => handleRest(c.id)}>
                    <RemoveIcon /></Button>
                </div>

            </div>)      
            })
            :
            <div className={css.empty_cart}>
              <h1>Your cart is empty</h1>
              <img src={vacio} alt="#" />
              <h1>Add tickets to your cart!</h1>
            </div>
          }     
            
          {subTotal !== 0 && products.length && 
            <Card className={css.payment_container}>
              <div className={css.card_content}>
                <h1>Order Summary</h1>
                <h4>Subtotal</h4>{subTotal !== 0 && <span>${subTotal}</span>}
                <h4>Fees</h4>{subTotal !== 0 && <span>${((subTotal*0.1)/100).toFixed(2)}</span>} 
                <h4>Total</h4>{subTotal !== 0 && <span>${(subTotal + ((subTotal*0.1)/100)).toFixed(2)}</span>}

                <Button 
                variant="contained" 
                color="success" 
                onClick={() => handleCheckout()}>Proceed to Checkout</Button>                     
              </div>
            </Card>    
          }    
          
        </div>
      )
}

export default Cart
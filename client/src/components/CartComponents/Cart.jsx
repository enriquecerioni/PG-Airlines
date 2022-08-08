import React, { useState, useEffect, useContext } from 'react'
import style from '../styles/Ticket.module.css'
import css from '../styles/Cart.module.css'
import { Link, useHistory } from 'react-router-dom'
import { CartContext } from './CartContext'
import { deleteFromCart } from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { Button, IconButton, Card } from '@mui/material';
import vacio from '../styles/assets/test1.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import firebase from 'firebase'
import { darkModeContext } from '../DarkModeContext';

function Cart() {
  const { darkMode } = useContext(darkModeContext)
  const airlines = useSelector((state) => state.airlines);
  // console.log(airlines)
  
  const auth = firebase.auth();
  const history = useHistory()  
  const dispatch = useDispatch()

    const { products, substractdProductFromCart , deleteProductFromCart} = useContext(CartContext)
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
  }, [products])

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
        <div className={darkMode ? css.cart_container_dark : css.cart_container}>
            <Link to='/'>
              <Button variant="outlined" size="large">Keep shopping</Button>
            </Link>
            { products.length ? 
            products.map(c => {
              return (<div className={darkMode ? css.card_dark : css.card} key={c.id}>
                <li className={ darkMode ? style.cards_item_dark : style.cards_item}>
                <div className={ darkMode ? style.card_dark : style.card}>
                    <div className="card_image"><img src={c.logo} alt='#' width='100px' height='100px'/></div>
                    <div className={style.card_content}>

                    {airlines.map((airline) => {
                      if(c.airlineId === airline.id){
                        return <h2 className={darkMode ? style.card_title_dark : style.card_title}>{airline.name}</h2>
                      }
                    })}

                    <h5 className={darkMode ? style.card_desinfo_dark : style.card_desinfo}>Origin: {c.origin} | Destination: {c.destination} </h5>
                    <p className={darkMode ? style.card_text_dark : style.card_text} >{c.departureHour} / {c.arrivalHour}</p>
                    </div>
                    <div>
                    <p className={darkMode ? style.card_text_dark : style.card_text}>${c.price}</p>
                    </div>
                    <IconButton size='large' onClick={()=>handleDelete(c.id)}><DeleteIcon color="primary" /></IconButton>
                </div>
                </li>
                <div>
                  <Button 
                  onClick={() => handleSum(c.id)}>
                  <AddIcon /></Button>
                    <h5 className={ darkMode ? css.amount_display_dark : css.amount_display}>{c.amount}</h5>
                  <Button 
                  onClick={() => handleRest(c.id)}>
                    <RemoveIcon /></Button>
                </div>

            </div>)      
            })
            :
            <div className={ darkMode ? css.empty_cart_dark : css.empty_cart}>
              <h1 className={darkMode ? css.title_dark : css.title}>Your cart is empty</h1>
              <img src={vacio} alt="#" />
              <h1 className={darkMode ? css.title_dark : css.title}>Add tickets to your cart!</h1>
            </div>
          }     
            
          {subTotal !== 0 && products.length && 
            <Card className={ darkMode ? css.payment_container_dark : css.payment_container}>
              <div className={css.card_content}>
                <h1 className={ darkMode ? css.title_summary_dark : css.title_summary} >Order Summary</h1>

                <h4 className={ darkMode ? css.text_summary_dark : css.text_summary}>Subtotal</h4>{subTotal !== 0 && <span className={ darkMode ? css.text_summary_dark : css.text_summary}>${subTotal}</span>}

                <h4 className={ darkMode ? css.text_summary_dark : css.text_summary}>Fees</h4>{subTotal !== 0 && <span className={ darkMode ? css.text_summary_dark : css.text_summary}>${((subTotal*0.1)/100).toFixed(2)}</span>} 
                
                <h4 className={ darkMode ? css.text_summary_dark : css.text_summary}>Total</h4>{subTotal !== 0 && <span className={ darkMode ? css.text_summary_dark : css.text_summary}>${(subTotal + ((subTotal*0.1)/100)).toFixed(2)}</span>}

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
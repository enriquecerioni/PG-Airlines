import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useContext } from 'react'
import { CartContext } from './CartContext'
import style from '../styles/Ticket.module.css'
import css from '../styles/Payment.module.css'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios';
import firebase from 'firebase'
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
// PAYPAL
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// MERCADO PAGO
import MPPayment from './MPPayment'
// CREAR ORDENES
import { createOrder, getAllUsers } from '../../redux/actions/index'

function Payment() {
    const user = useSelector(state => state.currentUser)
    const { products, setProducts ,setPay} = useContext(CartContext)
    // console.log(products)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [errorMsg, setErrorMsg] = useState({
        value: null,
        string: ''
    })

    const [ /*error*/, setError] = useState(null)
    const [ disabled, setDisabled] = useState(true)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState("")
    const [ email, setEmail ] = useState('')

    const [subTotal, setSubTotal] = useState()
    console.log("este es el user de payment", user);
    useEffect(() => {
        dispatch(getAllUsers());
        if(products.length !== 0) setSubTotal(products.map(p => p.price * p.amount).reduce((previousValue, currentValue) => previousValue + currentValue))
      }, [dispatch])

    ///------------------------------

    // PAYPAL SETTING

    function createOrderPayPal(data, actions) {
        return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: subTotal,
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        })
    }

    function onApprove(data, actions) {
        return actions.order.capture()
        .then(details => {
            // console.log(details)
            const sendOrderPP = {
                price: subTotal,
                stocks : products.map(e => {
                    return {
                        amount: e.amount,
                        airline: e.airline,
                        value: e.price,
                        link: e.id
                    }
                }),
                userId: user.length ? user[0].id : null,
                idpurchase: details.id,
                creationdate: details.create_time
            }
        
            dispatch(createOrder(sendOrderPP))
            alert(`payment completado por` + details.payer.name.given_name)
            window.localStorage.clear()
            //history.replace('/success')
        });
    }

    function onError (data, actions) {
        alert("An Error occured with your payment ");
      };

    ////////////

    async function handleSubmit(e) {     //
        e.preventDefault()

        if(email) {
            setLoading(true)
            setProcessing(true)

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            });

            if(!error) {
                const { id } = paymentMethod;

                try {
                    const { data } = await axios.post('http://localhost:3001/stripe', {
                        id, 
                        amount: subTotal * 100, // lo tengo que mandar en centavos  //1 METODO
                        receipt_email: email,
                    })
                    console.log(data) // {message: 'succesfull payment'}

                    setLoading(false)
                    setSucceeded(true)
                    setError(null)
                    setProcessing(false)    
                    elements.getElement(CardElement).clear()
                    await deleteStockFirebase()
                    setPay(true)
                    setProducts([])
                    alert('Payment successful')

                    const sendOrder = {
                        price: subTotal,
                        stocks : products.map(e => {
                            return {
                                amount: e.amount,
                                airline: e.airline,
                                value: e.price,
                                link: e.id
                            }
                        }),
                        userId: user.length ? user[0].id : null,
                        idpurchase: id,
                        creationdate: new Date(),
                    }
                    console.log(sendOrder);
                    dispatch(createOrder(sendOrder))  

                    window.localStorage.clear()
                    history.replace('/success')
    
                } catch (error) {
                    console.log(error)
                }

            }
        } else {
            alert('Form not complete')
        }
    }


    function deleteStockFirebase(){
       let dbs= firebase.firestore()
        products.map((flight)=>{
            if(flight.amount < flight.stock){
                dbs.collection("db").doc(flight.id).update({
                    stock:flight.stock-flight.amount
                })
                .then(() => {
                    setProducts({
                        ...flight,
                        stock:flight.stock-flight.amount
                    })
                    console.log("stock modificado",products.stock)
                })
                .catch((error) => {
                    console.log( error);
                });
            }else{
                dbs.collection("db").doc(flight.id).delete()
                .then(()=>{
                    console.log("flight completed")
                })
            }
        }) 
    }

    function handleChange(e) {
        setLoading(false)
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
        if(e.error) {
            setErrorMsg({
                value: true,
                string: e.error.message
            })            
        } else {
            setErrorMsg({
                value: false,
                string: ''
            })    
        }
    }

  return (
    <div className={css.payment_container}>

        <h1>Checkout (
            <Link to='/cart'>{products.length} tickets</Link>    
        ) </h1>

        {/* PAYMENT DETAIL */}
        <h1>Your purchase:</h1>
        {products?.map(e => {
            return (<div key={e.id} className={style.cards}>
                <li className={style.cards_item}> 
                <div className={css.card}>
                    <div className={style.card_image}><img src={e.logo} alt='#'/></div>
                    <div className={style.card_content}>
                    <h2 className={style.card_title}>{e.airline}</h2>
                    <h5>Origin: {e.origin} | Destination: {e.destination} </h5>
                    </div>
                    <div>
                    <p className={style.card_text}>${e.price}</p>
                    </div>
                    <h5>Amount:{e.amount}</h5>
                </div>
                </li>
            </div> )
        })}

        <div className={css.methods}>
            {/* PAYMENT METHOD */}
            <h1>Payment Method</h1>
            <br />

            <div>
                <h5>Order Total:</h5>{ subTotal && <span>${subTotal}</span>}
            </div>
            <br />

            {/* MERCADO PAGO */}
            <hr className={css.hr_separator} />
            <br />
            <MPPayment loading={loading} disabled={disabled} subTotal={subTotal} products={products} user={user} />
            <br />
            <hr className={css.hr_separator} />
            {/* PAYPAL */}
            <br />
            <PayPalScriptProvider 
            options={{ "client-id": 'Af5RBL-IS1S6n_djlUuVWC-SSHDEWJDfTMVCyBPAJBISiKn6lgZmNmLX9D5KvBhWZ38jY_2Sy3ExLLQN'}}>
                <PayPalButtons
                disabled={loading || !disabled}
                createOrder={createOrderPayPal}
                onApprove={onApprove}
                onError={onError}
                />            
            </PayPalScriptProvider>
            <br />
            <hr className={css.hr_separator} />
            <br />
            {/* STRIPE */}
            <form className={css.form_container}>
                <br />

                <TextField 
                id="outlined-size-small"
                label='Email'
                type="text" 
                value={email} 
                name='email'
                onChange={e => setEmail(e.target.value)}
                required
                />
                <br />
                <br />
                <CardElement onChange={handleChange}/>
                <br />

                <br />
                <LoadingButton
                    onClick={handleSubmit}
                    endIcon='✔'
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    disabled={processing || disabled || succeeded || errorMsg.value}
                    ><span>{loading ? <p>Processing</p> : 'Buy now'}</span></LoadingButton>

                <br />
                {errorMsg.string && <span>{errorMsg.string}</span>}
            </form>            
        </div>

    </div>
  )
}

export default Payment
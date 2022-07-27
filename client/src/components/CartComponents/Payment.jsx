import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from "react-redux";
import { useContext } from 'react'
import { CartContext } from './CartContext'
import style from '../styles/Ticket.module.css'
import css from '../styles/Payment.module.css'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios';
import firebase from 'firebase'
import { LoadingButton } from '@mui/lab';

function Payment() {
    const user = useSelector(state => state.user)
    const { products, setProducts ,setPay} = useContext(CartContext)

    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const stripe = useStripe()
    const elements = useElements()

    const [errorMsg, setErrorMsg] = useState({
        value: null,
        string: ''
    })

    const [error, setError] = useState(null)
    
    const [disabled, setDisabled] = useState(true)

    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState("")

    const [ email, setEmail ] = useState('')

    ///------------------------------
   

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
                    const { data } = await axios.post('http://localhost:3001/checkout', {
                        id, 
                        amount: subTotal * 100, // lo tengo que mandar en centavos  //1 METODO
                        receipt_email: email,
                    });
                    
                    setLoading(false)
                    setSucceeded(true)
                    setError(null)
                    setProcessing(false)    
                    elements.getElement(CardElement).clear()
                    await deleteStockFirebase()
                    //localStorage.clear()
                    setPay(true)
                    setProducts([])
                    alert('Payment successful')
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

    const [subTotal, setSubTotal] = useState()

    useEffect(() => {
        if(products.length !== 0) setSubTotal(products.map(p => p.price * p.amount).reduce((previousValue, currentValue) => previousValue + currentValue))
      }, [])

  return (
    <div>
        {/* CLIENTS NAME OR EMAIL */}
        {user?.email}
        <h1>Checkout (
            <Link to='/cart'>{products?.length} items </Link>    
        ) </h1>

        {/* PAYMENT DETAIL */}
        <h1>Tickets</h1>
        {products?.map(e => {
            return (<div key={e.id} className={style.cards}>
                <li className={style.cards_item}> 
                <div className={style.card}>
                    <div className={style.card_image}><img src={e.logo} alt='#'/></div>
                    <div className={style.card_content}>
                    <h2 className={style.card_title}>{e.airline}</h2>
                    <h5>Origin: {e.origin} | Destination: {e.destination} </h5>
                    </div>
                    <div>
                    <p className={style.card_text}>${e.price} | price | price</p>
                    </div>
                    <h5>Amount: {e.amount}</h5>
                </div>
                </li>
            </div> )
        })}

        {/* PAYMENT METHOD */}
        <h1>Payment Method</h1>
        <form className={css.form_container}>
            <label>Email</label>
            <input 
            type="text" 
            value={email} 
            name='email'
            onChange={e => setEmail(e.target.value)}
            required
            />

            <br />
            <CardElement onChange={handleChange}/>
            <br />

            <div>
            <h5>Order Total:</h5>{ subTotal && <span>${subTotal}</span>}
            </div>

            <br />

            <LoadingButton
                onClick={handleSubmit}
                endIcon='✔'
                loading={loading}
                loadingPosition="end"
                variant="contained"
                disabled={processing || disabled || succeeded || errorMsg.value}
                ><span>{loading ? <p>Processing</p> : 'Buy now'}</span></LoadingButton>

            {errorMsg.string && <span>{errorMsg.string}</span>}
        </form>
    </div>
  )
}

export default Payment
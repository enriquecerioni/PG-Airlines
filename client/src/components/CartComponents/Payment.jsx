import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { darkModeContext } from '../DarkModeContext';
import style from "../styles/Ticket.module.css";
import css from "../styles/Payment.module.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
// import firebase from "firebase";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
// PAYPAL
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// MERCADO PAGO
import MPPayment from "./MPPayment";
// CREAR ORDENES
import { createOrder, getAllUsers,deleteStockBack, createSales, getAllAirlines } from "../../redux/actions/index";

function Payment() {
  const user = useSelector((state) => state.currentUser);
  const airlines = useSelector((state) => state.airlines);

  const { products, setProducts, setPay } = useContext(CartContext);

  const { darkMode } = useContext(darkModeContext)
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState({
    value: null,
    string: "",
  });
  const [/*error*/, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [email, setEmail] = useState("");

  const [subTotal, setSubTotal] = useState();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAirlines())

    if (products.length !== 0)
      setSubTotal(
        products
          .map((p) => p.price * p.amount)
          .reduce((previousValue, currentValue) => previousValue + currentValue)
      );
  }, [dispatch, products]);

  // PAYPAL SETTING

  function createOrderPayPal(data, actions) {
    return actions.order.create({
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
    });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then((details) => {
      // console.log(details)
      const sendOrderPP = {
        price: subTotal,
        stocks: products.map((e) => {
          return {
            amount: e.amount,
            value: e.price,
            airlineId: e.airlineId,
            moreinfo: {
              origin: e.origin,
              destination: e.destination,
              departureHour: e.departureHour,
              arrivalHour: e.arrivalHour
            }
          }
        }),
        userId: user.length ? user[0].id : null,
        idpurchase: details.id,
        creationdate: details.create_time,
      };

      dispatch(createOrder(sendOrderPP));

      toast.success(`Payment Succesful ` + details.payer.name.given_name, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.localStorage.clear();
      history.replace("/success");
    });
  }

 function ejecutarArray() {
      let array = products.map((product)=>{
        return {
            id: product.id, 
            amount: product.amount
          };
      })
      dispatch(deleteStockBack(array));
  }

  function ejecutarGuardarVenta() {
    let arr = products.map(product => {
      return {
        id: product.id, 
        amount: product.amount,
        airlineId: product.airlineId,
        price: product.price
      }
    })
    dispatch(createSales(arr))
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if(email) {
      setLoading(true);
      setProcessing(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        try {
          const { id } = paymentMethod;

          const { data } = await axios.post("http://localhost:3001/stripe", {
            id,
            amount: subTotal * 100, // lo tengo que mandar en centavos  //1 METODO
            receipt_email: email,
          });
          console.log(data)

          const sendOrder = {
            price: subTotal,
            stocks: products.map((e) => {
              return {
                amount: e.amount,
                value: e.price,
                airlineId: e.airlineId,
                moreinfo: {
                  origin: e.origin,
                  destination: e.destination,
                  departureHour: e.departureHour,
                  arrivalHour: e.arrivalHour
                }
              };
            }),
            userId: user.length ? user[0].id : 0,
            idpurchase: id,
            creationdate: new Date(),
          };

          dispatch(createOrder(sendOrder));

          setLoading(false);
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          elements.getElement(CardElement).clear();
          setPay(true);
          setProducts([])             

          ejecutarArray();
          ejecutarGuardarVenta();
       
          toast.success("Payment Succesful!", {
            // icon: "✈️",
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.localStorage.clear();
          history.replace("/success");

        } catch (error) {
          alert(error);
        }
      }
      
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form not completed",
        confirmButtonColor: "#10408F",
      });
    }
  }

  function handleChange(e) {
    setLoading(false);
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
    if (e.error) {
      setErrorMsg({
        value: true,
        string: e.error.message,
      });
    } else {
      setErrorMsg({
        value: false,
        string: "",
      });
    }
  }

  return (
    <div className={ darkMode ? css.payment_container_dark : css.payment_container}>
        <h1 className={ darkMode ? css.main_title_dark : css.main_title}>Checkout (
            <Link to='/cart'>{products.length} tickets</Link>    
        ) </h1>

        {/* PAYMENT DETAIL */}
        <h1 className={ darkMode ? css.main_title_dark : css.main_title} >Your purchase:</h1>
      { products.length ? 
          products.map(c => {
            return (<div className={darkMode ? style.cards_dark : style.cards} key={c.id}>
              <li className={ darkMode ? style.cards_item_dark : style.cards_item}>
              <div className={ darkMode ? style.card_dark : style.card}>

              <div className={style.card_image}>
                <img src={c.logo} alt='#'/>
              </div>
                <div className={style.card_content}>
                {airlines.map((airline) => {
                  if(c.airlineId === airline.id){
                    return <h2 key={c.airlineId} className={darkMode ? style.card_title_dark : style.card_title}>{airline.name}</h2>
                  }
                })}
                <h5 className={darkMode ? style.card_desinfo_dark : style.card_desinfo}>Origin: {c.origin} | Destination: {c.destination} </h5>
                <p className={darkMode ? style.card_text_dark : style.card_text} >{c.departureHour} / {c.arrivalHour}</p>
                </div>
                <div>
                <p className={darkMode ? style.card_text_dark : style.card_text}>${c.price}</p>
                </div>
                <h5 className={darkMode ? style.card_text_dark : style.card_text}>Amount: {c.amount}</h5>
            </div>
            </li>
            </div>
          );
        }) : <></>
      }

      <div className={css.methods}>
        {/* PAYMENT METHOD */}
        <h1 className={ darkMode ? css.main_title_dark : css.main_title}>Payment Method</h1>
        <br />
            <div>
                <h5 className={ darkMode ? css.main_title_dark : css.main_title}>Order Total:</h5>{ subTotal && <span className={ darkMode ? css.main_title_dark : css.main_title}>${subTotal}</span>}
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
                />            
            </PayPalScriptProvider>
            <br />
            <hr className={css.hr_separator} />
            <br />
            {/* STRIPE */}
            <form className={css.form_container}>
                <br />
                <div className={darkMode ? css.card_form : undefined}>
                  <br />
                  <div>
                    <TextField 
                    id="outlined-size-small"
                    color="primary"
                    focused 
                    label='Email'
                    type="email" 
                    value={email} 
                    name='email'
                    onChange={e => setEmail(e.target.value)}
                    required
                    />
                    <br />                  
                  </div>

                  <CardElement onChange={handleChange}/> 
                  <br />
                </div>

                <br />
                <LoadingButton
                    onClick={handleSubmit}
                    endIcon='✔'
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color='primary'
                    className={darkMode ? css.btnLoading : undefined}
                    disabled={processing || disabled || succeeded || errorMsg.value}
                    ><span>{loading ? <p>Processing</p> : 'Buy now'}</span></LoadingButton>

                <br />
                {errorMsg.string && <span className={darkMode ? css.msg_error_dark : css.msg_error} >{errorMsg.string}</span>}
            </form>            
        </div>
        <br />
    </div>
  );
}

export default Payment;

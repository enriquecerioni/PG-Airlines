import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/Ticket.module.css'
import { Link } from 'react-router-dom'
import { addToFavorite, addToCart } from '../redux/actions/index' 
import { CartContext } from './CartComponents/CartContext'
import {useContext} from 'react'

function Ticket({id, origin, price, logo, airline, arrivalHour, departureHour}) {

  const item = {id, origin, price, logo, airline, arrivalHour, departureHour}

  const {addProductToCart} = useContext(CartContext)

  // const cart = useSelector((state) => state.cart)
  // const dispatch = useDispatch()

  // const handleAddCart = (e) => {
  //   e.preventDefault()
  //   dispatch(addToCart(item))
  //   console.log("Se agrego item:", item.id)
  // }

  const handleAddCart = (e) => {
    e.preventDefault()
    addProductToCart(item)
  }

  // const cartItem = useSelector((state) => state.cart)
  // let [cart, setCart] = useState([])

  // setCart = cartItem
  
  // let localCart = localStorage.getItem("cart");
  // console.log(localCart)
  
  // function addItem(item) {
  
  //   //create a copy of our cart state, avoid overwritting existing state
  //   let cartCopy = [...cart];
    
  //   //assuming we have an ID field in our item
  //   let { id } = item;
    
  //   //look for item in cart array
  //   let existingItem = cartCopy.find(cartItem => cartItem.id == id);
    
  //   //if item already exists
  //   if (existingItem) {
  //       existingItem.quantity += item.quantity //update item
  //   } else { //if item doesn't exist, simply add it
  //     cartCopy.push(item)
  //   }
    
  //   //update app state
  //   setCart(cartCopy)
    
  //   //make cart a string and store in local space
  //   let stringCart = JSON.stringify(cartCopy);
  //   localStorage.setItem("cart", stringCart)
  // }


  // //this is called on component mount
  // useEffect(() => {
  //   //turn it into js
  //   console.log(localCart)
  //   localCart = JSON.parse(localCart);
  //   //load persisted cart into state if it exists
  //   if(localCart) setCart(localCart)
  // }, []) //the empty array ensures useEffect only runs once


    // const dispatch = useDispatch()

    // const cart = useSelector(state => state.shoppingCart)

    // const flightList = useSelector(state => state.favoriteList)
    // let item = {airline, id, logo, departureHour, arrivalHour, price, origin, destination}
  
    // function addFav(e) {
    //   e.preventDefault()

    //   if (!flightList.includes(e.target.value)) {
    //     dispatch(addToFavorite(item));
    //     console.log(`agregaste ${id} `)
    //   } else {
    //     console.log('ya agregado')
    //   }
    // }

    // function handleAddToCart(event) {
    //   event.preventDefault()

    //   if (!cart.includes(id)) {
    //     dispatch(addToCart(item));
    //     console.log(`agregaste ${id} `)
    //   } else {
    //     console.log('ya agregado')
    //   }
    // }

    // useEffect(() => {
    //   localStorage.setItem('cart', JSON.stringify(item))
    // }, [item])

  return (
    <div className={style.cards}>
        <li className={style.cards_item}>
        <button onClick={addFav}>Favorite</button> 

        <button onClick={handleAddToCart}>Add to cart</button> 

        <div className={style.card}>
            <div className="card_image"><img src={logo} alt='#' width='100px' height='100px'/></div>
            <div className={style.card_content}>
            <h2 className={style.card_title}>{airline}</h2>
            <h5>Origin: {origin} | Destination: {destination} </h5>
            <p className="card_text">{departureHour} / {arrivalHour}</p>
            </div>
            <div>
              
            <p className={style.card_text}>${price} | price | price</p>
            <Link to={`/ticket/${id}`} > 
              <button className={style.btn}>View Deal</button> 
            </Link>
            </div>
        </div>
        </li>
        <button className={style.btnCart} onClick={handleAddCart}>Add to cart</button>
    </div> 
  )
}

export default Ticket
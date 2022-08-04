import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getOrders } from '../../redux/actions/index'
import { Card, TableRow, TableHead, TableContainer, TableCell,TableBody, Table } from '@mui/material';
import style from '../styles/Payment.module.css'
import { Link, useHistory } from 'react-router-dom';
import empty from '../styles/assets/emptyorders.jpg'
import { CartContext } from './CartContext';

function Orders() {
    const dispatch = useDispatch()
    // let user = useSelector(state => state.allUsers)
    // console.log(user)
    const { products, setProducts } = useContext(CartContext)
    const ordersArr = useSelector(state => state.orders)
    const navigate= useHistory()
    const user=useSelector(state=>state.currentUser)
    console.log(ordersArr)

    // useEffect(() => {
    //   /*
    //   if(user) {
    //     db
    //     .collection('users')
    //     .doc(user?.id)
    //     .collection('orders')
    //     .onSnapshot(snapshot => {
    //       setOrders(snapshot.docs.map(doc => ({
    //         id: doc.id,
    //         data:doc.data()
    //       })))
    //     })        
    //   } else {
    //     setOrders([])
    //   }

    //   */
    // }, [/*user*/])

    useEffect(() => {
      dispatch(getOrders())
      dispatch(getAllUsers())
      setProducts([])
      localStorage.setItem("cartProducts", JSON.stringify(products))
    }, [dispatch])
function handleClick(e){
  e.preventDefault();
  navigate.replace('/')
  window.location.reload()
  
}
let userOrders=ordersArr?.filter((data) => user.length && data.userId=== user[0].id)
  return (
    <div className={style.main_container}>
        <h1>Your orders</h1>
        { userOrders.length ? userOrders.map((data)=>{
            return (
              <>
              <Card className={style.card_container} sx={{ minWidth: 275 }} key={data.idpurchase}>
                  <h3>Order nº{data.id}</h3>
                  <strong><h5>Purchase id: #{data.idpurchase}</h5></strong> 
                  {data.creationdate && <h5>Purchase date: {data.creationdate}</h5>}  
                  <div className={style.id_container}>
                    <p>Total paid: $ {data.price}</p>    
                    {data.idpurchase && <span>Payment status: confirmed</span>}     
                  </div>              
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableCell><strong>Airline</strong></TableCell>
                      <TableCell><strong>Amount</strong></TableCell>
                      <TableCell><strong>Value</strong></TableCell>
                      <TableCell><strong>Link</strong></TableCell>
                    </TableHead>
                    <TableBody>
                      {data.stocks?.map((e, p)=> {
                        return <TableRow key={p}>
                          <TableCell>{e.airline}</TableCell>
                          <TableCell>{e.amount}</TableCell>   
                          <TableCell>${e.value}</TableCell> 
                          <TableCell><Link to={`/ticket/${e.link}`}>Flight Detail</Link></TableCell>                     
                        </TableRow> 
                      })}                    
                    </TableBody> 
                  </Table>
                </TableContainer>
                <br />
              </Card>
              
              </>
            
          )
        })
      : (
      <div className={style.empty_order}>
        <h3>You haven't made any purchases yet. When you purchase an item it will show up here.</h3>
        <img src={empty} alt="#" />
      </div>)}
      <button onClick={(e)=>handleClick(e)}>Go back to home</button>
    </div>
  )
}

export default Orders
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, getOrders } from '../../redux/actions/index'
import { Card, CardContent } from '@mui/material';
import style from '../styles/Payment.module.css'

function Orders() {
    const dispatch = useDispatch()
    // let user = useSelector(state => state.allUsers)
    // console.log(user)
    const orders = useSelector(state => state.orders)
    console.log(orders)

    useEffect(() => {
      /*
      if(user) {
        db
        .collection('users')
        .doc(user?.id)
        .collection('orders')
        .onSnapshot(snapshot => {
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data:doc.data()
          })))
        })        
      } else {
        setOrders([])
      }

      */
    }, [/*user*/])

    useEffect(() => {
      dispatch(getOrders())
    }, [])

  return (
    <div className={style.main_container} style={{marginTop: 5 + 'rem'}}>
        <h1>Your orders</h1>{orders ? orders.map(data => {
          return (
            <Card className={style.card_container} sx={{ minWidth: 275 }} key={data.id}>
              <CardContent>
                <p>{data.price}</p>
                  {data.stocks?.map(e => {
                    return <div key={e}>
                      <span>{e.airline}</span>
                      <span>{e.amount}</span>                  
                    </div>
                  })}                
              </CardContent>
            </Card>
          )
        })
      : <></>}
    </div>
  )
}

export default Orders
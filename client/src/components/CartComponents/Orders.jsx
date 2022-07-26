import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../redux/actions/index'

function Orders() {
    const [ orders, setOrders ] = useState([])

    const dispatch = useDispatch()
    let user = useSelector(state => state.allUsers)
    console.log(user)

    useEffect(() => {
      dispatch(createUser())
    }, [])

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

  return (
    <div style={{marginTop: 5 + 'rem'}}>
        <h1>Your orders</h1>{orders?.map(order => {
          return (
            <div>
              
            </div>
          )
        })}
    </div>
  )
}

export default Orders
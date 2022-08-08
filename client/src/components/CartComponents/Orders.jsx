import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAirlines, getAllUsers, getOrders } from '../../redux/actions/index'
import { Card, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Button, IconButton, Collapse } from '@mui/material';
import style from '../styles/Payment.module.css'
import { useHistory } from 'react-router-dom';
import empty from '../styles/assets/emptyorders.png'
import { CartContext } from './CartContext';
import { darkModeContext } from '../DarkModeContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Orders() {
    const dispatch = useDispatch()
    const { darkMode } = useContext(darkModeContext)
    const { products, setProducts } = useContext(CartContext)
    const ordersArr = useSelector(state => state.orders)
    const airlines = useSelector((state) => state.airlines);
    const user = useSelector(state=>state.currentUser)
    const navigate = useHistory()
    let userOrders = ordersArr?.filter((data) => user.length && data.userId === user[0].id)
    // console.log(userOrders)

    useEffect(() => {
      dispatch(getOrders())
      dispatch(getAllUsers())
      dispatch(getAllAirlines())
      setProducts([])
      localStorage.setItem("cartProducts", JSON.stringify(products))
    }, [dispatch])

    function handleClick(e){
      e.preventDefault();
      navigate.replace('/')
      window.location.reload()
    }

    const [open, setOpen] = useState(false);

  return (
    <div className={ darkMode ? style.main_container_dark : style.main_container}>
        <Button 
          variant="contained"
          color='primary'
          onClick={(e)=>handleClick(e)}>Go back to home</Button>
        <h1 className={ darkMode ? style.title_orders_dark : style.title_orders}>Your orders</h1>

        { userOrders.length ? userOrders.map((data)=>{
            return (
              <>
              <Card className={ darkMode ? style.card_container_dark : style.card_container} sx={{ minWidth: 275 }} key={data.id}>

                  <h3 className={ darkMode ? style.order_number_dark : style.order_number}>Order nº{data.id}</h3>
                  <strong><h5 className={ darkMode ? style.info_order_dark : style.info_order}>Purchase id: #{data.idpurchase}</h5></strong> 
                  {data.creationdate && <h5 className={ darkMode ? style.info_order_dark : style.info_order}>Purchase date: {data.creationdate}</h5>}  
                  <div className={style.id_container}>
                    <p className={ darkMode ? style.info_order_dark : style.info_order}>Total paid: $ {data.price}</p>    
                    {data.idpurchase && <span className={ darkMode ? style.info_order_dark : style.info_order}>Payment status: confirmed</span>}     
                  </div>  

                <TableContainer>

                  <Table>

                    <TableHead>
                      <TableRow>
                        <TableCell key='airline' className={darkMode ? style.cell_dark : undefined}><strong>Airline</strong></TableCell>
                        <TableCell key='amount' className={darkMode ? style.cell_dark : undefined}><strong>Amount</strong></TableCell>
                        <TableCell key='value' className={darkMode ? style.cell_dark : undefined}><strong>Value</strong></TableCell>
                        <TableCell key='review' className={darkMode ? style.cell_dark : undefined}><strong>Review</strong></TableCell>
                        <TableCell key='moreinfo' className={darkMode ? style.cell_dark : undefined}><strong>More info</strong></TableCell>                        
                      </TableRow>
                    </TableHead>

                    <TableBody key={data.id}>
                      {data.stocks?.map((e, p)=> {
                        return <>
                        <TableRow key={p}>

                          {airlines.map((airline) => {
                              if(e.airlineId === airline.id) {
                                return <TableCell className={darkMode ? style.cell_dark : undefined} key={airline[p]}>{airline.name}</TableCell>
                              }
                          })}

                          <TableCell className={darkMode ? style.cell_dark : undefined} key={e.amount[p]}>{e.amount}</TableCell>   
                          <TableCell className={darkMode ? style.cell_dark : undefined} key={e.value[p]}>${e.value}</TableCell> 
                          <TableCell className={darkMode ? style.cell_dark : undefined}>
                            <button disabled={undefined}>Review</button>
                          </TableCell>

                          <TableCell className={darkMode ? style.cell_dark : undefined}>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                              >
                              {open ? <KeyboardArrowUpIcon color='primary' /> : <KeyboardArrowDownIcon color='primary' />}
                            </IconButton>
                          </TableCell>
                          </TableRow> 

                          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                            <TableCell style={{ paddingBottom: 15, paddingTop: 15 }} colSpan={6}>
                              <Collapse in={open} timeout="auto" unmountOnExit>
                                <h3 className={ darkMode ? style.info_order_dark : style.info_order}>More Details</h3>
                                <Table size='small'>

                                  <TableHead>
                                    <TableRow>
                                      <TableCell key='origin' className={darkMode ? style.cell_dark : undefined}>Origin</TableCell>
                                      <TableCell key='destination' className={darkMode ? style.cell_dark : undefined}>Destination</TableCell>
                                      <TableCell key='arrival' className={darkMode ? style.cell_dark : undefined}>Arrival Hour</TableCell>
                                      <TableCell key='departure' className={darkMode ? style.cell_dark : undefined}>Departure Hour</TableCell>
                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    <TableRow>
                                      <TableCell key={e.moreinfo.origin} className={darkMode ? style.cell_dark : undefined}>{e.moreinfo.origin}</TableCell>
                                      <TableCell key={e.moreinfo.destination} className={darkMode ? style.cell_dark : undefined}>{e.moreinfo.destination}</TableCell>
                                      <TableCell key={e.moreinfo.arrivalHour} className={darkMode ? style.cell_dark : undefined}>{e.moreinfo.arrivalHour}</TableCell>
                                      <TableCell key={e.moreinfo.departureHour} className={darkMode ? style.cell_dark : undefined}>{e.moreinfo.departureHour}</TableCell>
                                    </TableRow>
                                  </TableBody>
                      
                                </Table>
                              </Collapse>  
                            </TableCell> 
                          </TableRow>                        
                        </>
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
      <div className={ darkMode ? style.empty_order_dark : style.empty_order}>
        <h3 className={ darkMode ? style.empty_title_dark : style.empty_title}>You haven't made any purchases yet. Once you purchase an item, it will show up here.</h3>
        <img className={ darkMode ? style.img_empty_dark : style.img_empty} src={empty} alt="#" />
      </div>)}
    </div>
  )
}

export default Orders
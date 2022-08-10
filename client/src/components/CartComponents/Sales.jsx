import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAirlines,
  getAllUsers,
  getOrders,
  getSales,
} from "../../redux/actions/index";

import {
  Card, Button
} from "@mui/material";
import empty from "../styles/assets/emptyorders.png";
import style from '../styles/Sales.module.css';
import { Link, useHistory } from "react-router-dom";
import Chart from '../Chart.jsx'


function Sales() {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const user = useSelector((state) => state.currentUser);
  const currentAirline = useSelector((state) => state.currentAirlineId);
  const sales = useSelector((state) => state.sales);
  const salesAirline = sales.filter(sale => sale.airlineId === currentAirline)
  console.log(salesAirline)

  useEffect(() => {
    dispatch(getSales());
    dispatch(getAllUsers());
    dispatch(getAllAirlines());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    navigate.replace("/");
    window.location.reload();
  }

  return (
    <div className={style.main_container}>
      <Button variant="contained" onClick={(e) => handleClick(e)}>Go back to home</Button>
      <h1 className={style.title_orders}>Your sales</h1>
      {salesAirline.length ? (
        salesAirline.map((data) => {
          return (
            <>
              <Card
                className={style.card_container}
                sx={{ minWidth: 275 }}
                key={data.id}
              >
                <h3 className={style.subtitles_orders}>Sale nº{data.id}</h3>
                <strong>
                  <h5 className={style.subtitles_orders}>Flight id: #{data.idFlight}</h5>
                </strong>
                {/* {data.creationdate && (
                  <h5>Purchase date: {data.creationdate}</h5>
                )} */}
                <div className={style.id_container}>
                  <p className={style.moreinfo_subtitles}>Unit Price: $ {data.price}</p>
                  <p className={style.moreinfo_subtitles}>Tickets sold: {data.amount} (units) </p>
                  {data.idFlight && <span className={style.moreinfo_subtitles}>Total sale: $ {data.price * data.amount}</span>}
                </div>
              </Card>

              <Chart />
            </>
          )
        })
      ) : (
        <div className={style.empty_order}>
          <h3 className={style.empty_title}>
            You have not received ticket purchases yet, when users make their
            purchase the tickets will appear here
          </h3>
          <img className={style.img_empty} src={empty} alt="#" />
        </div>
      )}

    </div>
  );
}

export default Sales;

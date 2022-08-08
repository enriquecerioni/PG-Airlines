import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAirlines,
  getAllUsers,
  getOrders,
  getSales,
} from "../../redux/actions/index";
import {
  Card,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import style from "../styles/Payment.module.css";
import { Link, useHistory } from "react-router-dom";
import empty from "../styles/assets/emptyorders.jpg";
import { CartContext } from "./CartContext";

function Sales() {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const user = useSelector((state) => state.currentUser);
  const currentAirline = useSelector((state) => state.currentAirlineId);
  const sales = useSelector((state) => state.sales);
  const salesAirline = sales.filter(sale => sale.airlineId === currentAirline)

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
      <h1>Your sales</h1>
      {salesAirline.length ? (
        salesAirline.map((data) => {
          return (
            <>
              <Card
                className={style.card_container}
                sx={{ minWidth: 275 }}
                key={data.id}
              >
                <h3>Sale nº{data.id}</h3>
                <strong>
                  <h5>Flight id: #{data.idFlight}</h5>
                </strong>
                {/* {data.creationdate && (
                  <h5>Purchase date: {data.creationdate}</h5>
                )} */}
                <div className={style.id_container}>
                  <p>Unit Price: $ {data.price}</p>
                  <p>Tickets: {data.amount}</p>
                  {data.idFlight && <span>Total: $ {data.price * data.amount}</span>}
                </div>
              </Card>
            </>
          );
        })
      ) : (
        <div className={style.empty_order}>
          <h3>
            You have not received ticket purchases yet, when users make their
            purchase the tickets will appear here
          </h3>
          <img src={empty} alt="#" />
        </div>
      )}
      <button onClick={(e) => handleClick(e)}>Go back to home</button>
    </div>
  );
}

export default Sales;

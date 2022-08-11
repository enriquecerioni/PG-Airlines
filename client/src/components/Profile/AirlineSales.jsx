import React, { useEffect }  from "react";
import ProfileNav from "./ProfileNav";
import s from "../styles/AirlineProfile.module.css";
import { getAllUsers } from "../../redux/actions";
import Sales from "../CartComponents/Sales";
import { useDispatch, useSelector } from "react-redux";

export default function AirlineSales() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  console.log(users);
  console.log(currentUser);

  useEffect(() => {
    dispatch(getAllUsers());
    setInterval(() => {}, 1000);
  }, [dispatch]);

  return (
    <div className={s.container}>
      <ProfileNav />
      <div className={s.infoContainer}>
        <Sales/>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers,  getAllUsersFirebase,
  crearAerolinea,
 } from "../../redux/actions";
import Loader from "../HomeComponents/Loader";
import { makeAdmin } from "../scripts/auth";
import s from "../styles/UserProfile.module.css";
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material'

export default function AirlinePendingRequests() {
  const dispatch = useDispatch();
  // getAllUsers()
  const users = useSelector((state) => state.allUsers);
  const currentUser = useSelector((state) => state.currentUser)[0];
  // console.log(users);
  // console.log(currentUser);

  const allUser = useSelector((state) => state.allUsersFirebase);

  const toBeBusiness = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && !user.empresa
  );

  const [refreshAccounts, setRefreshAccounts] = useState(0);

  async function acceptRequest(email) {
    //console.log(e.target.email.value);
    await makeAdmin(email);
    dispatch(crearAerolinea({ email }));
    // window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllUsersFirebase());
    setInterval(() => {}, 1000);
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);

  return (
    <>
      {currentUser !== undefined ? (
        <div className={s.container_pending}>
          <ProfileNav />
          <div className={s.infoContainer}>
            <h1 className={s.title}>Airline Pending Requests</h1>
            <div className={s.table_container}>
                <Table>
                  <caption>This airlines are waiting to be accepted</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>UID</strong></TableCell>
                      <TableCell><strong>Accept Request</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {toBeBusiness.length ? (
                      toBeBusiness.map(u => {
                        return (
                          <TableRow key={u.uid}>
                              <TableCell>{u.email}</TableCell>
                              <TableCell>{u.name ? u.name : '(empty)'}</TableCell>
                              <TableCell>{u.uid}</TableCell>
                              <TableCell>
                                <Button variant="contained" onClick = {() => {acceptRequest(u.email)}} >
                                  Make Admin 
                                </Button>
                              </TableCell>
                          </TableRow>
                        )
                      })
                    ) : <h1>No airlines</h1>}
                  </TableBody>


                </Table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>{<Loader />}</h1>
        </div>
      )}
    </>
  );
}
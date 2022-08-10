import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline,
} from "../../redux/actions";
import s from "../styles/UserProfile.module.css";
import { Delete, makeAdmin } from "../scripts/auth";
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material'


export default function Administration() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin
  );
  const business = allUser.filter(
    (user) => user.hasOwnProperty("empresa") && user.empresa
  );
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

  async function deleteUser(UID, email) {
    await Delete(email, UID);
    business.filter((b) => b.email === email).length
      ? dispatch(deleteAirline(email))
      : console.log("no esta");
    //  aca va un loader porque las funciones se ejecutan tarde y se rompe con el window.location.reload()
    setRefreshAccounts(refreshAccounts + 1);
  }

  useEffect(() => {
    dispatch(getAllUsersFirebase());
    return () => {
      console.log("Will Unmount");
    };
  }, [dispatch, refreshAccounts]);
  return (
    <div className={s.table_container}>
      <Table>
      <caption>All active users using the website</caption>

        <TableHead>
            <TableRow>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>UID</strong></TableCell>
              <TableCell><strong>Delete</strong></TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {user.length ? (
              user.map((u) => {
                return (
                  <TableRow key={u.uid}>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.name ? u.name : '(empty)'}</TableCell>
                    <TableCell>{u.uid}</TableCell>
                    <TableCell><Button color='error' variant="contained" onClick={() => { deleteUser(u.uid, u.email)}}>
                      Delete
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <h1>No users</h1>
            )}     

        </TableBody>
      </Table>
    </div>
  );
}
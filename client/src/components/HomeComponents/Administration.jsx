import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFirebase,
  crearAerolinea,
  deleteAirline,
  currentUser,
} from "../../redux/actions";


import { disableUserAuth, makeAdmin } from "../scripts/auth";
import s from "../styles/UserProfile.module.css";
import { Delete, makeAdmin } from "../scripts/auth";
import { Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material'



export default function Administration() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.allUsersFirebase);
  const currentUser=useSelector(state=>state.currentUser)
  const user = allUser.filter(
    (user) => !user.hasOwnProperty("empresa") && !user.admin && user.email!==currentUser[0].email
  );


  const [refreshAccounts, setRefreshAccounts] = useState(0);

  async function disableUser(UID, email) {
    await disableUserAuth(UID,email);
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


      {user.length ? (
        user.map((u) => {
          return (
            <div key={u.uid}>
              <br />
              <br />
              <div key={u.uid}>
                email: {u.email},Name: {u.name ? u.name : null}, uid: {u.uid}
              </div>
              {
              !u.disable ? (<button
                onClick={() => {
                  disableUser(u.uid, u.email);
                }}
              >
                Disable User
              </button>):
                <h6>User Disable</h6>
              }
            </div>
          );
        })
      ) : (
        <h1>No users?</h1>
      )}

        </TableBody>
      </Table>

    </div>
  );
}